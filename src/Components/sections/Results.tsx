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
        <CardCustom number="+10 milions" name="SOLUÇÃO 1" stats="INFORMAÇÕES" />
        <CardCustom number="+60 milions" name="SOLUÇÃO 2" stats="INFORMAÇÕES" />
        <CardCustom number="+60 milions" name="SOLUÇÃO 3" stats="INFORMAÇÕES" />
        <CardCustom number="+60 milions" name="SOLUÇÃO 4" stats="INFORMAÇÕES" />
      </Box>
    </>
  );
}

export default ResultSection;
