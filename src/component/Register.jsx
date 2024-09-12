import axios from "axios";
import React, { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  const [apimsg, setMsg] = useState("");
  const [errordetails, setErrors] = useState([]);
  const navigate = useNavigate();

  const validateUserData = () => {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(15).max(50).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp(/^[A-Z]/)).required(),
    });

    const { error } = schema.validate(user, { abortEarly: false });
    if (error) {
      setErrors(error.details);
      return false;
    }
    setErrors([]);
    return true;
  };

  const register = async () => {
    if (validateUserData()) {
      try {
        const { data } = await axios.post(
          "https://movies-api.routemisr.com/signup",
          user
        );
        setMsg(data.message);
        if (data.message === "success") {
          navigate("/login");
        }
      } catch (err) {
        setMsg("Registration failed");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const showAlert = (inputName) => {
    const error = errordetails.find((err) => err.path[0] === inputName);
    return error ? <p className="text-danger">{error.message}</p> : null;
  };

  return (
    <div className="container">
      <div className="row p-4">
        <div className="col-md-6">
         
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
          >
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleInputChange}
              className="form-control"
            />
            {showAlert("first_name")}
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleInputChange}
              className="form-control"
            />
            {showAlert("last_name")}
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={user.age}
              onChange={handleInputChange}
              className="form-control"
            />
            {showAlert("age")}
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="form-control"
            />
            {showAlert("email")}
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="form-control"
            />
            {showAlert("password")}
            <button
              type="submit"
              className="btn btn-outline-warning w-100 mt-5 p-2 fs-4 rounded-5"
            >
              Register
            </button>
            {apimsg && <h1 className="bg-danger">{apimsg}</h1>}
          </form>
        </div>
        <div className="col-md-6">
  <div className="d-flex flex-column justify-content-center align-items-center h-100">
    <h2 className="mb-4">What Happens Next?</h2>
    <ol className="list-unstyled">
      <li className="mb-2">
        <i className="fa fa-hourglass-start me-2 text-warning"></i> Confirm Your Email Address
      </li>
      <li className="mb-2">
        <i className="fa fa-cogs me-2 text-warning"></i> Complete Your Profile Setup
      </li>
      <li className="mb-2">
        <i className="fa fa-star me-2 text-warning"></i> Start Enjoying Customized Features
      </li>
    </ol>
    <p className="text-center mt-4">
      Ready to get started? 
    </p>
  </div>
</div>




      </div>
    </div>
  );
  
};

export default Register;
