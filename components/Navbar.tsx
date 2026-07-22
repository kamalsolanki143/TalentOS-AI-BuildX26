import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-8 py-4">
      <div>
        <h1 className="text-2xl font-bold">TalentOS</h1>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/jobs">Jobs</Link>
        <Link href="/dashboard/candidates">Candidates</Link>

        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
          Get Started
        </button>
      </div>
    </nav>
  );
}