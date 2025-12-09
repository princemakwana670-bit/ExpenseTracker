import "../styles/TransactionSummaryCard.css";

const TransactionSummaryCard = ({ title, transactions, expenses }) => {
  return (
    <div className="ts-card">
      <h3 className="ts-title">{title}</h3>

      <div className="ts-row">
        <span className="label">Transactions:</span>
        <span className="value">{transactions}</span>
      </div>

      <div className="ts-row">
        <span className="label">Expenses:</span>
        <span className="value">₹{expenses}</span>
      </div>
    </div>
  );
};

export default TransactionSummaryCard;
