import React from "react";
import { Profile } from "../../types/profileTypes";

interface Props {
  profile: Profile;
}

const ProfileAbout: React.FC<Props> = ({
  profile: { seasons, playoffs, championships, lastPlaces },
}) => (
  <div className="profile-about bg-light p-2">
    <div className="line" />
    <h2 className="text-primary">Seasons</h2>
    <div className="about">
      {seasons.map((season, index) => (
        <div key={index} className="p-1">
          {season}
        </div>
      ))}
    </div>
    <h2 className="text-primary">Playoffs</h2>
    <div className="about">
      {playoffs.map((playoff, index) => (
        <div key={index} className="p-1">
          {playoff}
        </div>
      ))}
    </div>
    <h2 className="text-primary">Championships</h2>
    <div className="about">
      {championships.map((championships, index) => (
        <div key={index} className="p-1">
          {championships}
        </div>
      ))}
    </div>
    <h2 className="text-primary">Last Place Finishes</h2>
    <div className="about">
      {lastPlaces.map((lastPlaces, index) => (
        <div key={index} className="p-1">
          {lastPlaces}
        </div>
      ))}
    </div>
  </div>
);

export default ProfileAbout;
