import axios from "axios";
import { Dispatch } from "redux";
import { setAlert } from "./alert";
import { Profile, Profiles, ProfileActionTypes } from "../types/profileTypes";

// Get current user's profile
export const getCurrentProfile = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: ProfileActionTypes.GET_PROFILE,
      payload: res.data as Profile,
    });
  } catch (err) {
    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: ProfileActionTypes.GET_PROFILES,
      payload: res.data as Profiles,
    });
  } catch (err) {
    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: ProfileActionTypes.GET_PROFILE,
      payload: res.data as Profile,
    });
  } catch (err) {
    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Create or update a profile
export const createProfile = (
  formData: any,
  history: any,
  edit: boolean = false
) => async (dispatch: Dispatch<any>) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: ProfileActionTypes.GET_PROFILE,
      payload: res.data as Profile,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add draft
export const addDraft = (formData: any, history: any) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/drafts", formData, config);

    dispatch({
      type: ProfileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Draft added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete draft
export const deleteDraft = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await axios.delete(`api/profile/drafts/${id}`);

    dispatch({
      type: ProfileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Draft deleted", "success"));
  } catch (err) {
    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete account & profile
export const deleteAccount = (history: any) => async (
  dispatch: Dispatch<any>
) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });
      dispatch({ type: ProfileActionTypes.ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been deleted", "success"));
      history.push("/");
    } catch (err) {
      dispatch({
        type: ProfileActionTypes.PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
