import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../components/layout/Spinner";
import ProfileTop from "../components/profile/ProfileTop";
import ProfileAbout from "../components/profile/ProfileAbout";
import { getProfileById } from "../actions/profile";
import { AppState } from "../reducers/index";
import { Profile } from "../types/profileTypes";

interface Props {
  profile: Profile;
  getProfileById;
  auth;
  match;
}

const Profile: React.FC<Props> = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {/* {profile.drafts.length > 0 ? (
              <ProfileDrafts profile={profile} />
            ) : (
              <div className="profile-drafts bg-primary p-2">
                <h2 className="text-center">No drafts added</h2>
              </div>
            )} */}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
