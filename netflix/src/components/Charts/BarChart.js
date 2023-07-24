import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '# ratings',
        data: [],
        backgroundColor: [], // Modify the backgroundColor property to an empty array
        borderColor: 'rgba(128, 21, 21, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getmovie`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const res = await response.json();
        
        if (res) {
          // Generate different shades of red using rgba format
          const shadesOfRed = res.data.map((item, index) => `rgba(128, 21, 21, ${1 - index * 0.1})`);

          setData({
            ...data,
            labels: res.data.map((item) => item.name),
            datasets: [
              {
                ...data.datasets[0],
                data: res.data.map((item) => item.rating),
                backgroundColor: shadesOfRed, // Assign the shades of red to the backgroundColor property
              },
            ],
          });
        }
      } catch (error) {
        console.log('Error fetching movie data:', error);
        toast.error('Error fetching movie data');
      }
    };
    fetchMovieData();
  }, []);

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontColor: 'white',
        fontSize: 18,
        padding: 20,
      },
    },
    plugins: {
      // Add custom style to set the background color of the chart canvas
      beforeDraw: function (chart) {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'red'; // Set the background color to red
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    },
  };

  return <Bar data={data} options={options} height={400} />;
};

export default BarChart;
