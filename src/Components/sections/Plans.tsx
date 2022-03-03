import Plan from "../widgets/Plan";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainBox = styled("div")(({ theme }) => ({
  background: "#1e1e1e",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

function PlanosSection() {
  return (
    <>
      <MainBox>
        <Typography variant="h3" sx={{ color: "white", textAlign: "center" }}>
          Nossos Planos
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Plan
            courseName="Básico"
            price="R$ 199,00"
            featurePri="Primeiro Recurso"
            featureSec="Segundo Recurso"
            featureTh="Terceiro Recurso"
          />
          <Plan
            courseName="Profissional"
            price="R$ 220,00"
            featurePri="Primeiro Recurso"
            featureSec="Segundo Recurso"
            featureTh="Terceiro Recurso"
          />
          <Plan
            courseName="Avançado"
            price="R$ 399,00"
            featurePri="Primeiro Recurso"
            featureSec="Segundo Recurso"
            featureTh="Terceiro Recurso"
          />
        </Box>
      </MainBox>
    </>
  );
}

export default PlanosSection;
