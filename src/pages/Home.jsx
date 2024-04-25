import { Box } from "@mui/material";
import React from "react";
import { Message } from "./Message";

export function Home(props) {
  return (
    <Box>
      <Box sx={{ width: "100%", height: "729px", display: "flex" }}>
        <Box
          sx={{ width: "25%", height: "100%", backgroundColor: "#ADEFD1FF" }}
        ></Box>
        <Box
          sx={{ width: "50%", height: "100%", backgroundColor: "#00203FFF" }}
        ><Message/></Box>
        <Box
          sx={{ width: "25%", height: "100%", backgroundColor: "#ADEFD1FF" }}
        ></Box>
      </Box>
    </Box>
  );
}
