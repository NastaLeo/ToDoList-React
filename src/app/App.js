import { BrowserRouter as Router, Route} from "react-router-dom";

import {LoginPage, RegistrationPage, UsersPage, TasksPage} from '../pages';
import './App.scss';

function App() {
  return (
    <div className="wrapper">

      <Router>

        <Route exact path="/">
          <LoginPage/>
        </Route>

        <Route path="/registration">
          <RegistrationPage/>
        </Route>

        <Route path="/users">
          <UsersPage/>
        </Route>

        <Route path="/tasks">
          <TasksPage/>
        </Route>
         
      </Router>

    </div>
  );
}

export default App;
