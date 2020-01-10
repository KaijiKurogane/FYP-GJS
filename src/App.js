import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages

const Login = React.lazy(() => import("./screens/Login"));
class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={props => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;