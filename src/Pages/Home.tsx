import Hero from "../Components/sections/Hero";
import Results from "../Components/sections/Results";
import Main from "../Components/sections/Main";
import Plans from "../Components/sections/Plans";
import AboutPlanosSection from "../Components/sections/AboutPlans";
import Faq from "../Components/sections/Faq";

function Home() {
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
