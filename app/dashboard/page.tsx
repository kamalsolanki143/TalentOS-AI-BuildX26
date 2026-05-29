import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50 dark:bg-black p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Founder Dashboard
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mb-10">
            Manage jobs, candidates and AI-powered hiring insights.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-sm text-zinc-500 mb-2">
                Total Jobs
              </h2>
              <p className="text-4xl font-bold text-black dark:text-white">
                12
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-sm text-zinc-500 mb-2">
                Candidates
              </h2>
              <p className="text-4xl font-bold text-black dark:text-white">
                84
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-sm text-zinc-500 mb-2">
                Shortlisted
              </h2>
              <p className="text-4xl font-bold text-black dark:text-white">
                18
              </p>
            </div>

          </div>

          {/* Recent Activity */}
          <div className="mt-10 bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li>✅ New candidate applied for Frontend Developer</li>
              <li>🤖 AI scored 5 new applications</li>
              <li>🏆 2 candidates shortlisted today</li>
            </ul>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/dashboard/jobs"
                className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-xl text-sm font-medium hover:opacity-80 transition"
              >
                + Post New Job
              </Link>

              <Link
                href="/dashboard/candidates"
                className="border border-black dark:border-white text-black dark:text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                View Candidates
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}