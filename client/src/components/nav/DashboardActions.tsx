import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { AppState } from "../../reducers/index";

interface DashboardActionsProps extends RouteComponentProps {
  logout: any;
}

const DashboardActions: React.FC<DashboardActionsProps> = ({ logout }) => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      <Link to="/add-draft" className="btn btn-light">
        <i className="fas fa-calendar text-info mr-2" /> Add Draft
      </Link>
      <Link to="/members" className="btn btn-light">
        <i className="fas fa-user-friends text-info mr-2" /> Members
      </Link>
      <Link to="/create-member" className="btn btn-light">
        <i className="fas fa-plus text-info mr-2" /> Create Member
      </Link>
      <Link to="/keeper-calculator" className="btn btn-light">
        <i className="fas fa-plus text-info mr-2" /> Keeper Calculator
      </Link>
      <Link onClick={logout} to="/">
        <i className="fas fa-sign-out-alt" />{" "}
        <span className="hide-sm">Logout</span>
      </Link>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(
  withRouter(DashboardActions)
);
