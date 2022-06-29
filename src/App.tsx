//ReactTools

//Página principal de teste

// import { TestarComponentes } from "./Pages/paginas_testes/testar_componentes";

//Test Pages
import { CreateCourse } from "./Pages/userPages/CreateCourse";
import { IndexCourse } from "./Pages/userPages/IndexCoursePage";
import { CoursePage } from "./Pages/userPages/CoursePage";
import { EditProfilePage } from "./Pages/userPages/EditProfilePage";
import { IndexCoursePage } from "./Pages/userPages/EditIndexCoursePage";
import { MakePost } from "./Pages/userPages/MakePost";
import { Subscribe } from "./Pages/userPages/Subscribes";

//Default Pages

import Home from "./Pages/Home";
import Nav from "./Components/widgets/Nav";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { CheckoutPage } from "./Components/widgets/NewCartApp/Checkout";
import { MyStore } from "./Components/widgets/NewCartApp/NewCartApp";
import { CourseDetail } from "./Pages/CourseDetail";

import { PageNotFound } from "./Pages/PageNotFound";

//Private Routes
import MemberAreaHome from "./Pages/MemberHome";
import { RacePage } from "./Pages/RacePage";
import { Profile } from "./Pages/Profile";
// import { MyCoursesPage } from "./Pages/MyCoursesPage";

//Libs

import { HashRouter as Router, Route, Switch } from "react-router-dom";

//UI

//Context

import { AuthContextProvider } from "./context/AuthContext";
import { CartContextItemsProvider } from "./Components/widgets/NewCartApp/CartContext";

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
          <CartContextItemsProvider>
            <Nav />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/memberhome" component={MemberAreaHome} />
              <Route exact path="/newpost" component={MakePost} />
              <Route exact path="/subscribe" component={Subscribe} />
              <Route exact path="/race/:idRace" component={RacePage} />
              <Route exact path="/profile/:user_id" component={Profile} />
              <Route
                exact
                path="/profile/edit/:firebaseID"
                component={EditProfilePage}
              />
              <Route
                exact
                path="/course/editsellpage/:course_id"
                component={IndexCoursePage}
              />
              <Route exact path="/course" component={IndexCourse} />
              <Route
                exact
                path="/viewcourse/:idCourse"
                component={CoursePage}
              />
              <Route
                exact
                path="/editcourse/:idCourse"
                component={CreateCourse}
              />
              <Route exact path="/createcourse" component={CreateCourse} />
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
