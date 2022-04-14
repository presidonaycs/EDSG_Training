import * as React from "react";
import { IoMdClose } from "react-icons/io";
import errorIcon from "../../assets/images/errorIcon.jpg";

const ErrorModal = ({ closeModal, action = "Saving record", ...props }) => {
  return (
    <div
      className="modal-box max-w-400"
      style={{
        boxShadow: "0px 2px 6px #0000000A",
        position: "absolute",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <div className="content">
        <IoMdClose
          className="pointer btn-round"
          style={{
            position: "absolute",
            top: "8px",
            right: "15px",
            fontSize: "24px",
            color: "#fff",
            backgroundColor: "rgba(209, 26, 42, .9)",
            padding: "3px",
          }}
          onClick={closeModal}
        />
        <div className="flex flex-direction-column flex-center mx-auto">
          <div>
            <img
              src={errorIcon}
              width="65px"
              alt="Clap"
              style={{ justifyContent: "center" }}
            />
          </div>
          <h3 className="m-t-10" style={{ color: "red" }}>
            Error {action}
          </h3>
        </div>
        <button
          type="button"
          className="btn btn-large w-100 m-t-10 btn-round"
          onClick={() => closeModal()}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
