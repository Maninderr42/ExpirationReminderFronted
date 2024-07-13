import Box from '@mui/material/Box';
import './profils.css';
import { MdOutlineModeEdit } from "react-icons/md";
import Img from '../../Assets/man.png';
import { FaCog } from 'react-icons/fa';

import { useState,useEffect } from 'react';
import axios from 'axios';

const Profils = () => {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    email: email,
    firstName: 'Jack',
    lastName: 'Doe',
    bio: 'Software developer',
    country: "America",
    state: "",
    streetAddress: "",
    businessName: "",
    businessAddress: "",
    businessType: ""
  });


  const handleEditPersonalInfo = () => {
    setLoading(true);

    axios.put('http://localhost:8081/auth/userNameUpdate', personalInfo,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Personal info updated:', response.data);
        setLoading(false);

      })
      .catch(error => {
        console.error('Error updating personal info:', error);
        setLoading(false);

      });
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const response = await axios.get(`http://localhost:8081/auth/getUser/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setPersonalInfo(response.data); 
        setLoading(false);

       
        
      } catch (error) {
        console.error("Something went wrong: ", error);
        setLoading(false);

      }
    })();
  }, [email, token]);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'personalInfo') {
      setPersonalInfo(prevState => ({ ...prevState, [name]: value }));
    } 
  };

  return (
    <div className='profile'>
      <Box height={40} /> 

      <div className="profils__container container grid">
        <div className="profile__title">
          <h2>My Profile</h2>
        </div>
        <div className="profile__content">
          <div className="profile__left">
            <div className="profil_pic-block">
              <img src={Img} alt="Profile-pic" className='Img_Pic' />
              <div className="personal-info">
                <h2 className='profile__name'>Jack Adams</h2>
                <p className='profile__email'>jackadams@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="profile__right">
            <div className="profile__content-data top">
              <div className='title__edit'>
                <h3 className='title__edit'>Personal Information</h3>
                <button className='edit__button' onClick={handleEditPersonalInfo}>
                  {loading ? <FaCog className="fa-spin" /> : <MdOutlineModeEdit />}Edit
                </button>              </div>
              <label>First Name</label>
              <input type="text" className='input__profile' name="firstName" value={personalInfo.firstName} onChange={(e) => handleChange(e, 'personalInfo')} required />
              <label>Last Name</label>
              <input type="text" className='input__profile' name='lastName' value={personalInfo.lastName} onChange={(e) => handleChange(e, 'personalInfo')} required />
              <label>Email</label>
              <input type="text" className='input__profile nochange__input' name='email'  value={personalInfo.email} disabled />
              <label>Phone</label>
              <input type="text" className='input__profile nochange__input' name='phone'  value={personalInfo.phoneNo}  disabled />
              <label>Bio</label>
              <input type="text" className='input__profile bio-input' name="bio" value={personalInfo.bio} onChange={(e) => handleChange(e, 'personalInfo')} required />
            </div>

            <div className="profile__content-data">
              <div className='title__edit'>
                <h3 className='title__edit'>Address</h3>
                <button className='edit__button' onClick={handleEditPersonalInfo}>
                  {loading ? <FaCog className="fa-spin" /> : <MdOutlineModeEdit />}Edit
                </button>               </div>
              <label>Country</label>
              <input type="text" className='input__profile' name="country" value={personalInfo.country} onChange={(e) => handleChange(e, 'personalInfo')} />
              <label>City/State</label>
              <input type="text" className='input__profile' name="state" value={personalInfo.state} onChange={(e) => handleChange(e, 'personalInfo')} />
              <label>Street Address</label>
              <input type="text" className='input__profile' name="streetAddress" value={personalInfo.streetAddress} onChange={(e) => handleChange(e, 'personalInfo')} />
            </div>

            <div className="profile__content-data">
              <div className='title__edit'>
                <h3 className='title__edit'>Business Detail</h3>
                <button className='edit__button' onClick={handleEditPersonalInfo}>
                  {loading ? <FaCog className="fa-spin" /> : <MdOutlineModeEdit />}Edit
                </button>               </div>
              <label>Business Name</label>
              <input type="text" className='input__profile' name="businessName" value={personalInfo.businessName} onChange={(e) => handleChange(e, 'personalInfo')} />
              <label>Business Address</label>
              <input type="text" className='input__profile' name="businessAddress" value={personalInfo.businessAddress} onChange={(e) => handleChange(e, 'personalInfo')} />
              <label>Business Type</label>
              <input type="text" className='input__profile' name="businessType" value={personalInfo.businessType} onChange={(e) => handleChange(e, 'personalInfo')} />
            </div>
          </div>
        </div>

        <div className="profile__delete">
          <div className="delete__block">
            <h3 className='delete__title'>Delete Account</h3>
            <p className='delete__warning'>Warning: This action is irreversible. Deleting your account will remove all your data permanently.</p>
          </div>
          <button className='delete__button'>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default Profils;
