import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

export function Mytodo({ setInput, sample, setId }) {
  const [todolist, setTodoList] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [comp, setComp] = useState(false);
  const result = localStorage.getItem("email")
  const data = {
    email:result
  }
  useEffect(() => {
    axios
    .post("http://localhost:2000/todo/gettodo",data)
    .then((res) => setTodoList(res.data));
   }, [sample, deleted, comp]); 

  const handleDelete = async(val) => {
    const res = {
      id: val._id,
    };
   await axios
      .post("http://localhost:2000/todo/deleted", res)
      .then((res) => alert(res.data));
    setDeleted((prev) => !prev);
  };

  const handleEdit = (val) => {
    setInput(val.message);
    setId(val._id);
  };
  const handleCompleted =async (val) => {
    setComp(prev => !prev);
    await axios
      .post("http://localhost:2000/todo/complete", val)
      .then((res) => alert(res.data));
  };
  return (
    <Box>
      {/* <pre>{JSON.stringify(todolist,2,null)}</pre> */}
      <Box sx={{ marginTop: "20px" }}>
        <Box sx={{ marginTop: "20px", width: "10px" }}>
          {todolist.map((val) => (
          
              <Box
                sx={{
                  width: "450px",
                  border: "1px solid white",
                  marginLeft: "110px",
                  display: "flex",
                  justifyContent: "space-between",
                  height:"50px",
                  marginTop:"10px",
                  alignItems:"center"
                }}
              >
                <Box>
                  <Typography sx={{ width: "250px",marginLeft:"5px",color:"gold" }} variant="h5">
                    {val.message}
                  </Typography>
                </Box>
                <Box>
                 <Button  onClick={() => handleCompleted(val)}>
                    <CheckCircleOutlineIcon />
                  </Button> 
                   <Button variant="inherit" onClick={() => handleEdit(val)}>
                    <ModeEditIcon />
                  </Button>
                  <Button onClick={() => handleDelete(val)}>
                    <DeleteIcon />
                  </Button> 
                 
                </Box>
              </Box>
           
          ))}
        </Box>
      </Box> 
    </Box>
  );
}
