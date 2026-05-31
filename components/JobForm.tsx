export default function JobForm() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
        Create New Job
      </h2>

      <form className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Frontend Developer"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Company Name
          </label>
          <input
            type="text"
            placeholder="TalentOS"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Job Description
          </label>
          <textarea
            rows={5}
            placeholder="Describe the role..."
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Required Skills
          </label>
          <input
            type="text"
            placeholder="React, Next.js, TypeScript"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Experience Level
          </label>
          <select className="w-full border rounded-xl px-4 py-3">
            <option>Fresher</option>
            <option>0-1 Years</option>
            <option>1-3 Years</option>
            <option>3+ Years</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Salary / Stipend
          </label>
          <input
            type="text"
            placeholder="₹25,000/month"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Screening Questions
          </label>
          <textarea
            rows={4}
            placeholder="Why do you want to join our startup?"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90"
        >
          Create Application Form
        </button>
      </form>
    </div>
  );
}