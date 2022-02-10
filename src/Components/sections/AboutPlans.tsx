import { Box, Typography } from "@mui/material";
import CardAbout from "../widgets/CardAbout";


function AboutPlanosSection() {
  return (
    <>
      <Typography variant="h3" sx={{ color: "white", textAlign: "center", marginTop: 15}}>
        Sobre Nossos Planos
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          gap: 5,
        }}
        
      >

        <CardAbout number="+10 milions" name="users" stats="active"  />
        <CardAbout number="+10 milions" name="users" stats="active"  />
        <CardAbout number="+10 milions" name="users" stats="active"  />
        
      </Box>
    </>
  );
}

export default AboutPlanosSection;
