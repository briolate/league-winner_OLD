import axios from "axios";
import { Dispatch } from "redux";
import { setAlert } from "./alert";
import { User, Users, AuthActionTypes } from "../types/authTypes";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch: Dispatch<any>) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: res.data as User,
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
    });
  }
};

// Signup User
export const signup = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => async (dispatch: Dispatch<any>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: AuthActionTypes.SIGNUP_SUCCESS,
      payload: res.data as Users[],
    });

    dispatch(<any>loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AuthActionTypes.SIGNUP_FAIL,
    });
  }
};

// Login User
export const login = (email: string, password: string) => async (
  dispatch: Dispatch<any>
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
    });
  }
};

// Logout / Clear profile
export const logout = () => (dispatch: Dispatch<any>) => {
  dispatch({ type: AuthActionTypes.CLEAR_PROFILE });
  dispatch({ type: AuthActionTypes.LOGOUT });
};
