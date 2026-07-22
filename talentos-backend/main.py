import os
import asyncio
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import date, datetime

import sheets
import ai
import email_service
from models import JobCreated, CandidateApplied, AnswersSubmitted, BulkCandidates

app = FastAPI(title="TalentOS Backend", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CHAT_UI_BASE_URL = os.getenv("CHAT_UI_BASE_URL", "https://talentos.in/chat")
DASHBOARD_BASE_URL = os.getenv("DASHBOARD_BASE_URL", "https://talentos.in/dashboard")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "TalentOS Backend"}


@app.get("/privacy-policy")
async def privacy_policy():
    return {
        "data_collected": ["Name", "Email", "Phone", "Resume", "Interview answers"],
        "data_storage": "Google Sheets — secured",
        "data_usage": "Recruitment process only",
        "third_party_sharing": "None",
        "data_retention": "30 days",
        "deletion_request": "privacy@talentos.in",
    }


@app.get("/integration-plan")
async def integration_plan():
    return {
        "version": "2.0.0",
        "features": [
            "Weighted ranking by job type",
            "Explainable AI with evidence",
            "Data transparency routes",
            "Audit trail per candidate",
            "AI cost tracking",
            "Bulk processing for scale",
            "Percentile ranking",
            "Resume truncation",
            "Job details caching",
        ],
        "endpoints": {
            "POST /webhook/job-created": "Create job posting",
            "POST /webhook/candidate-applied": "Process candidate application",
            "POST /webhook/answers-submitted": "Score candidate answers",
            "POST /webhook/bulk-candidates": "Bulk process candidates",
            "GET /dashboard/{job_id}": "Ranked candidate dashboard",
            "GET /candidate/{email}": "Single candidate details",
            "GET /audit-trail/{email}": "Candidate processing audit trail",
            "GET /cost-summary/{job_id}": "AI cost summary for job",
            "GET /privacy-policy": "Data privacy policy",
            "GET /integration-plan": "Integration overview",
            "GET /health": "Health check",
        },
    }


@app.post("/webhook/job-created")
async def job_created(data: JobCreated):
    try:
        print(f"[Route] Job created: {data.job_id}")

        job_data = data.model_dump()
        job_data["created_at"] = date.today().isoformat()
        sheets.save_job(job_data)

        application_link = f"https://talentos.in/apply?job_id={data.job_id}"
        print(f"[Route] Job {data.job_id} saved, link: {application_link}")

        return {
            "status": "ok",
            "job_id": data.job_id,
            "application_link": application_link,
        }
    except Exception as e:
        print(f"[Route] Error in job_created: {e}")
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})


@app.post("/webhook/candidate-applied")
async def candidate_applied(data: CandidateApplied):
    try:
        print(f"[Route] Candidate applied: {data.email} for job {data.job_id}")

        candidate_row = {
            "job_id": data.job_id,
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "resume_text": data.resume_text,
            "status": "form_submitted",
            "applied_date": date.today().isoformat(),
        }
        sheets.save_candidate(candidate_row)
        sheets.append_processing_log(data.email, "Application submitted")

        job = sheets.get_job(data.job_id)
        if not job:
            raise Exception(f"Job {data.job_id} not found")

        try:
            email_service.send_application_received(
                candidate_name=data.name,
                job_title=job["job_title"],
                company_name=job["company_name"],
                to_email=data.email,
            )
            sheets.append_processing_log(data.email, "Application Received email sent")
        except Exception as email_err:
            print(f"[Route] Email failed (non-blocking): {email_err}")

        print(f"[Route] Analyzing resume for {data.email}")
        analysis = ai.analyze_resume(
            job_title=job["job_title"],
            job_description=job["job_description"],
            required_skills=job["required_skills"],
            experience_required=job["experience_required"],
            salary_range=job["salary_range"],
            resume_text=data.resume_text,
        )

        _, row_num = sheets.get_candidate(data.email)
        if not row_num:
            raise Exception(f"Candidate row not found for {data.email}")

        strengths_str = " | ".join(analysis.get("strengths", []))
        gaps_str = " | ".join(analysis.get("gaps", []))

        sheets.update_candidate(row_num, {
            "overall_resume_score": analysis.get("overall_resume_score", 0),
            "strengths": strengths_str,
            "gaps": gaps_str,
            "candidate_summary": analysis.get("candidate_summary", ""),
            "question_1": analysis.get("question_1", ""),
            "question_2": analysis.get("question_2", ""),
            "question_3": analysis.get("question_3", ""),
            "question_4": analysis.get("question_4", ""),
            "question_5": analysis.get("question_5", ""),
            "status": "ready_for_screening",
            "ai_tokens_used": analysis.get("_tokens", 0),
            "ai_cost_usd": analysis.get("_cost", 0),
            "job_type": job.get("job_type", "default"),
        })
        sheets.append_processing_log(data.email, "Resume analyzed, screening questions generated")

        try:
            email_service.send_resume_analyzed(
                candidate_name=data.name,
                job_title=job["job_title"],
                overall_resume_score=analysis.get("overall_resume_score", 0),
                strengths=analysis.get("strengths", []),
                gaps=analysis.get("gaps", []),
                candidate_email=data.email,
                job_id=data.job_id,
            )
            sheets.append_processing_log(data.email, "Resume Analyzed email sent")
        except Exception as email_err:
            print(f"[Route] Email failed (non-blocking): {email_err}")

        print(f"[Route] Candidate-applied complete for {data.email}")
        return {
            "status": "ok",
            "resume_score": analysis.get("overall_resume_score", 0),
            "candidate_summary": analysis.get("candidate_summary", ""),
            "question_1": analysis.get("question_1", ""),
            "question_2": analysis.get("question_2", ""),
            "question_3": analysis.get("question_3", ""),
            "question_4": analysis.get("question_4", ""),
            "question_5": analysis.get("question_5", ""),
        }
    except Exception as e:
        print(f"[Route] Error in candidate_applied: {e}")
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})


@app.post("/webhook/answers-submitted")
async def answers_submitted(data: AnswersSubmitted):
    try:
        print(f"[Route] Answers submitted by {data.candidate_email} for job {data.job_id}")

        candidate, row_num = sheets.get_candidate(data.candidate_email)
        if not candidate:
            raise Exception(f"Candidate {data.candidate_email} not found")

        sheets.update_candidate(row_num, {
            "ans_q1": data.ans_q1,
            "ans_q2": data.ans_q2,
            "ans_q3": data.ans_q3,
            "ans_q4": data.ans_q4,
            "ans_q5": data.ans_q5,
            "status": "scoring",
        })
        sheets.append_processing_log(data.candidate_email, "Answers received, scoring started")

        job = sheets.get_job(data.job_id)
        if not job:
            raise Exception(f"Job {data.job_id} not found")

        print(f"[Route] Scoring candidate {data.candidate_email}")
        scores = ai.score_candidate(
            job_title=job["job_title"],
            job_description=job["job_description"],
            required_skills=job["required_skills"],
            experience_required=job["experience_required"],
            resume_text=candidate.get("resume_text", ""),
            question_1=candidate.get("question_1", ""),
            question_2=candidate.get("question_2", ""),
            question_3=candidate.get("question_3", ""),
            question_4=candidate.get("question_4", ""),
            question_5=candidate.get("question_5", ""),
            ans_q1=data.ans_q1,
            ans_q2=data.ans_q2,
            ans_q3=data.ans_q3,
            ans_q4=data.ans_q4,
            ans_q5=data.ans_q5,
        )

        job_type = job.get("job_type", "default")
        weighted = ai.calculate_weighted_score(
            technical=scores.get("technical_score", 0),
            communication=scores.get("communication_score", 0),
            motivation=scores.get("motivation_score", 0),
            culture_fit=scores.get("culture_fit_score", 0),
            job_type=job_type,
        )

        red_flags_str = " | ".join(scores.get("red_flags", []))
        green_flags_str = " | ".join(scores.get("green_flags", []))

        existing_tokens = 0
        existing_cost = 0.0
        try:
            existing_tokens = int(candidate.get("ai_tokens_used", 0))
            existing_cost = float(candidate.get("ai_cost_usd", 0))
        except (ValueError, TypeError):
            pass

        total_tokens = existing_tokens + scores.get("_tokens", 0)
        total_cost = round(existing_cost + scores.get("_cost", 0), 6)

        sheets.update_candidate(row_num, {
            "technical_score": scores.get("technical_score", 0),
            "technical_reason": scores.get("technical_reason", ""),
            "technical_evidence": scores.get("technical_evidence", ""),
            "communication_score": scores.get("communication_score", 0),
            "communication_reason": scores.get("communication_reason", ""),
            "communication_evidence": scores.get("communication_evidence", ""),
            "motivation_score": scores.get("motivation_score", 0),
            "motivation_reason": scores.get("motivation_reason", ""),
            "motivation_evidence": scores.get("motivation_evidence", ""),
            "culture_fit_score": scores.get("culture_fit_score", 0),
            "culture_fit_reason": scores.get("culture_fit_reason", ""),
            "culture_fit_evidence": scores.get("culture_fit_evidence", ""),
            "overall_score": scores.get("overall_score", 0),
            "weighted_score": weighted,
            "final_recommendation": scores.get("final_recommendation", ""),
            "recommendation_summary": scores.get("recommendation_summary", ""),
            "red_flags": red_flags_str,
            "green_flags": green_flags_str,
            "status": "completed",
            "screening_complete": "true",
            "ai_tokens_used": total_tokens,
            "ai_cost_usd": total_cost,
        })
        sheets.append_processing_log(data.candidate_email, f"Scoring complete. Overall: {scores.get('overall_score')}, Weighted: {weighted}, Recommendation: {scores.get('final_recommendation')}")

        try:
            email_service.send_screening_complete(
                candidate_name=candidate.get("name", ""),
                job_title=job["job_title"],
                to_email=data.candidate_email,
            )
            sheets.append_processing_log(data.candidate_email, "Screening Complete email sent")
        except Exception as email_err:
            print(f"[Route] Email failed (non-blocking): {email_err}")

        if scores.get("final_recommendation") == "Strong Hire":
            try:
                email_service.send_strong_hire_alert(
                    job_title=job["job_title"],
                    candidate_name=candidate.get("name", ""),
                    candidate_email=data.candidate_email,
                    candidate_phone=candidate.get("phone", ""),
                    overall_score=scores.get("overall_score", 0),
                    final_recommendation=scores.get("final_recommendation", ""),
                    technical_score=scores.get("technical_score", 0),
                    technical_reason=scores.get("technical_reason", ""),
                    communication_score=scores.get("communication_score", 0),
                    communication_reason=scores.get("communication_reason", ""),
                    motivation_score=scores.get("motivation_score", 0),
                    motivation_reason=scores.get("motivation_reason", ""),
                    culture_fit_score=scores.get("culture_fit_score", 0),
                    culture_fit_reason=scores.get("culture_fit_reason", ""),
                    recommendation_summary=scores.get("recommendation_summary", ""),
                    job_id=data.job_id,
                    founder_email=job.get("founder_email", ""),
                )
                sheets.append_processing_log(data.candidate_email, "Strong Hire Alert sent to founder")
            except Exception as email_err:
                print(f"[Route] Email failed (non-blocking): {email_err}")

        print(f"[Route] Answers-submitted complete for {data.candidate_email}")
        return {
            "status": "ok",
            "overall_score": scores.get("overall_score", 0),
            "weighted_score": weighted,
            "final_recommendation": scores.get("final_recommendation", ""),
            "recommendation_summary": scores.get("recommendation_summary", ""),
        }
    except Exception as e:
        print(f"[Route] Error in answers_submitted: {e}")
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})


async def _process_single_candidate(data: CandidateApplied) -> dict:
    try:
        candidate_row = {
            "job_id": data.job_id,
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "resume_text": data.resume_text,
            "status": "form_submitted",
            "applied_date": date.today().isoformat(),
        }
        sheets.save_candidate(candidate_row)
        sheets.append_processing_log(data.email, "Bulk application submitted")

        job = sheets.get_job(data.job_id)
        if not job:
            return {"email": data.email, "status": "error", "message": f"Job {data.job_id} not found"}

        email_service.send_application_received(
            candidate_name=data.name,
            job_title=job["job_title"],
            company_name=job["company_name"],
            to_email=data.email,
        )

        analysis = ai.analyze_resume(
            job_title=job["job_title"],
            job_description=job["job_description"],
            required_skills=job["required_skills"],
            experience_required=job["experience_required"],
            salary_range=job["salary_range"],
            resume_text=data.resume_text,
        )

        _, row_num = sheets.get_candidate(data.email)
        if not row_num:
            return {"email": data.email, "status": "error", "message": "Row not found after save"}

        strengths_str = " | ".join(analysis.get("strengths", []))
        gaps_str = " | ".join(analysis.get("gaps", []))

        sheets.update_candidate(row_num, {
            "overall_resume_score": analysis.get("overall_resume_score", 0),
            "strengths": strengths_str,
            "gaps": gaps_str,
            "candidate_summary": analysis.get("candidate_summary", ""),
            "question_1": analysis.get("question_1", ""),
            "question_2": analysis.get("question_2", ""),
            "question_3": analysis.get("question_3", ""),
            "question_4": analysis.get("question_4", ""),
            "question_5": analysis.get("question_5", ""),
            "status": "ready_for_screening",
            "ai_tokens_used": analysis.get("_tokens", 0),
            "ai_cost_usd": analysis.get("_cost", 0),
            "job_type": job.get("job_type", "default"),
        })

        email_service.send_resume_analyzed(
            candidate_name=data.name,
            job_title=job["job_title"],
            overall_resume_score=analysis.get("overall_resume_score", 0),
            strengths=analysis.get("strengths", []),
            gaps=analysis.get("gaps", []),
            candidate_email=data.email,
            job_id=data.job_id,
        )
        sheets.append_processing_log(data.email, "Bulk processing complete")

        return {
            "email": data.email,
            "status": "ok",
            "resume_score": analysis.get("overall_resume_score", 0),
        }
    except Exception as e:
        print(f"[Route] Error processing {data.email}: {e}")
        return {"email": data.email, "status": "error", "message": str(e)}


@app.post("/webhook/bulk-candidates")
async def bulk_candidates(data: BulkCandidates):
    try:
        print(f"[Route] Bulk candidates: {len(data.candidates)} received")
        results = []
        batch_size = 10

        for i in range(0, len(data.candidates), batch_size):
            batch = data.candidates[i : i + batch_size]
            batch_results = await asyncio.gather(
                *[_process_single_candidate(c) for c in batch]
            )
            results.extend(batch_results)

            if i + batch_size < len(data.candidates):
                print(f"[Route] Processed batch {i // batch_size + 1}, waiting 1s...")
                await asyncio.sleep(1)

        success_count = sum(1 for r in results if r["status"] == "ok")
        error_count = sum(1 for r in results if r["status"] == "error")
        print(f"[Route] Bulk complete: {success_count} ok, {error_count} errors")

        return {
            "status": "ok",
            "total_processed": len(results),
            "success_count": success_count,
            "error_count": error_count,
            "results": results,
        }
    except Exception as e:
        print(f"[Route] Error in bulk_candidates: {e}")
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})


@app.get("/dashboard/{job_id}")
async def dashboard(job_id: str):
    try:
        print(f"[Route] Dashboard requested for job {job_id}")

        candidates = sheets.get_candidates_by_job(job_id)
        completed = [c for c in candidates if c.get("status") == "completed"]
        total_candidates = len(completed)

        for c in completed:
            try:
                c["weighted_score"] = float(c.get("weighted_score", 0))
            except (ValueError, TypeError):
                c["weighted_score"] = 0.0

        completed.sort(key=lambda x: x["weighted_score"], reverse=True)

        result = []
        for rank, c in enumerate(completed, start=1):
            percentile = round((rank / total_candidates) * 100, 1) if total_candidates > 0 else 0
            c["percentile"] = percentile

            sheets.update_candidate(
                list(range(2, 2 + len(candidates) + 1))[candidates.index(c) if c in candidates else 0],
                {"percentile": percentile},
            )

            score_breakdown = {
                "technical": {
                    "score": c.get("technical_score", ""),
                    "reason": c.get("technical_reason", ""),
                    "evidence": c.get("technical_evidence", ""),
                },
                "communication": {
                    "score": c.get("communication_score", ""),
                    "reason": c.get("communication_reason", ""),
                    "evidence": c.get("communication_evidence", ""),
                },
                "motivation": {
                    "score": c.get("motivation_score", ""),
                    "reason": c.get("motivation_reason", ""),
                    "evidence": c.get("motivation_evidence", ""),
                },
                "culture_fit": {
                    "score": c.get("culture_fit_score", ""),
                    "reason": c.get("culture_fit_reason", ""),
                    "evidence": c.get("culture_fit_evidence", ""),
                },
            }

            result.append({
                "rank": rank,
                "name": c.get("name", ""),
                "email": c.get("email", ""),
                "phone": c.get("phone", ""),
                "resume_score": c.get("overall_resume_score", ""),
                "weighted_score": c.get("weighted_score", 0),
                "overall_score": c.get("overall_score", ""),
                "score_breakdown": score_breakdown,
                "red_flags": c.get("red_flags", ""),
                "green_flags": c.get("green_flags", ""),
                "final_recommendation": c.get("final_recommendation", ""),
                "recommendation_summary": c.get("recommendation_summary", ""),
                "applied_date": c.get("applied_date", ""),
                "percentile": percentile,
            })

        print(f"[Route] Dashboard: {len(result)} completed candidates for job {job_id}")
        return {
            "job_id": job_id,
            "total_candidates": len(result),
            "candidates": result,
        }
    except Exception as e:
        print(f"[Route] Error in dashboard: {e}")
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})


@app.get("/candidate/{email}")
async def get_candidate(email: str):
    try:
        print(f"[Route] Candidate details requested for {email}")

        candidate, _ = sheets.get_candidate(email)
        if not candidate:
            raise HTTPException(status_code=404, detail={"status": "error", "message": f"Candidate {email} not found"})

        print(f"[Route] Candidate {email} found")
        return {"status": "ok", "candidate": candidate}
    except HTTPException:
        raise
    except Exception as e:
        print(f"[Route] Error in get_candidate: {e}")
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})


@app.get("/audit-trail/{email}")
async def audit_trail(email: str):
    try:
        print(f"[Route] Audit trail requested for {email}")

        candidate, _ = sheets.get_candidate(email)
        if not candidate:
            raise HTTPException(status_code=404, detail={"status": "error", "message": f"Candidate {email} not found"})

        log = candidate.get("processing_log", "")
        entries = [e.strip() for e in log.split("\n") if e.strip()]

        timeline = []
        for entry in entries:
            parts = entry.split(" — ", 1)
            if len(parts) == 2:
                timeline.append({"timestamp": parts[0], "event": parts[1]})
            else:
                timeline.append({"timestamp": "", "event": entry})

        print(f"[Route] Audit trail: {len(timeline)} entries for {email}")
        return {
            "status": "ok",
            "email": email,
            "name": candidate.get("name", ""),
            "job_id": candidate.get("job_id", ""),
            "current_status": candidate.get("status", ""),
            "timeline": timeline,
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"[Route] Error in audit_trail: {e}")
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})


@app.get("/cost-summary/{job_id}")
async def cost_summary(job_id: str):
    try:
        print(f"[Route] Cost summary requested for job {job_id}")

        candidates, total_cost, total_tokens = sheets.get_all_candidates_for_job(job_id)
        count = len(candidates)
        avg_cost = round(total_cost / count, 6) if count > 0 else 0

        print(f"[Route] Cost summary: {count} candidates, ${total_cost:.6f} total")
        return {
            "job_id": job_id,
            "total_candidates": count,
            "total_ai_cost_usd": total_cost,
            "avg_cost_per_candidate_usd": avg_cost,
            "total_tokens_used": total_tokens,
            "model_used": os.getenv("NVIDIA_MODEL", "unknown"),
        }
    except Exception as e:
        print(f"[Route] Error in cost_summary: {e}")
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e)})
