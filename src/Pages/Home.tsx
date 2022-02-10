import Hero from "../Components/sections/Hero";
import Results from "../Components/sections/Results";
import Main from "../Components/sections/Main";
import Plans from "../Components/sections/Plans";
import AboutPlanosSection from "../Components/sections/AboutPlans"
import Faq from "../Components/sections/Faq"

import Login from "./Login";
import Register from "./Register";
import { Route,  Switch } from 'react-router-dom'

function Home() {
  return (
    <>
      
        <Hero />
        <Results />
        <Main />
        <Plans />
        <AboutPlanosSection />
        <Faq />

        

        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch> 
    </>
  );
}

export default Home;