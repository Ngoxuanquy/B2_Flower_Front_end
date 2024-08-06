import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import Cookies from "js-cookie";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";

Chart.register(zoomPlugin);

const DashBoard = () => {
  const [totalRevenueData, setTotalRevenueData] = useState([]);
  const [labels, setLabels] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchTotalRevenueData();
  }, []);

  const fetchTotalRevenueData = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      "/transaction/getTotalRevenue",
      "Get"
    )
      .then((response) => {
        // Assuming the response contains an array of objects with year and revenue properties
        const data = response.metadata;
        const revenueData = data.map((item) => item.revenue);
        const labels = data.map((item) => item.year);
        setTotalRevenueData(revenueData);
        setLabels(labels);
      })
      .catch((error) => {
        console.error("Error fetching total revenue data:", error);
      });
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Revenue",
        data: totalRevenueData,
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white", // Color for X-axis labels
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          callback: function (value) {
            return `$${value}`; // Add dollar sign before the value
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Color for legend labels
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw}`; // Add dollar sign before the value in tooltips
          },
        },
        bodyColor: "white", // Color for tooltip body text
        titleColor: "white", // Color for tooltip title
      },
      title: {
        display: false, // Disable the built-in title
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    return () => {
      if (chart) chart.destroy();
    };
  }, []);

  return (
    <div>
      <div>
        <h3>Total Revenue</h3>
        <div>
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
