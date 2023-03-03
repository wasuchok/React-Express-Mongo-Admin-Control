import { useState } from "react"
import { Container, Typography, TextField, Box, Button, CircularProgress } from "@mui/material"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
const Login = () => {

  const navigate = useNavigate()

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState({
        username: '',
        password: '',
      })

      const roleBaseRedirect = (role) => {
        if(role == "admin") {
          navigate('/admin/index')
        } else {
          navigate('/user/index')
        }
      }

    const handleChange = (e) => {
        setValue({...value,[e.target.name]: e.target.value})
      }

      const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        await axios.post(`${import.meta.env.VITE_API}/login`, value)
        .then((response) => {
          setLoading(false)
            console.log(response.data.data.user.username)
            dispatch({
                type : 'LOGIN',
                payload : {
                    token : response.data.token,
                    username : response.data.data.user.username,
                    role : response.data.data.user.role
                }
            })
            localStorage.setItem(import.meta.env.VITE_TOKEN, response.data.token)
            roleBaseRedirect(response.data.data.user.role)
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })


        //   navigate("/")
      }
    return (
        <>
        <Container maxWidth="xl" sx={{ p: 2 }}>
          { loading 
          ?         <Box sx={{ display: 'flex' }}><CircularProgress /></Box>
          :        <Typography variant="h4" gutterBottom>เข้าสู่ระบบ</Typography>
          }


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
          </Box>
          <Button variant="contained" disabled={value.password.length < 6} onClick={handleSubmit}>ยืนยัน</Button>
        </Container>
        </>
    )
}

export default Login