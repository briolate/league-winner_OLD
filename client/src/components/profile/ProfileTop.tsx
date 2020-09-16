import React from "react";
import { Profile } from "../../types/profileTypes";

interface Props {
  profile: Profile;
}

const ProfileTop: React.FC<Props> = ({
  profile: {
    user: { _id, name },
    teamName,
    motto,
  },
}) => (
  <div className="profile-top bg-primary p-2">
    {/* <img
        className="round-img my-1"
        src="{avatar"
        alt="User avatar"
      /> */}
    <h1 className="large">{name}</h1>
    <p className="lead">{teamName}</p>
    <p>{motto}</p>
  </div>
);

export default ProfileTop;
