//ReactTools

//Test Pages

import { CourseDetail } from "./Pages/CourseDetail";

//Default Pages

import Home from "./Pages/Home";
import Nav from "./Components/widgets/Nav";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { CheckoutPage } from "./Components/widgets/NewCartApp/Checkout";
import { MyStore } from "./Components/widgets/NewCartApp/NewCartApp";

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
import { CartContextItemsProvider } from "./Components/widgets/NewCartApp/CartContext";

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

              <Route exact path="/mycourses" component={MyCoursesPage} />

              <Route exact path="/checkout" component={CheckoutPage} />

              <Route exact path="/store" component={MyStore} />
              <Route exact path="/course/:idCourse" component={CourseDetail} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </CartContextItemsProvider>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
