import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './item.css';
import Img from '../../Assets/a996.png';
import Img2 from '../../Assets/a365.png';
import Img3 from '../../Assets/pikaso_texttoimage_35mm-film-photography-Handdrawn-animated-infograph.jpeg';
import Img4 from '../../Assets/not_available.png';
import Img5 from '../../Assets/types1.png';
import Img6 from '../../Assets/types2.png';
import Img7 from '../../Assets/types3.png';

import Uploader from './Uploader';
import axios from 'axios';

const options = [
  { label: 'All', value: 'all' },
  { label: 'Medicine', value: 'medicine' },
  { label: 'Body Lotion', value: 'body_lotion' },
  { label: 'Duo', value: 'duo' },
  { label: 'Shampoo', value: 'shampoo' },
  { label: 'Facial Cleanser', value: 'facial_cleanser' },
  { label: 'Serum', value: 'serum' },
  { label: 'Sunscreen', value: 'sunscreen' },
  // Add more categories as needed
];

const Item = () => {
  // State variables for New Expiration Reminder
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [category, setCategory] = useState('');
  const [counter, setCounter] = useState(0);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // State variables for New Appointment Reminder
  const [appointmentTitle, setAppointmentTitle] = useState('');
  const [appointmentLocation, setAppointmentLocation] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');

  // State variables for New Event Reminder
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventNotes, setEventNotes] = useState('');

  const email = localStorage.getItem('email');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClick1 = () => {
    setCounter(counter + 1);
  };

  const handelClick2 = () => {
    if (counter > 0) setCounter(counter - 1);
  };

  const handleExpirationSubmit = async () => {
    const newlocalDate = new Date().toISOString().split('T')[0]

    const expirationData = {
      productName,
      email,
      type: category,
      quantity: counter,
      createdDated: newlocalDate,
      localDate: currentDate,
      price: parseInt(price, 10) || 0,
      description: description || 'no description available',
    };

    try {
      const response = await axios.post('http://localhost:8083/product/AddProduct', expirationData);
      setSuccessMessage('Product saved successfully.');
      setErrorMessage('');
      clearForm();
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error: Unable to save product.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleAppointmentSubmit = async () => {
    const appointmentData = {
      title: appointmentTitle,
      scheduleType: 'appointment',
      email,
      expiryDate: currentDate,
      expiryTime: currentTime.trim(), // Remove trailing space
      location: appointmentLocation,
      notes: appointmentNotes || 'no notes available',
    };

    try {
      const response = await axios.post('http://localhost:8083/schedule/addSchedule', appointmentData);
      setSuccessMessage('Appointment saved successfully.');
      setErrorMessage('');
      clearAppointmentForm();
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.log(appointmentData);
      setSuccessMessage('');
      setErrorMessage('Error: Unable to save appointment.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleEventSubmit = async () => {
    const eventData = {
      title: eventTitle,
      scheduleType: 'event',
      email,
      expiryDate: currentDate,
      expiryTime: currentTime.trim(), // Remove trailing space
      location: eventLocation,
      notes: eventNotes || 'no notes available',
    };

    try {
      const response = await axios.post('http://localhost:8083/schedule/addSchedule', eventData);
      setSuccessMessage('Event saved successfully.');
      setErrorMessage('');
      clearEventForm();
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error: Unable to save event.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const clearForm = () => {
    setProductName('');
    setCategory('');
    setCounter(0);
    setCurrentDate('');
    setPrice('');
    setDescription('');
  };

  const clearAppointmentForm = () => {
    setAppointmentTitle('');
    setAppointmentLocation('');
    setAppointmentNotes('');
    setCurrentDate('');
    setCurrentTime('');
  };

  const clearEventForm = () => {
    setEventTitle('');
    setEventLocation('');
    setEventNotes('');
    setCurrentDate('');
    setCurrentTime('');
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = formatTime(now);
    setCurrentDate(date);
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return formattedTime;
  };

  const handleTimeChange = (event) => {
    setCurrentTime(event.target.value);
  };

  const handlDateChange = (event) => {
    setCurrentDate(event.target.value);
  };

  useEffect(() => {
    getCurrentDateTime();
  }, []);

  return (
    <div className='item'>
      <Box height={60} />
      <div className="item__container container grid">
        <div className="item__content">
          <h1 className='item__title'>
            Dashboard <i className='fa fa-angle-double-right' aria-hidden='true'></i>
            <span className='item__subtitle'>Create New Reminder</span>
          </h1>
          <div className="item__content-title">
            <h1 className="item__content-title1">Create New Reminder</h1>
            <h4 className="item__content-title2">Choose the type of reminder you need to create and provide the necessary deltail to stay on track.</h4>
          </div>
          {/* New Expiration Reminder Accordion */}
          <Accordion className='According__item' >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography >New Product Reminder
                <p className='Typography-subtitle'>Get notified before your items expire to ensure timely usage or replacement</p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="accordion-content">
                  <div className="image-container">
                    <img src={Img3} alt="reminder" className='img img3' />
                  </div>
                  <div className="epiration__data form-container">
                    <h2 className="appointment__title">
                      Expiration Product Data
                    </h2>
                    <div className="expiration__form-container">
                      <div className="expiration__form">
                        <label className="appointment__notes">Product Name</label>
                        <input
                          name='title'
                          type='text'
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder='Enter Name'
                          className='apppintment-input '
                          required
                        />
                      </div>
                      <div className=" expiration__form reminder__select">
                        <div className="reminder__selected-inside">
                          <label className="appointment__notes">Select Category</label>
                          <select
                            name='category'
                            value={category}
                            onChange={handleCategoryChange}
                            className='apppintment-input'
                          >
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="expiration__counter">
                          <label className="appointment__notes ">Counter</label>
                          <div className="counter__content">
                            <i className="uil uil-plus" onClick={handleClick1}></i>
                            {counter}
                            <i className="uil uil-minus" onClick={handelClick2}></i>
                          </div>
                        </div>
                      </div>
                      <div className="expiration__form reminder__select">
                        <div className="expiration__dates">
                          <label className="appointment__notes">Expiry Date</label>
                          <input
                            id='date'
                            name='expiryDate'
                            type='date'
                            onChange={handlDateChange}
                            className='apppintment-input'
                            required
                          />
                        </div>
                        <div className="expiration__price">
                          <label className="appointment__notes">Price</label>
                          <input
                            name='price'
                            type='number'
                            placeholder='Enter Price'
                            className='apppintment-input'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="expiration__form expiration__upload-img">
                        {/* for image block */}
                        <Uploader />
                      </div>
                      <div className="expiration__form">
                        <div className="appointment__form-area">
                          <label className="appointment__notes">Description</label>
                          <textarea
                            rows={12}
                            cols={16}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write Anything"
                            className='apppintment-input'
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleExpirationSubmit}
                        className="button event-button button--flex"> Save <i className="uil uil-plus-circle"></i></button>
                      {successMessage && (<div className="Expiartion__successMessage"><p>Product Save SuccessFully 😎</p></div>)}
                      {errorMessage && (<div className="Expiartion__errorMessage"><p>Add correct data 😤</p></div>)}
                    </div>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
                    {/* New Event Reminder Accordion */}
          <Accordion 
           className='According__item'
        >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{
                fontSize: (theme) => theme.palette.grey[200],
                '.Mui-expanded &': {
                  fontSize: '60px',
                  backgroundColor: '#ebf1f6',
                  marginLeft: '30px' // changes color when expanded
                },
              }}
            >
              <Typography>New Event Reminder
              <p className='Typography-subtitle'>Keep track of upcoming events and their details</p>

              </Typography>

            </AccordionSummary>
            <AccordionDetails sx={{
              backgroundColor: 'white', // background color for the content area
            }}>
              <Typography>
                <div className="accordion-content">
                  <div className="image-container">
                    <img src={Img2} alt="pic" className='img' />
                  </div>
                  <div className="event__data form-container">
                    <h2 className="appointment__title">
                      Event Data
                    </h2>
                    <input
                      name='title'
                      type='text'
                      placeholder='Enter Title'
                      className='apppintment-input'
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      required
                    />
                    <div className="appointment__remidner">
                      <input
                        id='date'
                        name='Date'
                        type='date'
                        onChange={handlDateChange}
                        className='apppintment-input'
                        value={currentDate}
                        required
                      />
                      <input
                        id='time'
                        name='Time'
                        type='text'
                        onChange={handleTimeChange}
                        className='apppintment-input'
                        value={currentTime}
                        required
                      />
                    </div>
                    <input
                      name='Location'
                      type='text'
                      placeholder='Location'
                      className='apppintment-input'
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                    />
                    <div className="appointment__form-area">
                      <label className="appointment__notes">Notes</label>
                      <textarea
                        rows={12}
                        cols={16}
                        placeholder="Write Anything"
                        className='apppintment-input'
                        value={eventNotes}
                        onChange={(e) => setEventNotes(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleEventSubmit}
                      className="button event-button button--flex"> Save <i className="uil uil-plus-circle"></i></button>
                    {successMessage && (<div className="Expiartion__successMessage"><p>Event Save SuccessFully 😎</p></div>)}
                    {errorMessage && (<div className="Expiartion__errorMessage"><p>Add correct data 😤</p></div>)}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
                    {/* New Appointment Reminder Accordion */}
          <Accordion     className='According__item'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{
                fontSize: (theme) => theme.palette.grey[200],
                '.Mui-expanded &': {
                  fontSize: '60px',
                  backgroundColor: '#ebf1f6',
                  marginLeft: '30px' // changes color when expanded
                },
              }}
            >
              <Typography>New Appointment Reminder
              <p className='Typography-subtitle'>Never miss and appointment with timely reminders</p>

              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
              backgroundColor: 'white', // background color for the content area
            }}>
              <Typography>
                <div className="accordion-content">
                  <div className="image-container">
                    <img src={Img} alt="pic" className='img' />
                  </div>
                  <div className="appointment-data form-container">
                    <h2 className="appointment__title">
                      Appointment Data
                    </h2>
                    <input
                      name='title'
                      type='text'
                      placeholder='Enter Title'
                      className='apppintment-input'
                      value={appointmentTitle}
                      onChange={(e) => setAppointmentTitle(e.target.value)}
                      required
                    />
                    <div className="appointment__remidner">
                      <input
                        id='date'
                        name='Date'
                        type='date'
                        onChange={handlDateChange}
                        className='apppintment-input'
                        value={currentDate}
                        required
                      />
                      <input
                        id='time'
                        name='Time'
                        type='text'
                        onChange={handleTimeChange}
                        className='apppintment-input'
                        value={currentTime}
                        required
                      />
                    </div>
                    <input
                      name='Location'
                      type='text'
                      placeholder='Location'
                      className='apppintment-input'
                      value={appointmentLocation}
                      onChange={(e) => setAppointmentLocation(e.target.value)}
                    />
                    <div className="appointment__form-area">
                      <label className="appointment__notes">Notes</label>
                      <textarea
                        rows={12}
                        cols={16}
                        placeholder="Write Anything"
                        className='apppintment-input'
                        value={appointmentNotes}
                        onChange={(e) => setAppointmentNotes(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleAppointmentSubmit}
                      className="button button--flex"> Save <i className="uil uil-plus-circle"></i></button>
                    {successMessage && (<div className="Expiartion__successMessage"><p>Appointment Save SuccessFully 😎</p></div>)}
                    {errorMessage && (<div className="Expiartion__errorMessage"><p>Add correct data 😤</p></div>)}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
                              {/* New Docement Reminder Accordion */}

          <Accordion   className='According__item'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{
                fontSize: (theme) => theme.palette.grey[200],
                '.Mui-expanded &': {
                  fontSize: '60px',
                  backgroundColor: '#ebf1f6',
                  marginLeft: '30px' // changes color when expanded
                },
              }}
            >
              <Typography>New Document Reminder
              <p className='Typography-subtitle'>Set reminders for expiring documents or subscriptions</p>

              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
              backgroundColor: 'white', // background color for the content area
            }}>
              <Typography>
                <div className="document__reminder">
                  <img src={Img4} alt=""className="document__reminder-Img" />
                  <h1 className='document__reminder-titl'e>Oops!!</h1>
                  <h4 className='document__reminder-subtitle'>Coming soon! Document reminder service is on the horizon.<br/>
                     We'll notify you once it's available in your area.
                  </h4>
                  <button className='button button--flex document__reminder-button'>Go Home</button>
                </div>
               
              </Typography>
            </AccordionDetails>
          </Accordion>

          <div className="item__content-reminderTypes">
            <h2 className='reminderTypes__title'>Reminder suggestion</h2>
            <div className="item__content-typesData">
            <div className="item__content-typesvalues1">
              <img src={Img5} alt="" className='reminderTypes-img' />
              <h3  className='reminderTypes-title'>Document Expiry</h3>
              <p  className='reminderTypes-subtitle'>Set up reminders for important document expiry dates.</p>


            </div>
            <div className="item__content-typesvalues2">
            <img src={Img6} alt=""  className='reminderTypes-img'/>
              <h3 className='reminderTypes-title'>Birthday Event</h3>
              <p className='reminderTypes-subtitle'>Remender friends' and family birthday with ease</p>

              
            </div>
            <div className="item__content-typesvalues3">
            <img src={Img7} alt="" className='reminderTypes-img' />
              <h3 className='reminderTypes-title'>Medical Checkup</h3>
              <p className='reminderTypes-subtitle'>Schedule and manage health checkup appointment</p>

            </div>
            </div>
          </div>
          <div className="explore__more-link">
          <i className='fa fa-angle-double-right expoloricon' aria-hidden='true'></i>
            <h2> Explore More </h2>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Item;
