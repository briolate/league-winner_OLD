import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { AppState } from "../../reducers/index";

interface ChildComponentProps extends RouteComponentProps {
  profile: any;
  createProfile: any;
  getCurrentProfile: any;
}

const EditProfile: React.FC<ChildComponentProps> = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    teamName: "",
    motto: "",
    seasons: "",
    playoffs: "",
    championships: "",
    lastPlaces: "",
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      teamName: loading || !profile.teamName ? "" : profile.teamName,
      motto: loading || !profile.motto ? "" : profile.motto,
      seasons: loading || !profile.seasons ? "" : profile.seasons.join(", "),
      playoffs: loading || !profile.playoffs ? "" : profile.playoffs.join(", "),
      championships:
        loading || !profile.championships
          ? ""
          : profile.championships.join(", "),
      lastPlaces:
        loading || !profile.lastPlaces ? "" : profile.lastPlaces.join(", "),
    });
  }, [loading, getCurrentProfile]);

  const {
    teamName,
    motto,
    seasons,
    playoffs,
    championships,
    lastPlaces,
  } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <div className="center">
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Update your team info
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Team Name"
            name="teamName"
            value={teamName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Team Motto"
            name="motto"
            value={motto}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Seasons"
            name="seasons"
            value={seasons}
            onChange={(e) => onChange(e)}
          />
        </div>
        <small className="form-text">
          Enter at least one season you have competed in
        </small>
        <div className="form-group">
          <input
            type="text"
            placeholder="Playoffs"
            name="playoffs"
            value={playoffs}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Championships"
            name="championships"
            value={championships}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Last Places"
            name="lastPlaces"
            value={lastPlaces}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1" href="dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
