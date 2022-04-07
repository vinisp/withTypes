import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

import { Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import HeroImage from "./assets/heroImg.png";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    subtitle1: {
      /* border: "solid 2px white", */

      padding: "0 2px",
      "@media (max-width:600px)": {
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

const HeroContainer = styled("div")(({ theme }) => ({
  padding: 0,
  display: "flex",
  justifyContent: "center",
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    marginTop: "150px",
    alignItems: "center",
    flexDirection: "column",
    height: "420px",
  },
  [theme.breakpoints.up("sm")]: {
    marginTop: "300px",
    alignItems: "center",
    flexDirection: "column",
    height: "450px",
  },

  [theme.breakpoints.up("md")]: {
    marginTop: "150px",
    flexDirection: "column",
    alignItems: "center",
    height: "600px",
  },
  [theme.breakpoints.up("lg")]: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "120px",
    height: "600px",
  },
}));

const BoxTitle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    alignItems: "center",
  },
  [theme.breakpoints.up("sm")]: {
    marginBottom: "120px",
    alignItems: "center",
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    marginBottom: "0",
    alignItems: "center",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    marginLeft: "60px",
    padding: "0",
    height: "auto",
    flex: "0 0 30%",
    gap: "20px",
    marginBottom: "0",
    alignItems: "flex-start",
  },
}));

const BoxImg = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",

  width: "50%",
  flex: "0 0 50%",

  [theme.breakpoints.down("sm")]: {
    order: "-1",
    paddingTop: "0",
    justifyContent: "center",
    height: "auto",
    img: {
      width: "300px",
      padding: 0,
    },
  },
  [theme.breakpoints.up("sm")]: {
    order: "-1",
    paddingTop: "0",
    justifyContent: "center",
    height: "auto",
    img: {
      width: "550px",
      padding: 0,
    },
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    order: "-1",
    img: {
      width: "550px",
      padding: 0,
    },
  },
  [theme.breakpoints.up("lg")]: {
    order: "0",
    height: "auto",
    flex: "0 0 40%",
    img: {
      width: "550px",
      padding: 0,
    },
  },
}));

function Hero() {
  return (
    <>
      <HeroContainer>
        <ThemeProvider theme={theme}>
          <BoxTitle>
            <div>
              <Typography textAlign={"center"} color={"#97C930"}>
                SEJA PROFTEAM
              </Typography>
            </div>
            <div>
              <Typography
                variant="h1"
                color={"#97C930"}
                sx={{
                  textAlign: ["center", "center", "center", "left"],
                  marginBottom: [2, 2, 2, 0],
                }}
              >
                APOSTAS RENTÁVEIS <br /> GALGOS <br /> FUTEBOL
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
                  Visite nossa loja
                </Button>
              </Link>
            </motion.div>
          </BoxTitle>

          <BoxImg>
            <img src={HeroImage} alt="heroImg" />
          </BoxImg>
        </ThemeProvider>
      </HeroContainer>
    </>
  );
}

export default Hero;
