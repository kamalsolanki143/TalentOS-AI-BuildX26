import Navbar from "@/components/Navbar";
import CandidateCard from "@/components/CandidateCard";
import type { ScoreBreakdown } from "@/types";

// ── Mock Explainable AI Data ────────────────────────────────
// These demonstrate how the ScoreBreakdownCard renders real AI analysis.
// In production, this data comes from the scores.score_breakdown column in Supabase.

const rahulBreakdown: ScoreBreakdown = {
  skill_fit: {
    score: 95,
    reasons: [
      "React and Next.js expertise directly matches job requirements",
      "TypeScript proficiency demonstrated through project portfolio",
      "Tailwind CSS experience aligns with frontend stack",
    ],
  },
  communication_fit: {
    score: 90,
    reasons: [
      "Clear, structured screening responses with specific examples",
      "Professional tone with strong articulation of technical concepts",
    ],
  },
  startup_fit: {
    score: 98,
    reasons: [
      "Previous internship at an early-stage startup (0→1 experience)",
      "Expressed excitement about fast-paced, ownership-driven culture",
      "Self-directed learner — built 3 side projects independently",
    ],
  },
  availability_fit: {
    score: 100,
    reasons: [
      "Can join immediately — no notice period",
      "Available full-time, matching job schedule",
    ],
  },
  salary_fit: {
    score: 90,
    reasons: [
      "Expected ₹20k/month — within budget of ₹25k",
      "Flexible on compensation for the right opportunity",
    ],
  },
};

const priyaBreakdown: ScoreBreakdown = {
  skill_fit: {
    score: 78,
    reasons: [
      "Strong UI/UX design skills with Figma proficiency",
      "Basic React knowledge but limited production experience",
      "Missing TypeScript experience listed in requirements",
    ],
  },
  communication_fit: {
    score: 88,
    reasons: [
      "Excellent written communication with design portfolio links",
      "Articulates design decisions clearly with user-centric reasoning",
    ],
  },
  startup_fit: {
    score: 85,
    reasons: [
      "Has freelanced for 3 startups — understands scrappy environments",
      "Comfortable wearing multiple hats (design + light frontend)",
    ],
  },
  availability_fit: {
    score: 75,
    reasons: [
      "Available in 2 weeks — slight delay vs immediate need",
      "Part-time initially, full-time after current project wraps",
    ],
  },
  salary_fit: {
    score: 80,
    reasons: [
      "Expected ₹22k/month — slightly above midpoint of budget",
      "Open to equity compensation as partial offset",
    ],
  },
};

const amanBreakdown: ScoreBreakdown = {
  skill_fit: {
    score: 72,
    reasons: [
      "Node.js and Express experience matches backend requirements",
      "Missing experience with PostgreSQL — only used MongoDB",
      "No cloud deployment experience (AWS/Vercel) mentioned",
    ],
  },
  communication_fit: {
    score: 60,
    reasons: [
      "Screening responses were brief — lacked specific examples",
      "Technical explanations need more depth and clarity",
    ],
  },
  startup_fit: {
    score: 65,
    reasons: [
      "Mostly corporate internship experience — structured environments",
      "Mentioned preference for clear task assignments over ambiguity",
    ],
  },
  availability_fit: {
    score: 80,
    reasons: [
      "Available within 1 week — close to immediate",
      "Full-time commitment confirmed",
    ],
  },
  salary_fit: {
    score: 60,
    reasons: [
      "Expected ₹30k/month — above the ₹25k budget ceiling",
      "Did not indicate flexibility on compensation",
    ],
  },
};

export default function CandidatesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50 dark:bg-black p-8">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Candidates
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            View all candidates and AI rankings. Click &quot;View AI Analysis&quot; to see why each candidate received their score.
          </p>

          <div className="grid gap-6">
            <CandidateCard
              name="Rahul Sharma"
              role="Frontend Developer"
              score={95}
              status="Shortlisted"
              summary="Exceptional frontend candidate with direct React/Next.js experience and proven startup mentality. Strong technical match with immediate availability and reasonable salary expectations."
              scoreBreakdown={rahulBreakdown}
            />

            <CandidateCard
              name="Priya Singh"
              role="UI/UX Designer"
              score={82}
              status="Under Review"
              summary="Strong design skills with startup freelancing experience. Slight gaps in frontend coding and availability timing, but excellent communication and cultural fit."
              scoreBreakdown={priyaBreakdown}
            />

            <CandidateCard
              name="Aman Gupta"
              role="Backend Developer"
              score={68}
              status="Pending"
              summary="Solid Node.js fundamentals but missing key stack requirements (PostgreSQL, cloud). Communication needs improvement and salary expectations exceed budget."
              scoreBreakdown={amanBreakdown}
            />
          </div>

        </div>
      </main>
    </>
  );
}
