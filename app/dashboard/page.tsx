import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            Founder Dashboard
          </h1>

          <p className="text-zinc-500 mb-10">
            Manage jobs, candidates and AI-powered hiring insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-sm text-zinc-500 mb-2">
                Total Jobs
              </h2>
              <p className="text-4xl font-bold">12</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-sm text-zinc-500 mb-2">
                Candidates
              </h2>
              <p className="text-4xl font-bold">84</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-sm text-zinc-500 mb-2">
                Shortlisted
              </h2>
              <p className="text-4xl font-bold">18</p>
            </div>
          </div>

          <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-3 text-zinc-600">
              <li>✅ New candidate applied for Frontend Developer</li>
              <li>🤖 AI scored 5 new applications</li>
              <li>🏆 2 candidates shortlisted today</li>
            </ul>

            <div className="mt-6 flex gap-4">
              <Link
                href="/dashboard/jobs"
                className="bg-black text-white px-5 py-2 rounded-xl text-sm"
              >
                + Post New Job
              </Link>

              <Link
                href="/dashboard/candidates"
                className="border border-black px-5 py-2 rounded-xl text-sm"
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