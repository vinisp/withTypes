import { styled } from "@mui/material/styles";
import { useContext } from "react";

import Hero from "../Components/sections/Hero";
import Results from "../Components/sections/Results";
import Plans from "../Components/sections/Plans";
import Faq from "../Components/sections/Faq";
import { Footer } from "../Components/widgets/Footer";

// import axios from "axios";

import { CartContext } from "../Components/widgets/NewCartApp/CartContext";

// async function testConect() {
//   try {
//     const response = await axios.get("http://localhost:3001/");
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// testConect();

const MainContainerHome = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
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
