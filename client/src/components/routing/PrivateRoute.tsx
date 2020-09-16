import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../reducers/index";
import { AuthState } from "../../reducers/auth";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  path,
  exact,
  ...rest
}: {
  component: any;
  auth: AuthState;
  exact: boolean;
  path: string;
}) => (
  <Route
    exact={exact}
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
