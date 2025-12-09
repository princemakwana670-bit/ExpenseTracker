import Navbar from "../Components/Navbar";
import MainSection from "../Components/MainSection";
import Footer from "../Components/Footer";
import TransactionSummaryCard from "../Components/TransactionSummaryCard";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <TransactionSummaryCard
          title="Today's Summary"
          transactions={5}
          expenses={1200}
        />

        <TransactionSummaryCard
          title="This Week's Summary"
          transactions={23}
          expenses={7800}
        />

        <TransactionSummaryCard
          title="This Month's Summary"
          transactions={96}
          expenses={31200}
        />
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
