import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { API } from "../API";

export function Completetodo(props) {
  const [completed, setCompleted] = useState([]);
  const [deleted,setDeleted] = useState(false)
  const result = localStorage.getItem("email")
  const token = localStorage.getItem("x-auth-token")
  const data = {
    email:result
  }

  useEffect(() => {
    

    axios
      .post(`${API}/todo/gettodocompleted`,data,{
        headers:{"x-auth-token":token}
      })
      .then((res) => setCompleted(res.data));
  }, [deleted]);
  const handleDelete = (val) => {
    const res = {
      id: val._id,
    };
    axios
      .post(`${API}/todo/delete`, res,{
        headers:{"x-auth-token":token}
      })
      .then((res) => toast.success(res.data,{
        position:"top-center",
        autoClose:1000
      }));
    setDeleted(prev => !prev)
  };
  return (
    <>
      <Box sx={{ marginTop: "20px", width: "10px" }}>
        {completed.map((val) => {
          return (
            <Box
              sx={{
                width: "450px",
                border: "1px solid white",
                marginLeft: "110px",
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center"
              }}
            >
              <Box sx={{width:"400px",marginLeft:"10px",color:"gold"}}>
                <Typography variant="h5">{val.message}</Typography>
              </Box>
              <Box>
                <Button onClick={() => handleDelete(val)}>
                  <DeleteIcon />
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
