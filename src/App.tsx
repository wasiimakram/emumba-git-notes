import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/Route/ProtectedRoute';
import routes from './components/Route/Routes';
import './App.css';
import './scss/style.scss';
import { Header } from 'antd/es/layout/layout';
import Navbar from './modules/layout/Header';
import Home from './modules/home/Home';
import { Add, Details, Edit } from './modules/gist';
import Profile from './modules/profile/Profile';
import CallBack from './components/common/CallBack';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          {routes.map((route) => {
            return (
              <ProtectedRoute
                key={route.path}
                path={route.path}
                component={route.component}
                type={route.type}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
