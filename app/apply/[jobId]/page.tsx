import Navbar from "@/components/Navbar";
import CandidateForm from "@/components/CandidateForm";

export default function ApplyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50 dark:bg-black p-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Frontend Developer
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              TalentOS • Remote • Internship
            </p>
          </div>

          <CandidateForm />
        </div>
      </main>
    </>
  );
}