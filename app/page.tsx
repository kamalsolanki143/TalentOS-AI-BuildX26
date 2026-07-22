import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">
        <span className="text-sm font-medium bg-black text-white dark:bg-white dark:text-black px-4 py-1 rounded-full mb-6">
          AI-Powered Hiring
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white max-w-3xl leading-tight">
          TalentOS — AI Hiring Co-Pilot for Early Stage Founders
        </h1>
        <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400 max-w-xl">
          Post jobs, screen candidates automatically, rank by AI score, and
          manage everything from one dashboard.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard/jobs"
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-medium hover:opacity-80 transition"
          >
            Create Job →
          </Link>
          <Link
            href="/dashboard"
            className="border border-black dark:border-white text-black dark:text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-50 dark:bg-zinc-950 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
          Why TalentOS?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              AI Screening
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Automatically screen resumes and score candidates based on job
              requirements.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              WhatsApp Workflow
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Send updates and collect responses from candidates directly on
              WhatsApp.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              Candidate Ranking
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              AI ranks top candidates so you spend time only on the best fits.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
          How TalentOS Works
        </h2>
        <div className="flex flex-col gap-6">
          {[
            { step: "01", title: "Post a Job", desc: "Fill in job title, skills, experience and salary." },
            { step: "02", title: "Candidates Apply", desc: "Share the auto-generated form link. Candidates fill it in seconds." },
            { step: "03", title: "AI Screens & Ranks", desc: "TalentOS scores every applicant automatically." },
            { step: "04", title: "You Shortlist", desc: "Review ranked candidates and shortlist with one click." },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6"
            >
              <span className="text-3xl font-bold text-zinc-300 dark:text-zinc-700">
                {item.step}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black dark:bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white dark:text-black mb-4">
          Ready to hire smarter?
        </h2>
        <p className="text-zinc-400 dark:text-zinc-600 mb-8">
          Start using TalentOS today — free during BuildX'26.
        </p>
        <Link
          href="/dashboard/jobs"
          className="bg-white text-black dark:bg-black dark:text-white px-8 py-3 rounded-full font-semibold hover:opacity-80 transition"
        >
          Create Your First Job →
        </Link>
      </section>

    </div>
  );
}