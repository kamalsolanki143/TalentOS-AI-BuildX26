export default function CandidateForm() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
        Apply for this Job
      </h2>

      <form className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            WhatsApp Number
          </label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            LinkedIn Profile
          </label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/username"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Portfolio / Website
          </label>
          <input
            type="url"
            placeholder="https://yourportfolio.com"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Resume Link
          </label>
          <input
            type="url"
            placeholder="Google Drive Resume Link"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Why should we hire you?
          </label>
          <textarea
            rows={4}
            placeholder="Tell us why you're a great fit..."
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}