//ReactTools

//Test Pages

import { CartApp } from "./Components/widgets/Cart/CartApp";
import { CartContextItemsProvider } from "./Components/widgets/Cart/CartContext";

//Default Pages

import Home from "./Pages/Home";
import Nav from "./Components/widgets/Nav";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AllCourses } from "./Pages/AllCourses";
import { PageNotFound } from "./Pages/PageNotFound";

//Private Routes
import MemberAreaHome from "./Pages/MemberHome";
import { RacePage } from "./Pages/RacePage";
import { Profile } from "./Pages/Profile";
import { CartPage } from "./Pages/CartPage";
import { MyCoursesPage } from "./Pages/MyCoursesPage";

//Libs

import { HashRouter as Router, Route, Switch } from "react-router-dom";

//UI

//Context

import { AuthContextProvider } from "./context/AuthContext";

//Styles

import "./App.css";

//MockDataCourse

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
          <CartContextItemsProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/memberhome" component={MemberAreaHome} />
              <Route exact path="/race/:idRace" component={RacePage} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/cart" component={CartPage} />
              <Route exact path="/allcourses" component={AllCourses} />
              <Route exact path="/mycourses" component={MyCoursesPage} />
              <Route exact path="/store" component={CartApp} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </CartContextItemsProvider>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
