import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";
import { API } from "../API";

export function Login(props) {
  const [email,setEmail] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password")
    setEmail(email)
    const result = {
      email,
      password
    }
   axios.post(`${API}/user/login`,result)
   .then((res)=> {
    res.data.message === "Login Success" ? toast.success("Login Successfull",{
      position:"top-center",
      autoClose:1000
    }) && navigate("/home")  : toast.error(res.data.message,{
      position:"top-center",
      autoClose:1000
    })
    localStorage.setItem("x-auth-token",res.data.token)
     })
     
  };
  localStorage.setItem("email",email)
  return (
    <Box>
      <Box sx={{textAlign:"center"}}>
        <Typography variant="h5" sx={{color:"goldenrod"}}>Todo Application</Typography>
        <Typography variant="h6" >Reminder App</Typography>
       
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" ,marginTop:"20px",justifyContent:"center"}}>
        <Button
          onClick={() => navigate("/login")}
          sx={{ textDecoration: "underline" }}
        >
          Login
        </Button>
        <Button onClick={() => navigate("/")}>Sign Up</Button>
      </Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginTop: "20px",
            justifyContent:"center"
          }}
        >
          <Typography>Email :</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            name="email"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginTop: "10px",
            justifyContent:"center"
          }}
        >
          <Typography>Password :</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            name="password"
          />
        </Box>
        <Box sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
