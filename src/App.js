import { Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Game from "./Views/Game";
import JoiningToGame from "./Views/JoiningToGame";
import CreateNewGame from "./Views/CreateNewGame";
import Main from "./Views/Main";
import Waiting from "./Views/Waiting";

import logo from "./Utilities/Images/logo.png"

function App() {
  return (
    <Router>
      <div>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/"> 
                <img src={logo} alt="logo" width="30" height="30" className="d-inline-block align-top"></img>{' '}
                Ticket-To-Ride 
            </Navbar.Brand>
          </Navbar>
        </div>

        <Switch>
          <Route path="/game" component={Game} />
          <Route path="/waiting" component={Waiting}/>
          <Route path="/create" component={CreateNewGame}/>
          <Route path="/joining" component={JoiningToGame}/>
          <Route path="/" component={Main}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
