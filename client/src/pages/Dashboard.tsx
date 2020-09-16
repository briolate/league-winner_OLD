import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../components/layout/Spinner";
import DashboardActions from "../components/nav/DashboardActions";
import { getCurrentProfile, deleteAccount } from "../actions/profile";
import { AppState } from "../reducers/index";

interface ChildComponentProps extends RouteComponentProps {
  profile: any;
  getCurrentProfile: any;
  deleteAccount: any;
  auth: any;
}

const Dashboard: React.FC<ChildComponentProps> = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet set up a profile. Please add some info.</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
