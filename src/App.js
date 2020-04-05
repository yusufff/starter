import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from 'axios';

import Header from './components/Header';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';

import { AuthContext, useAuth } from "./hooks/use-auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/giris" />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        !user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

function App() {
  const existingUser = JSON.parse(localStorage.getItem('user'));
  const [authUser, setAuthUser] = useState(existingUser);

  const setUser = (data) => {
    if ( data ) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      localStorage.removeItem('user');
    }
    setAuthUser(data);
  }

  const fetchProfile = useCallback(async () => {
    if ( !authUser ) return false;

    try {
      const { data } = await axios.get('PROFILE URL');
      setUser(data);
    } catch({ response }) {
      console.log(response);
    }
  }, [authUser])

  useEffect(() => {
    fetchProfile();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{
      user: authUser,
      setUser,
      fetchProfile,
    }}>
      <Router>
        <div>
          {authUser && <Header />}
          {!authUser ? (
            <>
              <PublicRoute exact path={["/", "/giris"]} component={Login} />
              <PublicRoute exact path="/kayit" component={Register} />
            </>
          ) : (
            <>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/profil" component={Profile} />
            </>
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
