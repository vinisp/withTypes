import { styled } from "@mui/material/styles";
import { useContext } from "react";

import Hero from "../Components/sections/Hero";
import Results from "../Components/sections/Results";
import Plans from "../Components/sections/Plans";
import Faq from "../Components/sections/Faq";
import { Footer } from "../Components/widgets/Footer";

import { CartContext } from "../Components/widgets/NewCartApp/CartContext";

const MainContainerHome = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  overflowX: "hidden",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

function Home() {
  let myCartItems = useContext(CartContext);

  console.log(myCartItems);
  return (
    <>
      <MainContainerHome>
        <Hero />
        <Results />
        <Plans />
        <Faq />
        <Footer />
      </MainContainerHome>
    </>
  );
}

export default Home;
