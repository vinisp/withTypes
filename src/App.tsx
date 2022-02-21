import Home from "./Pages/Home";
import Nav from "./Components/widgets/Nav";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MemberAreaHome from "./Pages/MemberHome";
import { PageNotFound } from "./Pages/PageNotFound";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

import "./App.css";

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
  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
        <Nav />
        <AuthContextProvider>
          <Switch>
            {user ? <Redirect from="#/login" to="/" /> : false}

            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/memberhome" component={MemberAreaHome} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
