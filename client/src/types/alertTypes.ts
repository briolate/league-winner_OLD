export interface Alert {
  msg: string;
  alertType: string;
  timeout: number;
  id: string;
}

export interface Alerts {
  alerts: Alert[];
}

export enum AlertActionTypes {
  SET_ALERT = "@@user/SET_ALERT",
  REMOVE_ALERT = "@@user/REMOVE_ALERT",
}
