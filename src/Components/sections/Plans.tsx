import Plan from "../widgets/Plan";
import { Box, Typography } from "@mui/material";

function PlanosSection() {
  return (
    <>
      <Typography variant="h3" sx={{ color: "white", textAlign: "center" }}>
        Nossos Cursos
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Plan number="+10 milions" name="users" stats="active" />
        <Plan number="+60 milions" name="dolar's" stats="gain" />
        <Plan number="+60 milions" name="dolar's" stats="gain" />
        <Plan number="+60 milions" name="dolar's" stats="gain" />
      </Box>
    </>
  );
}

export default PlanosSection;
