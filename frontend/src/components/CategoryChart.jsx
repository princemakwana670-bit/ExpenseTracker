import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function CategoryChart({ expenses }) {
  // aggregate by category
  const map = new Map();
  expenses.forEach(e => {
    map.set(e.category, (map.get(e.category) || 0) + e.amount);
  });

  // fallback sample if empty
  if (map.size === 0) {
    map.set("Food & Dining", 1480);
    map.set("Transport", 1000);
  }

  const labels = Array.from(map.keys());
  const data = Array.from(map.values());

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#f6b93b", "#4b8fff", "#f78da7", "#7be495"],
        hoverOffset: 6
      }
    ]
  };

  return <Doughnut data={chartData} />;
}
