import Hero from "../Components/sections/Hero";
import Results from "../Components/sections/Results";
import Main from "../Components/sections/Main";
import Plans from "../Components/sections/Plans";

import Login from "./Login";
import Register from "./Register";
import { Route, Link, Switch } from 'react-router-dom'

function Home() {
  return (
    <>
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
     
        <Hero />
        <Results />
        <Main />
        <Plans />
      

        

        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch> 
    </>
  );
}

export default Home;