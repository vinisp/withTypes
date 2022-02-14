import Home from "./Pages/Home";
import Nav from "./Components/widgets/Nav";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MemberArea from "./Pages/MemberArea";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
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
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/member" component={MemberArea} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
