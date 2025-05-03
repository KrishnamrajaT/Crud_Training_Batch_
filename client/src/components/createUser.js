import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const CreateUser = ({ setIsRefesh }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const regUser = () => {
    const URL = "http://localhost:8080/user/register";
    return axios
      .post(URL, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    regUser()
      .then((res) => {
        console.log(res);
        setIsRefesh(true);
        setFormData({
          username: "",
          email: "",
          city: "",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container sx={{ marginTop: "180px" }} maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="username"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateUser;
