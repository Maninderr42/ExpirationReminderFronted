import React, { useState } from 'react';
import './login.css';
import Img from '../../Assets/login2-removebg.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImg from '../../Assets/freepik_Login.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(event.target.value);
    setIsEmailValid(emailRegex.test(event.target.value));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    // try {
    //   const response = await axios.post("http://localhost:8081/auth/login", data);
    //   if (response.data.token) {
    //     const token=localStorage.setItem('token', response.data.token);
    //     localStorage.setItem('email', response.data.email); 
    //     console.log(email);
        navigate('/home');
    //   } else {
    //     alert('Login failed!');
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    //   alert('An error occurred during login.');
    // }
  };

  return (
    <section className="login section" id="/login">
      <div className="login__container container grid">
        <div className="login__content">
          <img src={Img} alt="Picture" className="loginImg" />
        </div>
        <div className="login__content">
          <div className="login__content-box">
            <h2 className="login__title">Log In</h2>
            <span className="register__subtitle">New to Creative Ease? <Link to="/register">Sign up for free</Link></span>
            <form className="login__form" onSubmit={handleSubmit}>
              <label className="login__form-tag">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter the Email"
                className={`login__input-data ${!isEmailValid ? 'invalid' : ''}`}
                value={email}
                onChange={handleEmailChange}
                required  
              />
              {!isEmailValid && <span className="error-message">Enter a valid email 😢</span>}

              <label className="login__form-tag">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter the Password' 
                  className='login__input-data'
                  required
                />
                <div className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              <a href="#/" className='login__forget-title'>Forget Password</a>
              <div className="button__container">
                <button type="submit" className="button button--flex">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;
