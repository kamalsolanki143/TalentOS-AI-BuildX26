import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY", "")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@talentos.in")
CHAT_UI_BASE_URL = os.getenv("CHAT_UI_BASE_URL", "https://talentos.in/chat")
DASHBOARD_BASE_URL = os.getenv("DASHBOARD_BASE_URL", "https://talentos.in/dashboard")


def send_application_received(candidate_name: str, job_title: str, company_name: str, to_email: str):
    print(f"[Email] Sending Application Received to {to_email}")
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p>Hi {candidate_name},</p>
        <p>Your application has been received successfully.</p>
        <p><strong>Role:</strong> {job_title}<br>
        <strong>Company:</strong> {company_name}</p>
        <p><strong>Next Step:</strong><br>
        Our AI will analyze your resume and send you screening questions. This takes under 2 minutes.</p>
        <br>
        <p>Best,<br>
        <strong>TalentOS — AI Hiring Co-Pilot</strong></p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #888;">Your data is stored securely and used only for this recruitment. Deleted after 30 days.</p>
    </div>
    """
    params = {"from": FROM_EMAIL, "to": [to_email], "subject": f"Application Received — {job_title} at {company_name}", "html": html}
    resend.Emails.send(params)
    print(f"[Email] Application Received sent to {to_email}")


def send_resume_analyzed(candidate_name: str, job_title: str, overall_resume_score: int, strengths: list, gaps: list, candidate_email: str, job_id: str):
    print(f"[Email] Sending Resume Analyzed to {candidate_email}")
    chat_link = f"{CHAT_UI_BASE_URL}?job_id={job_id}&email={candidate_email}"
    strengths_html = "".join(f"<li>{s}</li>" for s in strengths)
    gaps_html = "".join(f"<li>{g}</li>" for g in gaps)
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p>Hi {candidate_name},</p>
        <p>Your resume analysis is complete!</p>
        <p><strong>Resume Match Score:</strong> {overall_resume_score}/10</p>
        <p><strong>Your Strengths:</strong></p>
        <ul>{strengths_html}</ul>
        <p><strong>Areas to Explore:</strong></p>
        <ul>{gaps_html}</ul>
        <p><strong>Next Step:</strong><br>
        Click below to start your 5-question screening interview. Takes under 5 minutes.</p>
        <p><a href="{chat_link}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: #fff; text-decoration: none; border-radius: 6px;">Start Screening Interview</a></p>
        <br>
        <p>Best,<br>
        <strong>TalentOS — AI Hiring Co-Pilot</strong></p>
    </div>
    """
    params = {"from": FROM_EMAIL, "to": [candidate_email], "subject": f"Your Resume Has Been Analyzed — {job_title}", "html": html}
    resend.Emails.send(params)
    print(f"[Email] Resume Analyzed sent to {candidate_email}")


def send_screening_complete(candidate_name: str, job_title: str, to_email: str):
    print(f"[Email] Sending Screening Complete to {to_email}")
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p>Hi {candidate_name},</p>
        <p>You have successfully completed your screening interview for <strong>{job_title}</strong>.</p>
        <p>Our team will review your results and contact you if you are selected.</p>
        <p>Thank you for your time.</p>
        <br>
        <p>Best,<br>
        <strong>TalentOS — AI Hiring Co-Pilot</strong></p>
    </div>
    """
    params = {"from": FROM_EMAIL, "to": [to_email], "subject": "Screening Complete — Thank You!", "html": html}
    resend.Emails.send(params)
    print(f"[Email] Screening Complete sent to {to_email}")


def send_strong_hire_alert(
    job_title: str,
    candidate_name: str,
    candidate_email: str,
    candidate_phone: str,
    overall_score,
    final_recommendation: str,
    technical_score,
    technical_reason: str,
    communication_score,
    communication_reason: str,
    motivation_score,
    motivation_reason: str,
    culture_fit_score,
    culture_fit_reason: str,
    recommendation_summary: str,
    job_id: str,
    founder_email: str,
):
    print(f"[Email] Sending Strong Hire Alert to founder {founder_email}")
    dashboard_link = f"{DASHBOARD_BASE_URL}?job_id={job_id}"
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p>A strong candidate has completed screening.</p>
        <p><strong>Role:</strong> {job_title}</p>
        <hr>
        <p><strong>CANDIDATE DETAILS</strong><br>
        Name: {candidate_name}<br>
        Email: {candidate_email}<br>
        Phone: {candidate_phone}</p>
        <p><strong>OVERALL SCORE:</strong> {overall_score}/10<br>
        <strong>RECOMMENDATION:</strong> {final_recommendation}</p>
        <hr>
        <p><strong>AI SCORE BREAKDOWN</strong></p>
        <p><strong>Technical:</strong> {technical_score}/10<br>{technical_reason}</p>
        <p><strong>Communication:</strong> {communication_score}/10<br>{communication_reason}</p>
        <p><strong>Motivation:</strong> {motivation_score}/10<br>{motivation_reason}</p>
        <p><strong>Culture Fit:</strong> {culture_fit_score}/10<br>{culture_fit_reason}</p>
        <hr>
        <p><strong>SUMMARY</strong><br>{recommendation_summary}</p>
        <p><a href="{dashboard_link}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: #fff; text-decoration: none; border-radius: 6px;">View Full Dashboard</a></p>
        <br>
        <p><strong>TalentOS — AI Hiring Co-Pilot</strong></p>
    </div>
    """
    params = {"from": FROM_EMAIL, "to": [founder_email], "subject": f"\U0001f3af Strong Hire Alert — {job_title}", "html": html}
    resend.Emails.send(params)
    print(f"[Email] Strong Hire Alert sent to {founder_email}")
