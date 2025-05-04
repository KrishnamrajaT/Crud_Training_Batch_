import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

import axios from "axios";

const UpdateUser = ({ setIsEdit, updateUserId, setIsRefesh }) => {
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

  const fetchUser = () => {
    let URL = `https://training-batch-crud-server.vercel.app/user/getById/${updateUserId}`;

    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        setFormData({
          name: res.data.username,
          email: res.data.email,
          city: res.data.city,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = () => {
    let URL = `https://training-batch-crud-server.vercel.app/user/update/${updateUserId}`;

    return axios
      .put(URL, formData)
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
    setIsEdit(false);
    updateUser()
      .then((res) => {
        console.log(res);
        setIsRefesh(true);
      })
      .catch((err) => console.log(err));
    console.log(formData);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container sx={{ marginTop: "180px" }} maxWidth="sm">
      <Box display={"flex"} justifyContent={"space-between"}>
        {" "}
        <Typography variant="h4" component="h1" gutterBottom>
          Update User
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="userName"
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
          Update
        </Button>
      </form>
    </Container>
  );
};

export default UpdateUser;
