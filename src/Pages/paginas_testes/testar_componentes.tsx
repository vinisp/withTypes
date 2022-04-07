import { Box } from "@mui/material";
import ReactPlayer from "react-player/lazy";

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
        <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
      </Box>
    </>
  );
}
