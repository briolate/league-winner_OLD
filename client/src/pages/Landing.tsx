import React from "react";

import Form from "../components/auth/Form";

const Landing: React.FC = () => {
  return (
    <div id="landing">
      <div className="banner">
        <div className="banner-content">
          <h1>LEAGUE WINNER</h1>
          <p>Let's face it, you suck at fantasy football.</p>
          <p>We're here to help.</p>
        </div>
      </div>
      <div className="login">
        <Form />
      </div>
    </div>
  );
};

export default Landing;
