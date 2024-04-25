import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Mytodo } from "./Mytodo";
import { Completetodo } from "./Completetodo";
import axios from "axios";

export function Message(props) {
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
          .post("http://localhost:2000/todo/message", result)
          .then((res) => alert(res.data));
    }

    {
      id !== "One" &&
        axios
          .post("http://localhost:2000/todo/edittodo", result2)
          .then((res) => alert(res.data));
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
          Plan your day,Plan your tasks,Plan your Success
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            gap: "20px",
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              name="message"
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Enter your tasks here.."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" variant="contained" color="success">
              Create
            </Button>
          </form>
        </Box>
        <Box
          sx={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Button color="inherit" onClick={() => handleComplete()}>
            Mytodo's
          </Button>

          <Button color="inherit" onClick={() => handletodo()}>
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
