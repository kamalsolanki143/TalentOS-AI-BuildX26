import ScoreBadge from "./ScoreBadge";

type CandidateCardProps = {
  name: string;
  role: string;
  score: number;
  status: string;
};

export default function CandidateCard({
  name,
  role,
  score,
  status,
}: CandidateCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border shadow-sm">
      <h3 className="text-xl font-semibold mb-2">
        {name}
      </h3>

      <p className="text-zinc-500 mb-4">
        Applied for {role}
      </p>

      <div className="flex items-center justify-between">
        <ScoreBadge score={score} />

        <span className="text-sm font-medium">
          {status}
        </span>
      </div>
    </div>
  );
}