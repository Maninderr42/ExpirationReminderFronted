import ReactApexChart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApexChart = () => {
  const [series, setSeries] = useState([40, 40, 40, 40, 40]);
  const [options, setOptions] = useState({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Product', 'Appointment ', 'Event', 'document ', 'Other'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  });
useEffect(() => {
  const email = localStorage.getItem('email');
  const localDate = new Date().toISOString().split('T')[0]

  const requestData = {
    email,
    localDate
  };

  axios.post('http://localhost:8083/product/ExpiredByMonth', requestData)
    .then(response => {
      const data = response.data;
      const isAllZero = Object.values(data).every(value => value === 0);

      if (isAllZero) {
        // Set a default series (you can adjust this as needed)
        setSeries([10, 10, 10, 10, 10]);
      } else {
        setSeries(Object.values(data));
      }
    })
    .catch(error => {
      console.error("There was an error fetching the data!", error);
    });
}, []);



  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" width={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
