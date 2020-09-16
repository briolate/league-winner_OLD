import React, { useState, MouseEvent } from "react";

import Login from "./Login";
import Signup from "./Signup";

const Form: React.FC = () => {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  const handleLoginClick = (e: MouseEvent) => {
    e.preventDefault();
    setLogin(true);
    setSignup(false);
  };

  const handleSignupClick = (e: MouseEvent) => {
    e.preventDefault();
    setSignup(true);
    setLogin(false);
  };

  return (
    <div id="login-form">
      {login ? <Login /> : null}
      {signup ? <Signup /> : null}

      <div id="auth-buttons">
        <button
          className={login ? "active" : ""}
          onClick={handleLoginClick}
          type="submit"
        >
          SIGN IN
        </button>
        <button
          className={signup ? "active" : ""}
          onClick={handleSignupClick}
          type="submit"
        >
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default Form;
