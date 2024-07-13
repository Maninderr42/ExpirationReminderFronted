import React, { useEffect, useState } from 'react';
import Img from '../../Assets/login2-removebg.png';
import './register.css';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import loginImg from '../../Assets/freepik_Login.png'



const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password ,setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid]=useState(true);
  const [phoneNo ,setPhoneNo] = useState('');
  const [isPhoneNoValid, setIsPhoneNoValid]=useState(true);
  const [password2, setConfrimPassword]=useState('');
  const [isComfirmPasswordSame, setIsConfirmPasswordSame]=useState(true);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setshowConfirmPassword] =useState(false);



  const handlePhoneChange = (event) => {
    const phoneRegex = new RegExp('^\\(?(\\+\\d{1,2})?\\s?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$');
    const newPhoneNo = event.target.value;
    setPhoneNo(newPhoneNo);
    setIsPhoneNoValid(phoneRegex.test(newPhoneNo));
  }

  const handleEmailChange = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailValid(emailRegex.test(newEmail));
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleConfirmPassword = (event) => {
    const newConfrimPassword = event.target.value;
    setConfrimPassword(newConfrimPassword);
    setIsConfirmPasswordSame(newConfrimPassword === password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit =async(e)=>{
    e.preventDefault();

    const email = e.target.email.value;
    const password =e.target.password.value;
    const phoneNo = e.target.phoneNo.value;


    const data = {
      email,
      password,
      phoneNo,
    };

    // try{
    //   const response=await axios({
    //     url: "http://localhost:8081/auth/sign-up",
    //     method: "POST",
    //     data: data,
    //   }
    //   );
    //   console.log(response.data);

    //   if(response.data.authStatus==="USER_CREATED_SUCCESSFULLY"){
    //     localStorage.setItem('token', response.data.token); 
    //     localStorage.setItem('email', response.data.email); 
    //     console.log(email);
        navigate("/home");
    //   }

    // }catch(err){
    //   console.error("Error occurred:", err);
    //   alert("An error occurred while registering. Please try again.");
    // }

  
  }

  return (
    <section className="register section" id="/register">
      <div className="register__container container grid">
        <div className="register__content">
          <img src={Img} className="registerImg" alt="Picture" />
        </div>
        <div className="register__content">
          <div className="register__content-box">
            <h2 className="register__title">Get Started</h2>
            <span className="register__subtitle">
              Already Have an account? <Link to="/login">Sign in</Link>
            </span>
            <form className="register__form" onSubmit={handleSubmit}>



              <label className="register__form-tag">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter the Email"
                className={`register__input-data ${!isEmailValid ? 'invalid' : ''}`}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {!isEmailValid && <span className="error-message">Enter a valid email 😢</span>}



              <label className="register__form-tag">Phone No.</label>
              <input
                type="number"
                name="phoneNo"
                value={phoneNo}
                onChange={handlePhoneChange}
                placeholder="Enter the Phone no"
                className={`register__input-data ${!isPhoneNoValid ? 'invalid' : ''}`}
                required
              />
              {!isPhoneNoValid && <span className="error-message">Enter a valid Phone Number 😫</span>}



              <label className="register__form-tag">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  name="password"
                  onChange={handlePasswordChange}
                  placeholder="Enter the Password"
                  className={`register__input-data ${!isPasswordValid ? 'invalid' : ''}`}
                  required
                />
                <div className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ?  <FaEye /> :<FaEyeSlash /> }
                </div>
              </div>
              {!isPasswordValid && (
                <span className="error-message">
                  Password must contain:
                  <br />
                  - At least one alphabetic character (uppercase or lowercase).
                  <br />
                  - At least one special symbol (anything except alphabetic or numeric characters).
                  <br />
                  - At least one numeric digit 😢
                </span>
              )}


              
              <label className="register__form-tag">Confirm Password</label>
              <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text': 'password'}
                name="password2"
                onChange={handleConfirmPassword}
                value={password2}
                placeholder="Enter the Confirm Password"
                className={`register__input-data ${isComfirmPasswordSame ? 'invalid' : ''}`}
                required
              />
              <div className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ?  <FaEye /> :<FaEyeSlash /> }
              </div>
              </div>
              {!isComfirmPasswordSame && <span className="error-message">Password do not match 😫</span>}

              
              <div className="button__container">
                <button 
                type='submit'
                className="button button--flex">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
