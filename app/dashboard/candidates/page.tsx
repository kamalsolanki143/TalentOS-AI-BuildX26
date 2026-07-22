import Navbar from "@/components/Navbar";
import CandidateCard from "@/components/CandidateCard";

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
            View all candidates and AI rankings.
          </p>

          <div className="grid gap-6">
            <CandidateCard
              name="Rahul Sharma"
              role="Frontend Developer"
              score={95}
              status="Shortlisted"
            />

            <CandidateCard
              name="Priya Singh"
              role="UI/UX Designer"
              score={82}
              status="Under Review"
            />

            <CandidateCard
              name="Aman Gupta"
              role="Backend Developer"
              score={68}
              status="Pending"
            />
          </div>

        </div>
      </main>
    </>
  );
}