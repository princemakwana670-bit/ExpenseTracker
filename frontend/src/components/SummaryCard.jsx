export default function SummaryCard({ title, amount, subtitle }) {
  return (
    <div className="summary-card">
      <small className="text-muted">{title}</small>
      <div className="stat-amount">${amount.toFixed(2)}</div>
      <div className="stat-sub">{subtitle}</div>
    </div>
  );
}
