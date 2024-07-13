import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ApexChart1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8083/product/yearExpired', {
          params: {
            email,
            year
          }
        });

        const responseData = response.data;
        const transformedData = Object.keys(responseData).map(month => responseData[month] === 0 ? 0.1 : responseData[month]);

        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    series: [{
      name: 'Expired Items',
      data: data
    }],
    chart: {
      height: 1000,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }
    },
    title: {
      text: 'Total Expired Items',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  return (
    <ReactApexChart options={options} series={options.series} type="bar" width={600} height={350} />
  );
};

export default ApexChart1;
