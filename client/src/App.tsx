import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
// import Profiles from "./pages/Profiles";
import Alert from "./components/layout/Alert";
import CreateProfile from "./components/forms/CreateProfile";
import EditProfile from "./components/forms/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import KeeperCalculator from "./components/features/keeper-calculator/KeeperCalculator";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./scss/style.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Alert />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Switch>
              {/* <Route exact path="/profiles" component={Profiles} /> */}
              {/* <Route exact path="/profile/:id" component={Profile} /> */}
              <Route exact path="/" component={Landing} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/keeper-calculator"
                component={KeeperCalculator}
              />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
