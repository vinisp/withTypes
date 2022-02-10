import Home from './Pages/Home';
import Nav from './Components/widgets/Nav';
import { HashRouter as Router} from 'react-router-dom'


import './App.scss';


function App() {
  return (
    <Router>
     
    <div className="App">
      <Nav />
      <Home />
    </div>
    </Router>
  );
}

export default App;
