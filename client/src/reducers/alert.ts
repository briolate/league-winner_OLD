import { AlertActionTypes, Alert } from "../types/alertTypes";
const { SET_ALERT, REMOVE_ALERT } = AlertActionTypes;

const initialState: any = [];

export default function(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert: Alert) => alert.id !== payload);
    default:
      return state;
  }
}
