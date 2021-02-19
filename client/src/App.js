import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Edit from './pages/Edit'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/add">
          <Edit/>
        </Route>
        <Route path="/edit/:id">
          <Edit/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
