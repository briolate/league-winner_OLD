import React, { useState, ChangeEvent } from "react";
import _ from "lodash";

import { valueChart } from "./draftValues";

const KeeperCalculator: React.FC = () => {
  const [state, setState] = useState({
    adp: 0,
    picklost: 0,
    tkv: 0,
  });

  const updateValues = () => {
    _.mapKeys(valueChart, (value, key) => {
      if (state.adp.toString() === key) {
        state.adp = value;
      }
      if (state.picklost.toString() === key) {
        state.picklost = value;
      }
    });
  };

  const calculateValue = () => {
    setState({ tkv: state.adp - state.picklost, picklost: 0, adp: 0 });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateValues();
    calculateValue();
  };

  return (
    <div className="calculator">
      <div className="container">
        <div className="row">
          <div className="col-md-8" style={{ textAlign: "center" }}>
            <h1 className="display-4 text-center">Keeper Calculator</h1>
            <p className="lead text-center">
              Calculator to determine the value of your keeper with respect to
              the draft pick lost for keeping said player.
            </p>
            <small className="d-block">
              <p>
                <b>ADP (Average Draft Position):</b> The player's preseason
                consensus draft position (or use your own rankings).
              </p>
              <p>
                <b>Pick Lost</b>: The pick you are losing for keeping this
                player.
              </p>
              <p>
                <b>TKV (Total Keeper Value):</b> The total value of your keeper
                considering the pick that is lost with keeping him.
              </p>
            </small>
            {/* <img
                src={Player}
                alt="Player icon"
                style={{ height: '200px', width: '200px' }}
              /> */}
            <form onSubmit={(e) => onSubmit(e)} className="form">
              <div className="form-group">
                <input
                  type="number"
                  placeholder="ADP"
                  name="adp"
                  value={state.adp}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Pick Lost"
                  name="picklost"
                  value={state.picklost}
                  onChange={onChange}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4 "
              />
            </form>
            <div className="mt-4">
              <p
                className={`alert ${state.tkv! > 0 ? "alert-success" : ""}${
                  state.tkv! < 0 ? "alert-danger" : ""
                }${
                  state.tkv! === 0 || state.tkv === null ? "alert-warning" : ""
                }`}
              >
                Your keeper's value is {state.tkv}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeeperCalculator;
