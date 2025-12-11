import "./SummaryCard.css";

const SummaryCard = ({ title, amount, transactions, accent }) => {
  return (
    <div className="glass-card" style={{ width: 260 }}>
      <small className="muted">{title}</small>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <h4 style={{ margin: 0 }}>₹{amount}</h4>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13 }} className="muted">{transactions} tx</div>
          <div style={{ height: 8 }} />
          <div style={{
            width: 38,
            height: 8,
            borderRadius: 99,
            background: accent || "linear-gradient(90deg,#4b8fff,#2f6fff)"
          }} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
