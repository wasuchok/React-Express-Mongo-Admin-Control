import React, { useState } from 'react';
import { register } from "../../function/auth"
import { Container, Typography, TextField, Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  const [value, setValue] = useState({
    username: '',
    password: '',
    confirm_password: ''
  })

  const handleChange = (e) => {
    console.log(e.target.value)
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(value)
    if (value.password !== value.confirm_password) {
      alert('Password not match')
    } else {
      register(value)
      navigate("/")
    }
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          สมัครสมาชิก
        </Typography>
        <Box
          sx={{
            width: 600,
            maxWidth: '100%',
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Username"
            margin="dense"
            name="username"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="outlined-required"
            label="Password"
            margin="dense"
            name="password"
            type="password"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            margin="dense"
            name="confirm_password"
            type="password"
            onChange={handleChange}
            fullWidth
          />

          <Button variant="contained" disabled={value.password.length < 6} onClick={handleSubmit}>ยืนยัน</Button>
        </Box>
      </Container>
    </>
  )
}

export default Register