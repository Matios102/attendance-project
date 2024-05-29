import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ImDatabase } from "react-icons/im";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables, ChartOptions } from 'chart.js';

Chart.register(...registerables);

const Data = () => {
  const [photoData, setPhotoData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data/`);
        setPhotoData(response.data);
      } catch (error) {
        console.error("Error fetching photo data:", error);
      }
    };

    fetchData();
  }, []);

  // Define all month names
  const allMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Ensure all months are represented in the data
  const chartData = allMonths.map(month => photoData?.[month] ?? 0);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Photos by Month',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-5xl font-semibold mb-5">
          <h2>Information about our data</h2>
          <ImDatabase />
        </div>
      </div>
      <div className="my-5">
        {photoData && (
          <Bar
            data={{
              labels: allMonths,
              datasets: [
                {
                  label: "Number of Photos",
                  backgroundColor: "rgba(75,192,192,1)",
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 1,
                  hoverBackgroundColor: "rgba(75,192,192,0.4)",
                  hoverBorderColor: "rgba(75,192,192,1)",
                  data: chartData,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Data;
