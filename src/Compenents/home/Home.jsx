import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import './home.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ApexChart from './ApexChart';
import ApexChart2 from './ApexCharts2';

const Home = () => {
  const [dateState, setDateState] = useState(new Date());
  const [close, setClose] = useState(true);
  const [data, setData] = useState({
    TotalData: 0,
    expiredTotal: 0,
    expiredInMonth: 0,
    expiredPreviousDay: 0,
  });

  const changeDate = (e) => {
    setDateState(e);
  };

  const handleclose = () => {
    setClose(!close);
  };

  useEffect(() => {
    // Assuming your API endpoint is 'api/homebar'
    const email = localStorage.getItem('email');
    const localDate = new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format

 
  
    const requestData = {
      email,
      localDate
    };

    axios.post('http://localhost:8083/product/HomeBar', requestData)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error('There was an error fetching the data!', error);
    });
  }, []);

  return (
    <div className='home'>
      <Box height={60} />
      <div className='home__container container grid'>
        <div className='home__content'>
          {close && (
            <h1 className='home__welcome-title'>
              Welcome Back <i onClick={handleclose} className='uil uil-multiply'></i>
            </h1>
          )}
          <h1 className='home__title'>
           <h1 className='home__title1'>Dashboard </h1> 
            <p className='home__subtitle1'>Your company's expense overview</p>
          </h1>
          <div className='home__box'>
            <div className='home__box-data1'>
              <h2>{data.TotalData}</h2>
              <h3 className='home__subtitle'>Total Expiration Data</h3>
            </div>
            <div className='home__box-data2'>
              <h2>{data.expiredTotal}</h2>
              <h3 className='home__subtitle'>Expired Total</h3>
            </div>
            <div className='home__box-data3'>
              <h2>{data.expiredInMonth}</h2>
              <h3 className='home__subtitle'>Expired In This Month</h3>
            </div>
            <div className='home__box-data4'>
              <h2>{data.expiredPreviousDay}</h2>
              <h3 className='home__subtitle'>Already Expired!</h3>
            </div>
          </div>

          <div className='home__box-data5'>
            <div className='graph1'>
              <h2 className='graph1__title'>Total Expired Items</h2>
              <ApexChart />
            </div>
            <div className='graph2'>
              <h2 className='graph2__title'>Total Expiration by Months</h2>
              <ApexChart2 />
            </div>
          </div>
          <div className='home__data'>
            <hr className='home__line' />
            <h1 className='home__data-title'>Expiration in this Month</h1>
            <div className='calendar-container'>
              <Calendar value={dateState} onChange={changeDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
