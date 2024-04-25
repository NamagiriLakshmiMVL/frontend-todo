import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function Completetodo(props) {
  const [completed, setCompleted] = useState([]);
  const [deleted,setDeleted] = useState(false)
  const result = localStorage.getItem("email")
  const data = {
    email:result
  }

  useEffect(() => {
   
    axios
      .post("http://localhost:2000/todo/gettodocompleted",data)
      .then((res) => setCompleted(res.data));
  }, [deleted]);
  const handleDelete = (val) => {
    const res = {
      id: val._id,
    };
    axios
      .post("http://localhost:2000/todo/delete", res)
      .then((res) => alert(res.data));
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
              }}
            >
              <Box>
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
