/**
 * lib/ai-questions.ts — AI Interview Question Generator (Gemini Flash)
 *
 * Generates personalized interview questions for a candidate based on:
 *   - Their profile (skills, experience)
 *   - The job requirements
 *   - Their AI score (optional — to probe weak areas)
 *
 * Used both:
 *   1. During the scoring flow (scoreCandidate can be followed by question gen)
 *   2. On-demand via /api/interview-questions endpoint
 */

import { GoogleGenAI } from '@google/genai';
import type { Candidate, Job, Score } from '@/types';

// ── Types ───────────────────────────────────────────────────────────────────

export interface InterviewQuestion {
  question: string;
  category: 'technical' | 'situational' | 'cultural' | 'motivational';
  rationale: string;
}

export interface GenerateQuestionsInput {
  candidate: Candidate;
  job: Job;
  score?: Score | null;
}

export interface GenerateQuestionsResult {
  questions: InterviewQuestion[];
}

// ── Gemini Client ───────────────────────────────────────────────────────────
const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

const MODEL = 'gemini-2.5-flash';

// ── JSON Schema for structured output ───────────────────────────────────────
const QUESTIONS_SCHEMA = {
  type: 'object' as const,
  properties: {
    questions: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          question: { type: 'string' as const, description: 'The interview question' },
          category: {
            type: 'string' as const,
            enum: ['technical', 'situational', 'cultural', 'motivational'],
            description: 'Question category',
          },
          rationale: {
            type: 'string' as const,
            description: 'Why this question is relevant for this specific candidate',
          },
        },
        required: ['question', 'category', 'rationale'],
      },
    },
  },
  required: ['questions'],
};

// ── Helper: Truncate long text ──────────────────────────────────────────────
function truncate(text: string | null | undefined, maxLength: number): string {
  if (!text) return 'Not provided';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// ── Build prompt ────────────────────────────────────────────────────────────
function buildQuestionsPrompt(input: GenerateQuestionsInput): string {
  const { candidate, job, score } = input;

  let scoreContext = '';
  if (score) {
    scoreContext = `
AI Score Summary (use this to probe weak areas):
  Skill Fit: ${score.skill_fit}/100
  Communication Fit: ${score.communication_fit}/100
  Startup Fit: ${score.startup_fit}/100
  Availability Fit: ${score.availability_fit}/100
  Salary Fit: ${score.salary_fit}/100
  Overall: ${score.overall_score}/100
  AI Summary: ${score.summary ?? 'N/A'}`;
  }

  return `You are an expert interviewer for early-stage startups.
Generate exactly 5 personalized interview questions for this candidate.

Job:
  Title: ${truncate(job.title, 100)}
  Requirements: ${truncate(job.requirements, 400)}
  Stipend Range: ${truncate(job.stipend_range, 50)}

Candidate:
  Name: ${candidate.name}
  Skills: ${candidate.skills?.join(', ') || 'Not provided'}
  Experience: ${truncate(candidate.experience, 300)}
  Availability: ${truncate(candidate.availability, 100)}
  Expected Stipend: ${truncate(candidate.expected_stipend, 50)}
${scoreContext}

Rules:
- Generate exactly 5 questions with this category distribution:
  • 2 technical questions (test specific skills mentioned in their profile against job requirements)
  • 1 situational question (test problem-solving in a startup context)
  • 1 cultural question (test startup culture fit, adaptability, ownership)
  • 1 motivational question (test drive, passion, long-term interest)
- Each question MUST reference something specific from THIS candidate's profile
- Questions should test fit for THIS specific job
- NO generic questions like "Tell me about yourself"
- If score data shows weak areas, probe those specifically
- Each rationale should explain WHY this question matters for this candidate`;
}

// ── Main: Generate interview questions ──────────────────────────────────────
export async function generateInterviewQuestions(
  input: GenerateQuestionsInput
): Promise<GenerateQuestionsResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const prompt = buildQuestionsPrompt(input);

  // Attempt with one retry
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await genai.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: QUESTIONS_SCHEMA,
          temperature: 0.7, // Slightly higher for creative question generation
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Gemini returned empty response');
      }

      const result: GenerateQuestionsResult = JSON.parse(text);

      // Validate we got questions
      if (!result.questions || !Array.isArray(result.questions)) {
        throw new Error('Invalid response: missing questions array');
      }

      // Ensure exactly 5 questions (trim or pad)
      if (result.questions.length > 5) {
        result.questions = result.questions.slice(0, 5);
      }

      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(
        `[AI-Questions] Generation attempt ${attempt + 1} failed:`,
        lastError.message
      );

      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  throw new Error(`Interview question generation failed after 2 attempts: ${lastError?.message}`);
}
