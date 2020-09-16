export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface Users {
  users: User[];
}

export enum AuthActionTypes {
  LOAD_USER = "@@user/LOAD_USER",
  USER_LOADED = "@@user/USER_LOADED",
  SIGNUP = "@@user/SIGNUP",
  SIGNUP_SUCCESS = "@Auser/SIGNUP_SUCCESS",
  SIGNUP_FAIL = "@@user/SIGNUP_FAIL",
  LOGIN = "@@user/LOGIN",
  LOGIN_SUCCESS = "@@user/LOGIN_SUCCESS",
  LOGIN_FAIL = "@@user/LOGIN_FAIL",
  LOGOUT = "@@user/LOGOUT",
  AUTH_ERROR = "@@user/AUTH_ERROR",
  CLEAR_PROFILE = "@@user/CLEAR_PROFILE",
  ACCOUNT_DELETED = "@@user/ACCOUNT_DELETED",
}
