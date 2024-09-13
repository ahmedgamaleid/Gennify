import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [apiMsg, setMsg] = useState('');
  const [errorDetails, setErrors] = useState([]);
  const navigate = useNavigate();

  function validateUserData() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp(/^[A-Z]/))
        .required()
    });

    const validation = schema.validate(user, { abortEarly: false });
    if (validation.error) {
      setErrors(validation.error.details);
      return false;
    } else {
      setErrors([]);
      return true;
    }
  }

  async function login() {
    if (validateUserData()) {
      try {
        const response = await axios.post('https://movies-api.routemisr.com/signin', user);
        const { data } = response;
        setMsg(data.message);
        if (data.message === 'success') {
          localStorage.setItem('token', data.token);
          props.setIsLogin(true);
          navigate('/home');
        }
      } catch (error) {
        console.error('Login error:', error);
        setMsg('Login failed. Please try again.');
      }
    }
  }

  function showAlert(inputName) {
    const error = errorDetails.find(err => err.path[0] === inputName);
    return error ? <p className='text-danger'>{error.message}</p> : null;
  }

  return (
    <div className='container'>
      <div className='row p-4 d-flex justify-content-center align-content-center'>
      <div className='col-lg-6 full-heightt d-flex justify-content-center align-items-center'>
  <div className='text-center'>
    <h1 className='display-4 my-3'>Welcome to Our Platform</h1>
    <p className='lead mt-5'>Please log in to access your account and explore all features in Gennify Platform.</p>
  </div>
</div>
        <div className='col-md-6  mb-5 full-heightt'>
          <form className='' onSubmit={(e) => { e.preventDefault(); login(); }}>
            <label>Email</label>
            <input
              type='text'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className='form-control'
            />
            {showAlert('email')}
            <label className='py-1'>Password</label>
            <input
              type='password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='form-control w-100 my-3 m-1 p-2'
            />
            {showAlert('password')}
            <button type='submit' className='btn btn-outline-warning ssssssss w-100 mb-5 mt-5 p-2 fs-4 rounded-5'>Login</button>
            {apiMsg && <h1 className='text-danger  p-3  mb-5  text-center '>{apiMsg} try again</h1>}
          </form>
        </div>
        

      </div>
    </div>
  );
  
}

export default Login;
