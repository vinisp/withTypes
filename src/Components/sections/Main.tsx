import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { LineGraph } from "../graphs/LineGraph";

import { Typography, Box, Button } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    subtitle1: {
      /* border: "solid 2px white", */
      color: "white",

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
    h2: {
      fontWeight: 600,
      color: "white",

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
  padding: theme.spacing(2),
  marginBottom: 200,
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
    width: "80%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "900px",
    width: "60%",
  },
}));

function Main() {
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
          marginTop: "60px",
        }}
      >
        <BoxText
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "whNossos Cursosite",

            gap: 5,
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h2" textAlign={"center"}>
              {" "}
              LOCAL PARA INFORMAR DADOS{" "}
            </Typography>
            <Typography variant="subtitle1">
              Exemplo de seção com resultados em gráfico
            </Typography>
            <Box
              sx={{ width: "100%", height: "100%", background: "#F3F3F310" }}
            >
              <LineGraph />
            </Box>
            <Button size="large" variant="outlined">
              Contrate já !
            </Button>
          </ThemeProvider>
        </BoxText>
      </Box>
    </>
  );
}

export default Main;
