import Hero from "../Components/sections/Hero";
import Results from "../Components/sections/Results";
import Plans from "../Components/sections/Plans";
import Faq from "../Components/sections/Faq";
import { useContext } from "react";
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

function Home() {
  let myCartItems = useContext(CartContext);

  console.log(myCartItems);
  return (
    <>
      <Hero />
      <Results />
      <Plans />
      <Faq />
      <Footer />
    </>
  );
}

export default Home;
