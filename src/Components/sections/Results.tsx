import CardCustom from "../widgets/Card";
import { Box } from "@mui/material";

function ResultSection() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          marginTop: "80px",
        }}
      >
        <CardCustom number="+10 milions" name="users" stats="active" />
        <CardCustom number="+60 milions" name="dolar's" stats="gain" />
        <CardCustom number="+60 milions" name="dolar's" stats="gain" />
        <CardCustom number="+60 milions" name="dolar's" stats="gain" />
      </Box>
    </>
  );
}

export default ResultSection;
