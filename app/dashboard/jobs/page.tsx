import Navbar from "@/components/Navbar";
import JobForm from "@/components/JobForm";

export default function JobsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50 dark:bg-black p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Jobs
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Create and manage job postings.
          </p>

          <JobForm />
        </div>
      </main>
    </>
  );
}