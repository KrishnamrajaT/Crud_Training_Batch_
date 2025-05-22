import { useState } from "react";
import axios from "axios";
import "./createUser.css";

const CreateUser = ({isRefresh, setIsRefresh}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.city) {
      newErrors.city = "Please select a city";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createUser = () => {
    let URL = "https://training-batch-crud-server.vercel.app/user/register";
    axios
      .post(URL, formData)
      .then((res) =>{
        console.log(res.data);
        setIsRefresh(!isRefresh)
      }) 
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      createUser();
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      city: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="form-success-container">
        <div className="form-success-card">
          <h2>Thank You!</h2>
          <p>Your information has been submitted successfully.</p>
          <button onClick={resetForm} className="form-submit-button">
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Create User</h1>

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? "input-error" : ""}`}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "input-error" : ""}`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`form-input form-select ${
              errors.city ? "input-error" : ""
            }`}
          >
            <option value="">Select your city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <button type="submit" className="form-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
