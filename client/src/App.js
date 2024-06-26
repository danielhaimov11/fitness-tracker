// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import Statistics from './components/Statistics';
import WorkoutHistory from './components/WorkoutHistory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login">
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/dashboard">
            {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile">
            {isAuthenticated ? <UserProfile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/statistics">
            {isAuthenticated ? <Statistics /> : <Redirect to="/login" />}
          </Route>
          <Route path="/history">
            {isAuthenticated ? <WorkoutHistory /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

