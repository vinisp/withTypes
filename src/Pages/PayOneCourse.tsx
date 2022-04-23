import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export function PayOneCourse() {
  let { idCourse } = useParams<any>();
  return (
    <>
      <Box
        sx={{
          paddingTop: 20,
          backgroundColor: "#FFF",
        }}
      >
        <h1>Pay One Course Page</h1>
        <h2>Comprar o Curso {idCourse} </h2>
      </Box>
    </>
  );
}
