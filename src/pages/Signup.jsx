import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../API";

export function Signup(props) {
  const [email,setEmail] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
      e.preventDefault()
      const data = new FormData(e.target)
     
      const name = data.get("name")
      const mobile = data.get("mobile")
      const email = data.get("email")
      const password = data.get("password")
      setEmail(email)
      const result = {
        name,
        mobile,
        email,
        password
      }
console.log(result)
      axios.post(`${API}/user/signup`,result)
      .then((res)=>{
        res.data.message === "User Created Successfully" ? toast.success(res.data.message,{
          position:"top-center",
          autoClose:1000
        })&&navigate("/home") : toast.error(res.data.message,{
          position:"top-center",
          autoClose:1000
        })
        localStorage.setItem("x-auth-token",res.data.token)
      })
    
    }
     localStorage.setItem("email",email)
  return (
    <Box>
      <Box sx={{textAlign:"center"}}>
        <Typography variant="h5" sx={{color:"goldenrod"}}>Todo Application</Typography>
        <Typography variant="h6" >Reminder App</Typography>
      </Box>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"}}> 
       
        <Button onClick={()=>navigate("/login")} >Login</Button>
        <Button sx={{textDecoration:"underline"}} onClick={()=>navigate("/")}>Signup</Button>
      </Box>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <Box sx={{ marginTop:"20px" ,display: "flex", justifyContent:"center",alignItems: "center", gap: "15px" ,rowGap:"10px"}}>
        <Typography>Name :</Typography>
        <TextField id="outlined-basic" variant="outlined" size="small" name="name"/>
      </Box>

      <Box sx={{ display: "flex", justifyContent:"center", alignItems: "center", gap: "15px" ,marginTop:"10px"}}>
        <Typography>Mobile :</Typography>
        <TextField id="outlined-basic" variant="outlined" size="small" name="mobile" />
      </Box>

      <Box sx={{ display: "flex", justifyContent:"center", alignItems: "center", gap: "15px",marginTop:"10px" }}>
        <Typography>Email :</Typography>
        <TextField id="outlined-basic" variant="outlined" size="small" name="email"/>
      </Box>

      <Box sx={{ display: "flex", justifyContent:"center", alignItems: "center", gap: "15px",marginTop:"10px" }}>
        <Typography>Password :</Typography>
        <TextField id="outlined-basic" variant="outlined" size="small" name="password" />
      </Box>
      <Box sx={{display:"flex",justifyContent:"center",marginTop:"15px"}}>
      <Button type="submit" variant="contained">Submit</Button>
      </Box>
      </form>
    </Box>
  );
}
