import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

import { Typography, Box, Button } from "@mui/material";

import { Link } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    subtitle1: {
      /* border: "solid 2px white", */

      "@media (max-width:600px)": {
        padding: "0 2px",
        fontSize: 14,
      },
      "@media (min-width:600px)": {
        padding: "0 5px",
        fontSize: 16,
      },
      "@media (min-width:900px)": {
        padding: "0 10px",
        fontSize: 16,
      },
      "@media (min-width:1200px)": {
        padding: "0 35px",
        fontSize: 18,
      },
      "@media (min-width:1536px)": {
        padding: "0 105px",
        fontSize: 18,
      },
    },
    h1: {
      fontWeight: 600,

      "@media (max-width:600px)": {
        fontSize: 32,
      },
      "@media (min-width:600px)": {
        fontSize: 36,
      },
      "@media (min-width:900px)": {
        fontSize: 32,
      },
      "@media (min-width:1200px)": {
        fontSize: 48,
      },
      "@media (min-width:1536px)": {
        fontSize: 64,
      },
    },
  },
});

const BoxText = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    height: "420px",
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "450px",
    width: "90%",
  },

  [theme.breakpoints.up("md")]: {
    height: "600px",
    width: "40%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "600px",
    width: "60%",
  },
}));

const BoxImg = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    height: "150px",
    width: "100%",
    order: -1,
  },
  [theme.breakpoints.up("sm")]: {
    height: "200px",
    width: "90%",
    order: -1,
  },

  [theme.breakpoints.up("md")]: {
    height: "350px",
    width: "50%",
    order: 2,
  },
  [theme.breakpoints.up("lg")]: {
    height: "350px",
    width: "30%",
  },
}));

function Hero() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          width: "100%",
        }}
      >
        <BoxText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
            borderLeft: "solid 1px white",
            borderBottom: "solid 1px white",
            gap: 5,
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h1"> TÍTULO COM RESUMO BREVE</Typography>
            <Typography variant="subtitle1">
              Faça um resumo com um texto breve, explicando de forma suscinta
              como os cursos funcionam e podem ajudar as pessoas a obterem
              resultados, aqui a venda começa! Faça um resumo com um texto
              breve, explicando de forma suscinta como os cursos funcionam e
              podem ajudar as pessoas a obterem resultados, aqui a venda começa!
              Faça um resumo com um texto breve, explicando de forma suscinta
              como os cursos funcionam e podem ajudar as pessoas a obterem
              resultados, aqui a venda começa!
            </Typography>

            <Link to="/allcourses">
              <Button size="large" variant="outlined" color="secondary">
                Contrate já !
              </Button>
            </Link>
          </ThemeProvider>
        </BoxText>
        <BoxImg sx={{ border: "solid 2px white", color: "white" }}>
          iLUSTRAÇÃO
        </BoxImg>
      </Box>
    </>
  );
}

export default Hero;
