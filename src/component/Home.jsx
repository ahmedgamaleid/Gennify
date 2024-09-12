import React, { useState, useContext, useRef } from 'react';
import { FaShippingFast, FaUndo, FaHeadphones } from 'react-icons/fa';
import backgroundImage from "../img/02Flipped.png";
import { TrendingAndCategContext } from '../CONTEXT/trendingandcateg';
import emailjs from '@emailjs/browser';

const Home = (props) => {
  let { categories, brands } = useContext(TrendingAndCategContext);

  const form = useRef();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    emailjs
      .sendForm('service_0bgmxiv', 'template_dkt4cfc', form.current, {
        publicKey: 'BI7T6U9OqzuiHcLOw',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setSending(false);
          form.current.reset();
        },
        (error) => {
          console.error('FAILED...', error.text);
          setSending(false);
          setError('Form submission failed. Please try again.');
        },
      );
  };

  return (
    <div className="hoooome">
      {/* Landing Screen */}
      <div
        className="container landing mb-5 mt-2"
        style={{
          position: "relative",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "50vh",
          borderRadius: '15px',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
            zIndex: 1,
            borderRadius: '15px',
          }}
        >
          <div className="row h-100">
            <div className="col-lg-6 p-5 d-flex flex-column align-items-left" style={{ position: "relative" }}>
              <p className="ggg pt-3 pb-0">
                Welcome 
                <p className="ggg">to Gennify</p>
              </p>
              <p className="text-container">
                <span style={{
                  zIndex: 9999,
                  position: 'relative',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}>
                  slogan Wishes granted, deals delivered!
                </span>
                <div className="star one" style={{ position: "absolute", left: '70%', top: '35%', zIndex: 1 }}></div>
                <div className="star two" style={{ position: "absolute", left: '25%', top: '65%', zIndex: 1 }}></div>
                <div className="star two" style={{ position: "absolute", left: '65%', top: '85%', zIndex: 1 }}></div>
              </p>
            </div>

            <div className="col-lg-6 d-flex justify-content-center align-content-center" style={{ position: "relative" }}>
              <div className="star one" style={{ position: "absolute", left: '10%', top: '15%', zIndex: 1 }}></div>
              <div className="star two" style={{ position: "absolute", left: '55%', top: '65%', zIndex: 1 }}></div>
              <div className="star three" style={{ position: "absolute", left: '90%', top: '34%', zIndex: 1 }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="about">
        <div className="text-center my-5 bg-light">
          <h1 className="gold-underline p-5">Services</h1>
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col text-center">
              <div className="icon-container text-center fs-1">
                <FaShippingFast className="service-icon" />
              </div>
              <h6 className='coo'>Fast Shipping</h6>
            </div>
            <div className="col text-center">
              <div className="icon-container fs-1">
                <FaUndo className="service-icon" />
              </div>
              <h6>Easy Returns</h6>
            </div>
            <div className="col text-center">
              <div className="icon-container fs-1">
                <FaHeadphones className="service-icon" />
              </div>
              <h6>24/7 Customer Support</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Get In Touch Section */}
      <div className="centered-container my-5 bg-light">
        <h1 className="gold-underline p-5">Get In Touch</h1>
      </div>
      <p className="text-center">
        Mauris at tempus mi, ut iaculis dui. Integer laoreet mattis justo nec pretium. Ut nibh elit,
        fermentum vel hendrerit vel, dictum nec velit. Morbi volutpat suscipit
      </p>

      <div className="contactus mt-5 container mb-5">
        <div className="row">
          <div className="col-lg-6 px-4 d-flex flex-column">
            <h4>Get answers and advice from professional consultants.</h4>
            <i className="fa-solid fs-2 mt-4 mb-3 text-warning fa-square-phone"></i>
            <p>+1 (415) 876-3250 / +1 (415) 876-3251</p>
            <hr />
            <i className="fa-regular fs-2 mt-4 mb-3 text-warning fa-envelope"></i>
            <p>eiid.ahmed4444@gmail.com</p>
            <hr />
            <i className="fa-regular fs-2 mt-4 text-warning mb-3 fa-map"></i>
            <p>1650 Lombard Street, San Francisco, CA 94123</p>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6 mx">
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-3">
                <label htmlFor="user_name" className="form-label">Name</label>
                <input type="text" className="form-control" id="user_name" name="user_name" required />
              </div>
              <div className="mb-3 mt-2">
                <label htmlFor="user_email" className="form-label">Email</label>
                <input type="email" className="form-control" id="user_email" name="user_email" required />
              </div>
              <div className="mb-3 mt-2">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-outline-warning ssssssss mt-5 p-2 fs-4 rounded-5" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>



      
    </div>
  );
};

export default Home;
