import Navbar from "@/components/Navbar";

export default function AITransparencyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans">
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <span className="text-sm font-medium bg-black text-white dark:bg-white dark:text-black px-4 py-1 rounded-full mb-6 inline-block">
          AI Transparency
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mt-4">
          How Our AI Evaluates Candidates
        </h1>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          We believe in transparent, explainable AI. Here&apos;s exactly how TalentOS
          scores and ranks candidates — no black boxes.
        </p>
      </section>

      {/* Content */}
      <section className="px-6 pb-20 max-w-4xl mx-auto space-y-16">

        {/* How Our AI Works */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            🤖 How Our AI Works
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
            <p className="text-zinc-600 dark:text-zinc-300">
              TalentOS uses <strong>Google Gemini Flash</strong> — a fast, cost-effective AI model — to
              evaluate candidates against job requirements. The process is:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
              <li>A candidate applies with their profile (skills, experience, availability)</li>
              <li>Our AI evaluates the candidate against the specific job requirements</li>
              <li>The AI produces a score across 5 dimensions with specific reasons for each</li>
              <li>Candidates are ranked by weighted overall score</li>
              <li>Founders see the full breakdown — not just a number</li>
            </ol>
          </div>
        </div>

        {/* What Data We Use */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            📋 What Data We Use
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">
              The AI only sees job-relevant information. We <strong>never</strong> use
              demographic data (age, gender, ethnicity, photo) in scoring.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-4">
                <h4 className="font-semibold text-black dark:text-white mb-2">From the Job</h4>
                <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
                  <li>• Job title &amp; description</li>
                  <li>• Required skills</li>
                  <li>• Stipend/salary range</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-4">
                <h4 className="font-semibold text-black dark:text-white mb-2">From the Candidate</h4>
                <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
                  <li>• Skills listed</li>
                  <li>• Experience description</li>
                  <li>• Availability</li>
                  <li>• Expected stipend</li>
                  <li>• Screening Q&amp;A answers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Score Dimensions */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            📊 Score Dimensions &amp; Weights
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
            <p className="text-zinc-600 dark:text-zinc-300">
              Every candidate is evaluated on 5 dimensions. Each dimension is scored 0–100
              and contributes to the overall score based on these weights:
            </p>

            <div className="space-y-3">
              <DimensionBar
                name="Skill Fit"
                weight={30}
                description="How well the candidate's skills match job requirements"
                color="bg-blue-500"
              />
              <DimensionBar
                name="Startup Fit"
                weight={25}
                description="Adaptability, ownership mindset, fast-paced environment readiness"
                color="bg-purple-500"
              />
              <DimensionBar
                name="Communication Fit"
                weight={20}
                description="Clarity of responses, articulation, professionalism"
                color="bg-green-500"
              />
              <DimensionBar
                name="Salary Fit"
                weight={15}
                description="Alignment between expected compensation and job budget"
                color="bg-orange-500"
              />
              <DimensionBar
                name="Availability Fit"
                weight={10}
                description="Match between candidate availability and job timeline"
                color="bg-pink-500"
              />
            </div>

            <div className="mt-6 bg-white dark:bg-zinc-800 rounded-xl p-4">
              <p className="text-sm font-mono text-zinc-600 dark:text-zinc-300">
                <strong>Formula:</strong> overall_score = (skill_fit × 0.30) + (startup_fit × 0.25)
                + (communication_fit × 0.20) + (salary_fit × 0.15) + (availability_fit × 0.10)
              </p>
            </div>
          </div>
        </div>

        {/* How Rankings Work */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            🏆 How Rankings Are Determined
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
            <p className="text-zinc-600 dark:text-zinc-300">
              After all candidates for a job are scored, they are ranked by their
              weighted overall score (highest first). The ranking is:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-300">
              <li>• <strong>Deterministic</strong> — same inputs always produce the same ranking order</li>
              <li>• <strong>Per-job</strong> — rankings are relative to other candidates for the same position</li>
              <li>• <strong>Persistent</strong> — scores are cached so candidates aren&apos;t re-evaluated unnecessarily</li>
              <li>• <strong>Transparent</strong> — founders see exact scores and reasons, not just a rank number</li>
            </ul>
          </div>
        </div>

        {/* Explainable AI */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            💡 Explainable AI — We Show the &quot;Why&quot;
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
            <p className="text-zinc-600 dark:text-zinc-300">
              We don&apos;t just show a number like &quot;89/100&quot;. For every score, our AI provides
              specific reasons explaining <strong>why</strong> that score was given.
            </p>

            {/* Example Breakdown */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-black dark:text-white">
                Example: Skill Fit — 85/100
              </p>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
                <li>✅ Python and React skills match job requirements</li>
                <li>✅ Has 2 years of relevant project experience</li>
                <li>⚠️ Missing Docker experience (listed in requirements)</li>
              </ul>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300 text-sm">
              This breakdown is available for all 5 dimensions, for every scored candidate.
              Founders can expand any score to see the reasoning.
            </p>
          </div>
        </div>

        {/* Data Privacy */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            🔒 Data Privacy
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-black dark:text-white mb-2">What we guarantee</h4>
                <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
                  <li>• Data deleted after 30 days</li>
                  <li>• No third-party data sharing</li>
                  <li>• Data used only for this recruitment</li>
                  <li>• AI model does not train on your data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black dark:text-white mb-2">Your rights</h4>
                <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
                  <li>• Request data deletion anytime</li>
                  <li>• Ask for your score explanation</li>
                  <li>• Request human review of AI decisions</li>
                  <li>• Contact: privacy@talentos.in</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Fairness & Bias Mitigation */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            ⚖️ Fairness &amp; Bias Mitigation
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
            <p className="text-zinc-600 dark:text-zinc-300">
              We take active steps to minimize bias in our AI scoring:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-300">
              <li>
                <strong>No demographic data:</strong> The AI never sees name, gender, age, ethnicity,
                or photo. Scoring is based purely on skills, experience, and job-relevant responses.
              </li>
              <li>
                <strong>Structured rubric:</strong> Every candidate is evaluated on the same 5 dimensions
                with the same weights — no subjective &quot;gut feeling&quot; adjustments.
              </li>
              <li>
                <strong>Consistent criteria:</strong> The same prompt and evaluation framework is applied
                to all candidates for a given job, ensuring uniform treatment.
              </li>
              <li>
                <strong>Human oversight:</strong> AI scores are recommendations, not final decisions.
                Founders always make the final hiring call.
              </li>
              <li>
                <strong>Explainability:</strong> Because every score has visible reasons, biased or
                unfair scoring is detectable and challengeable.
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">
            Questions about our AI? Contact us at{" "}
            <a href="mailto:privacy@talentos.in" className="underline text-black dark:text-white">
              privacy@talentos.in
            </a>
          </p>
        </div>

      </section>
    </div>
  );
}

// ── DimensionBar component (local to this page) ─────────────
function DimensionBar({
  name,
  weight,
  description,
  color,
}: {
  name: string;
  weight: number;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-black dark:text-white text-sm">{name}</span>
        <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">{weight}%</span>
      </div>
      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${weight * 3.33}%` }} />
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}
