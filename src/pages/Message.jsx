import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Mytodo } from "./Mytodo";
import { Completetodo } from "./Completetodo";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../API";

export function Message(props) {
  const token = localStorage.getItem("x-auth-token");

  const [sample, setSample] = useState(false);
  const [id, setId] = useState("One");
  const [input, setInput] = useState("");
  const [mytodo, setMytodo] = useState(true);
  const [complete, setComplete] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const message = data.get("message");
    const email = localStorage.getItem("email");

    const result = {
      email,
      message,
    };

    const result2 = {
      _id: id,
      email,
      message,
    };
    console.log(id)
    setSample((prev) => !prev);
    {
      id === "One" &&
        axios
          .post(`${API}/todo/message`, result,{
            headers:{"x-auth-token":token}
          })
          .then((res) => toast.success(res.data,{
            position:"top-center",
            autoClose:1000
          }));
    }

    {
      id !== "One" &&
        axios
          .post(`${API}/todo/edittodo`, result2,{
            headers:{"x-auth-token":token}
          })
          .then((res) => toast.success(res.data,{
            position:"top-center",
            autoClose:1000
          }));
    }

    setId("One");
  };

  const handletodo = () => {
    setMytodo(!mytodo);
    setComplete(!complete);
  };

  const handleComplete = () => {
    setMytodo(true);
    setComplete(false);
  };
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{ color: "goldenrod", textAlign: "center" }}
        >
          Todo Application
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "lightblue", textAlign: "center", marginTop: "10px" }}
        >
          Plan your day,Plan your tasks,Plan your success
        </Typography>
      </Box>

      <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            gap: "20px",
          }}
        >
         
            <TextField
              name="message"
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Enter your tasks here.."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button sx={{marginLeft:"10px"}}type="submit" variant="contained" color="success">
              Create
            </Button>
         
        </Box>
        </form>
        <Box
          sx={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center", 
            gap: "20px",
          }}
        >
          <Button variant="outlined" color="primary" onClick={() => handleComplete()}>
            Mytodo's
          </Button>

          <Button variant="outlined" color="primary" onClick={() => handletodo()}>
            Completed todo's
          </Button>
        </Box>
        
        <Box>
          {mytodo === true && (
            <Mytodo setInput={setInput} sample={sample} setId={setId} />
          )}
        </Box>
        <Box>{complete === true && <Completetodo />}</Box>
      </Box>
    </>
  );
}
