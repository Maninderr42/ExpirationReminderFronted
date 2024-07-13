import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ApexChart1 = () => {
    const [chartData, setChartData] = useState([]);
    const seriesNames = ['Pending Expiry', 'Total Product', 'Expire'];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = localStorage.getItem('email');
                const currentDate = new Date();
                const year = currentDate.getFullYear();

                const response = await axios.post('http://localhost:8083/product/getGraphCretedDate', {
                    email,
                    year
                });

                // Format chart data
                const formattedData = response.data.map((item, index) => ({
                    name:seriesNames[index], 
                    data: Object.values(item)
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    };

    return (
        <ReactApexChart options={options} series={chartData} type="bar" width={500} height={300} />
    );
};

export default ApexChart1;
