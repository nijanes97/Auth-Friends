import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login'
import FriendsList from './components/FriendsList'
import NewFriendForm from './components/NewFriendForm';
import EditFriend from './components/EditFriend';

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/protected/friendlist">Friend List</Link>
          </li>
          <li>
            <Link to="/protected/addfriend">Add a New Friend</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute path="/protected/friendlist">
            <Route exact path="/protected/friendlist" component={FriendsList} />
          </PrivateRoute>
          <PrivateRoute path='/protected/addfriend'>
            <Route exact path="/protected/addfriend" component={NewFriendForm} />
          </PrivateRoute>
          <PrivateRoute path='/protected/:id/edit'>
            <Route exact path="/protected/:id/edit" component={EditFriend} />
          </PrivateRoute>
          <Route path="/login" component={Login}/> 
          <Route component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
