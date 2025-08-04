import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import api from "../config";

// Register Chart.js modules
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, Legend);

export default function JobCountChart() {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  api.get(`/api/count-by-date`)
    .then((res) => {
      const rawData = res.data; // format: { "2025-07-23": 5, ... }

      // Get today's date
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i)); // oldest to newest
        return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
      });

      // Prepare labels and values
      const labels = last7Days;
      const values = last7Days.map(date => rawData[date] || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: "Candidates",
            data: values,
            fill: true,
            backgroundColor: "rgba(93, 135, 255, 0.1)",
            borderColor: "#5D87FF",
            pointBackgroundColor: "#5D87FF",
            tension: 0.4,
          },
        ],
      });
    })
    .catch(() => setError("Could not load chart data"));
}, []);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // No legend on dashboard
      },
      tooltip: {
        backgroundColor: "#1e1e2d",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#999",
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: "rgba(200,200,200,0.1)",
        },
        ticks: {
          color: "#999",
          font: { size: 12 },
        },
      },
    },
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!chartData) return <p>Loading...</p>;

  return (
    <div style={{ height: "350px", backgroundColor: "#fff", borderRadius: "12px", padding: "1rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
      <h6 className="mb-3 text-muted">Jobs created Per Day</h6>
      <Line data={chartData} options={options} />
    </div>
  );
}
