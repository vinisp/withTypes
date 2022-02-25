import Hero from "../Components/sections/Hero";
import Results from "../Components/sections/Results";
import Main from "../Components/sections/Main";
import Plans from "../Components/sections/Plans";
import AboutPlanosSection from "../Components/sections/AboutPlans";
import Faq from "../Components/sections/Faq";
import { useContext } from "react";

import { CartContext } from "../Components/widgets/NewCartApp/CartContext";

function Home() {
  let myCartItems = useContext(CartContext);

  console.log(myCartItems);
  return (
    <>
      <Hero />
      <Results />
      <Main />
      <Plans />
      <AboutPlanosSection />
      <Faq />
    </>
  );
}

export default Home;
