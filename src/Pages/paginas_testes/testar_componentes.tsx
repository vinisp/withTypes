//import React from "react";

import { Box } from "@mui/material";

import ReactPlayer from "react-player/youtube";

type MyProps = {
  children: JSX.Element;
};

function Player(props: MyProps) {
  return <div>{props.children} </div>;
}

export function TestarComponentes() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F2f2f2f2",
          paddingTop: "80px",
        }}
      >
        <h1>Página para teste de componentes</h1>

        <Player>
          <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </Player>
      </Box>
    </>
  );
}
