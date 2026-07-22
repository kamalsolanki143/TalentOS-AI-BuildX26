import os
import json
from typing import Optional
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

job_cache = {}

_JOBS_SHEET_NAME = os.getenv("JOBS_SHEET_NAME", "Jobs")
_CANDIDATES_SHEET_NAME = os.getenv("CANDIDATES_SHEET_NAME", "Candidates")


def _get_client():
    creds_json = os.getenv("GOOGLE_CREDENTIALS_JSON")
    if creds_json:
        creds_dict = json.loads(creds_json)
        creds = Credentials.from_service_account_info(creds_dict, scopes=SCOPES)
    else:
        creds = Credentials.from_service_account_file(
            "credentials.json", scopes=SCOPES
        )
    return gspread.authorize(creds)


def _get_jobs_sheet():
    client = _get_client()
    return client.open(_JOBS_SHEET_NAME).sheet1


def _get_candidates_sheet():
    client = _get_client()
    return client.open(_CANDIDATES_SHEET_NAME).sheet1


def _clean_key(key):
    return key.strip().lower().replace(" ", "_")


def _row_to_dict(headers, row):
    result = {}
    for i, h in enumerate(headers):
        clean = _clean_key(h)
        result[clean] = row[i] if i < len(row) else ""
    return result


def save_job(data: dict):
    print(f"[Sheets] Saving job {data['job_id']}")
    sheet = _get_jobs_sheet()
    row = [
        "",  # Timestamp column (from Google Forms)
        data["job_id"],
        data["job_title"],
        data["company_name"],
        data["job_description"],
        data["required_skills"],
        data["experience_required"],
        data["salary_range"],
        data["founder_email"],
        data.get("created_at", ""),
        data.get("job_type", "default"),
    ]
    sheet.append_row(row, value_input_option="RAW")
    print(f"[Sheets] Job {data['job_id']} saved")


def get_job(job_id: str) -> Optional[dict]:
    if job_id in job_cache:
        print(f"[Sheets] Job {job_id} returned from cache")
        return job_cache[job_id]

    print(f"[Sheets] Fetching job {job_id}")
    sheet = _get_jobs_sheet()
    headers = sheet.row_values(1)
    all_rows = sheet.get_all_values()
    for row in all_rows[1:]:
        record = _row_to_dict(headers, row)
        if record.get("job_id") == job_id:
            job_cache[job_id] = record
            print(f"[Sheets] Job {job_id} found and cached")
            return record
    print(f"[Sheets] Job {job_id} not found")
    return None


def save_candidate(data: dict):
    print(f"[Sheets] Saving candidate {data['email']}")
    sheet = _get_candidates_sheet()
    row = [
        "",  # Timestamp column (from Google Forms)
        data.get("job_id", ""),
        data.get("name", ""),
        data.get("email", ""),
        data.get("phone", ""),
        data.get("resume_text", ""),
        data.get("status", ""),
        data.get("applied_date", ""),
        data.get("overall_resume_score", ""),
        data.get("strengths", ""),
        data.get("gaps", ""),
        data.get("candidate_summary", ""),
        data.get("question_1", ""),
        data.get("question_2", ""),
        data.get("question_3", ""),
        data.get("question_4", ""),
        data.get("question_5", ""),
        data.get("ans_q1", ""),
        data.get("ans_q2", ""),
        data.get("ans_q3", ""),
        data.get("ans_q4", ""),
        data.get("ans_q5", ""),
        data.get("technical_score", ""),
        data.get("technical_reason", ""),
        data.get("communication_score", ""),
        data.get("communication_reason", ""),
        data.get("motivation_score", ""),
        data.get("motivation_reason", ""),
        data.get("culture_fit_score", ""),
        data.get("culture_fit_reason", ""),
        data.get("overall_score", ""),
        data.get("final_recommendation", ""),
        data.get("recommendation_summary", ""),
        data.get("screening_complete", ""),
        data.get("job_type", ""),
        data.get("weighted_score", ""),
        data.get("technical_evidence", ""),
        data.get("communication_evidence", ""),
        data.get("motivation_evidence", ""),
        data.get("culture_fit_evidence", ""),
        data.get("red_flags", ""),
        data.get("green_flags", ""),
        data.get("processing_log", ""),
        data.get("ai_tokens_used", ""),
        data.get("ai_cost_usd", ""),
        data.get("percentile", ""),
    ]
    sheet.append_row(row, value_input_option="RAW")
    print(f"[Sheets] Candidate {data['email']} saved")


def get_candidate(email: str) -> tuple:
    print(f"[Sheets] Fetching candidate {email}")
    sheet = _get_candidates_sheet()
    headers = sheet.row_values(1)
    all_rows = sheet.get_all_values()
    for idx, row in enumerate(all_rows[1:], start=2):
        record = _row_to_dict(headers, row)
        if record.get("email") == email:
            print(f"[Sheets] Candidate {email} found at row {idx}")
            return record, idx
    print(f"[Sheets] Candidate {email} not found")
    return None, None


def get_candidates_by_job(job_id: str) -> list:
    print(f"[Sheets] Fetching candidates for job {job_id}")
    sheet = _get_candidates_sheet()
    headers = sheet.row_values(1)
    all_rows = sheet.get_all_values()
    candidates = []
    for row in all_rows[1:]:
        record = _row_to_dict(headers, row)
        if record.get("job_id") == job_id:
            candidates.append(record)
    print(f"[Sheets] Found {len(candidates)} candidates for job {job_id}")
    return candidates


def update_candidate(row_number: int, updates: dict):
    print(f"[Sheets] Updating candidate row {row_number} with keys: {list(updates.keys())}")
    sheet = _get_candidates_sheet()
    headers = sheet.row_values(1)
    clean_headers = [_clean_key(h) for h in headers]
    for key, value in updates.items():
        clean_key = _clean_key(key)
        if clean_key in clean_headers:
            col_idx = clean_headers.index(clean_key) + 1
            sheet.update_cell(row_number, col_idx, str(value))
    print(f"[Sheets] Row {row_number} updated")


def append_processing_log(email: str, message: str):
    candidate, row_num = get_candidate(email)
    if not candidate:
        return
    existing = candidate.get("processing_log", "")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    entry = f"{timestamp} — {message}"
    new_log = f"{existing}\n{entry}" if existing else entry
    update_candidate(row_num, {"processing_log": new_log})


def get_all_candidates_for_job(job_id: str) -> tuple:
    print(f"[Sheets] Fetching ALL candidates for cost summary: {job_id}")
    candidates = get_candidates_by_job(job_id)
    total_cost = 0.0
    total_tokens = 0
    for c in candidates:
        try:
            total_cost += float(c.get("ai_cost_usd", 0))
        except (ValueError, TypeError):
            pass
        try:
            total_tokens += int(c.get("ai_tokens_used", 0))
        except (ValueError, TypeError):
            pass
    return candidates, total_cost, total_tokens
