import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export function alertMessage(message, width, height) {
  const alert = confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          <h3 style={{ color: "white" }}>{message}</h3>
          <button onClick={onClose}>OK</button>
        </div>
      );
    },
  });

  return alert;
}

export const deleteRecord = (callbackfunction, record) => {
  const alert = confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          <h1 style={{ color: "white" }}>Are you sure</h1>
          <h3 style={{ color: "white" }}>You want to delete this Record?</h3>
          <button onClick={onClose}>No</button>
          <button onClick={() => callbackfunction(record)}>Yes!</button>
        </div>
      );
    },
  });

  return alert;
};

export const onYesNoAlert = (callbackfunction, record, message) => {
  const alert = confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          <h3 style={{ color: "white" }}>{message}</h3>
          <button onClick={onClose}>No</button>
          <button onClick={() => callbackfunction(record)}>Yes!</button>
        </div>
      );
    },
  });

  return alert;
};




export const alertWarning = (message) => {
  return <div className="alert alert-warning">{message}</div>;
};

export function passwordPop(callbackfunction, getValue) {
  const alert = confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="card">
          <div
            className="card-header separator"
            style={{ background: "whitesmoke" }}
          >
            Authenticate Process
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Enter Password</label>
              <input
                type="password"
                onChange={getValue}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-danger" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-success pull-right"
                onClick={callbackfunction}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      );
    },
  });

  return alert;
}

export default {
  alertMessage,
  passwordPop,
  deleteRecord,
  alertWarning,
  onYesNoAlert,
};
