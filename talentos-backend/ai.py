import os
import json
from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API_KEY", ""),
)

MODEL = os.getenv("NVIDIA_MODEL", "nvidia/llama-3.1-nemotron-70b-instruct")

COST_PER_TOKEN_INPUT = 0.00 / 1_000_000
COST_PER_TOKEN_OUTPUT = 0.00 / 1_000_000


def truncate_resume(resume_text: str, max_chars: int = 3000) -> str:
    if len(resume_text) <= max_chars:
        return resume_text
    truncated = resume_text[:max_chars]
    last_space = truncated.rfind(" ")
    if last_space > max_chars - 500:
        truncated = truncated[:last_space]
    print(f"[AI] Resume truncated from {len(resume_text)} to {len(truncated)} chars")
    return truncated + "..."


def calculate_weighted_score(technical: int, communication: int, motivation: int, culture_fit: int, job_type: str) -> float:
    weights = {
        "technical": {"technical": 0.40, "communication": 0.20, "motivation": 0.20, "culture_fit": 0.20},
        "sales": {"technical": 0.20, "communication": 0.40, "motivation": 0.25, "culture_fit": 0.15},
        "default": {"technical": 0.30, "communication": 0.25, "motivation": 0.25, "culture_fit": 0.20},
    }
    w = weights.get(job_type, weights["default"])
    score = (
        technical * w["technical"]
        + communication * w["communication"]
        + motivation * w["motivation"]
        + culture_fit * w["culture_fit"]
    )
    return round(score, 2)


def analyze_resume(
    job_title: str,
    job_description: str,
    required_skills: str,
    experience_required: str,
    salary_range: str,
    resume_text: str,
) -> dict:
    print(f"[AI] Analyzing resume for job: {job_title}")
    resume_text = truncate_resume(resume_text)

    system_prompt = (
        "You are TalentOS, an expert AI recruiter for "
        "early-stage startups. Analyze the candidate "
        "resume against the job and return ONLY valid "
        "JSON. No markdown, no explanation, "
        "no extra text outside the JSON."
    )

    user_prompt = f"""Analyze this candidate resume for the job below.

JOB DETAILS:
- Title: {job_title}
- Description: {job_description}
- Required Skills: {required_skills}
- Experience Required: {experience_required}
- Salary Range: {salary_range}

CANDIDATE RESUME:
{resume_text}

Return ONLY this JSON:
{{
  "overall_resume_score": 0,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "gaps": ["gap 1", "gap 2"],
  "candidate_summary": "2-3 sentence summary",
  "question_1": "personalized question",
  "question_2": "personalized question",
  "question_3": "personalized question",
  "question_4": "personalized question",
  "question_5": "personalized question"
}}

Rules for questions:
- Each question must reference something specific from THIS candidate resume
- Questions must test fit for THIS job
- Mix: 2 technical, 1 situational, 1 cultural, 1 motivational
- No generic questions like tell me about yourself"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
    )

    tokens_used = response.usage.total_tokens
    cost = round(tokens_used * COST_PER_TOKEN_INPUT, 6)
    print(f"[AI] Resume analysis tokens: {tokens_used}, cost: ${cost:.6f}")

    raw = response.choices[0].message.content
    cleaned = raw.replace("```json", "").replace("```", "").strip()
    result = json.loads(cleaned)
    result["_tokens"] = tokens_used
    result["_cost"] = cost
    print(f"[AI] Resume analysis complete, score: {result.get('overall_resume_score')}")
    return result


def score_candidate(
    job_title: str,
    job_description: str,
    required_skills: str,
    experience_required: str,
    resume_text: str,
    question_1: str,
    question_2: str,
    question_3: str,
    question_4: str,
    question_5: str,
    ans_q1: str,
    ans_q2: str,
    ans_q3: str,
    ans_q4: str,
    ans_q5: str,
) -> dict:
    print(f"[AI] Scoring candidate for job: {job_title}")
    resume_text = truncate_resume(resume_text)

    system_prompt = (
        "You are TalentOS, an expert AI evaluator for "
        "early-stage startups. Score the candidate strictly "
        "and return ONLY valid JSON. No markdown, "
        "no explanation, no extra text outside the JSON."
    )

    user_prompt = f"""Score this candidate for the job below.

JOB DETAILS:
- Title: {job_title}
- Description: {job_description}
- Required Skills: {required_skills}
- Experience Required: {experience_required}

CANDIDATE RESUME:
{resume_text}

CANDIDATE ANSWERS:
Q1 — {question_1}: {ans_q1}
Q2 — {question_2}: {ans_q2}
Q3 — {question_3}: {ans_q3}
Q4 — {question_4}: {ans_q4}
Q5 — {question_5}: {ans_q5}

Return ONLY this JSON:
{{
  "technical_score": 0,
  "technical_reason": "one sentence why",
  "technical_evidence": "which answer or resume part supports this",
  "communication_score": 0,
  "communication_reason": "one sentence why",
  "communication_evidence": "which answer supports this",
  "motivation_score": 0,
  "motivation_reason": "one sentence why",
  "motivation_evidence": "which answer supports this",
  "culture_fit_score": 0,
  "culture_fit_reason": "one sentence why",
  "culture_fit_evidence": "which answer supports this",
  "overall_score": 0,
  "final_recommendation": "Strong Hire / Maybe / No Hire",
  "recommendation_summary": "2-3 sentences about candidate",
  "red_flags": ["any concerns about candidate"],
  "green_flags": ["standout positives"]
}}

Scoring rules:
- overall_score = average of all 4 scores
- Strong Hire = overall_score >= 7.5
- Maybe = overall_score 5.0 to 7.4
- No Hire = overall_score below 5.0
- Be strict — not every candidate is a Strong Hire"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
    )

    tokens_used = response.usage.total_tokens
    cost = round(tokens_used * COST_PER_TOKEN_INPUT, 6)
    print(f"[AI] Scoring tokens: {tokens_used}, cost: ${cost:.6f}")

    raw = response.choices[0].message.content
    cleaned = raw.replace("```json", "").replace("```", "").strip()
    result = json.loads(cleaned)
    result["_tokens"] = tokens_used
    result["_cost"] = cost
    print(f"[AI] Scoring complete, overall: {result.get('overall_score')}")
    return result
