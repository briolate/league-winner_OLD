import { v4 as uuid } from "uuid";
import { Dispatch } from "redux";
import { AlertActionTypes } from "../types/alertTypes";
const { SET_ALERT, REMOVE_ALERT } = AlertActionTypes;

export const setAlert = (
  msg: string,
  alertType: string,
  timeout: number = 4000
) => (dispatch: Dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
