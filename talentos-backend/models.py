from pydantic import BaseModel
from typing import List


class JobCreated(BaseModel):
    job_id: str
    job_title: str
    company_name: str
    job_description: str
    required_skills: str
    experience_required: str
    salary_range: str
    founder_email: str
    job_type: str = "default"


class CandidateApplied(BaseModel):
    job_id: str
    name: str
    email: str
    phone: str
    resume_text: str


class AnswersSubmitted(BaseModel):
    job_id: str
    candidate_email: str
    ans_q1: str
    ans_q2: str
    ans_q3: str
    ans_q4: str
    ans_q5: str


class BulkCandidates(BaseModel):
    candidates: List[CandidateApplied]
