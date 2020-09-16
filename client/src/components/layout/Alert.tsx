import React from "react";
import { connect } from "react-redux";
import { Alert, Alerts } from "../../types/alertTypes";
import { AppState } from "../../reducers/index";

const Alert: React.FC = ({ alerts }: any) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert: any) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = (state: AppState) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
