import { Action } from "redux";
import { User, AuthActionTypes } from "../types/authTypes";
const {
  USER_LOADED,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} = AuthActionTypes;

interface AuthAction extends Action {
  type: string;
  payload?: any;
}

export interface AuthState {
  readonly token: null | string;
  readonly isAuthenticated: boolean;
  readonly loading: boolean;
  readonly user: null | User;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function(state = initialState, action: AuthAction): AuthState {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
