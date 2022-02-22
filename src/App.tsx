//Default Pages

import Home from "./Pages/Home";
import Nav from "./Components/widgets/Nav";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { PageNotFound } from "./Pages/PageNotFound";

//Private Routes
import MemberAreaHome from "./Pages/MemberHome";
import { Profile } from "./Pages/Profile";
import { CartPage } from "./Pages/CartPage";
import { MyCoursesPage } from "./Pages/MyCoursesPage";

//Libs

import { HashRouter as Router, Route, Switch } from "react-router-dom";

//Context

import { AuthContextProvider } from "./context/AuthContext";

//Styles

import "./App.css";

//Chart Generator

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  return (
    <Router>
      <div className="App">
        <AuthContextProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/memberhome" component={MemberAreaHome} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/mycourses" component={MyCoursesPage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
