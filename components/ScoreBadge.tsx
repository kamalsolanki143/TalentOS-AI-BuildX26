type ScoreBadgeProps = {
  score: number;
};

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  let label = "Average";
  let color = "bg-yellow-100 text-yellow-800";

  if (score >= 90) {
    label = "Excellent";
    color = "bg-green-100 text-green-800";
  } else if (score >= 75) {
    label = "Good Fit";
    color = "bg-blue-100 text-blue-800";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}
    >
      {score} • {label}
    </span>
  );
}