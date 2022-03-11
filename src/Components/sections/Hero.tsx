import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

import { Typography, Box, Button } from "@mui/material";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import HeroImage from "./assets/heroImg.png";

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
  padding: 0,
  marginTop: 65,

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  color: "white",
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
    width: "100%",
  },
}));

const BoxTitle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

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
    padding: "0px 0px 0px 160px",
    height: "auto",
    flex: "0 0 50%",
    gap: "20px",
  },
}));

const BoxImg = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  width: "50%",
  flex: "0 0 50%",
  paddingTop: "45px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    img: {
      width: "750px",
      padding: 0,
    },
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
          gap: 2,
          width: "100%",
          padding: "0 60px",
        }}
      >
        <BoxText>
          <ThemeProvider theme={theme}>
            <BoxTitle>
              <div>
                <Typography textAlign={"center"} color={"#97C930"}>
                  SEJA PROFTEAM
                </Typography>
              </div>
              <div>
                <Typography variant="h1" textAlign={"left"} color={"#97C930"}>
                  APOSTAS RENTÁVEIS GALGOS FUTEBOL
                </Typography>
              </div>
              <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/store">
                  <Button
                    size="large"
                    variant="outlined"
                    color="success"
                    sx={{ width: "300px" }}
                  >
                    Contrate já !
                  </Button>
                </Link>
              </motion.div>
            </BoxTitle>
          </ThemeProvider>
        </BoxText>
        <BoxImg>
          <img src={HeroImage} alt="heroImg" />
        </BoxImg>
      </Box>
    </>
  );
}

export default Hero;
