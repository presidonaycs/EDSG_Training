import * as React from "react";
import { IoMdClose } from "react-icons/io";

const Popup = ({ msg, closeModal, ...props }) => {
  return (
    <div
      className="overlay flex"
      style={{
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 2px 6px #0000000A",
      }}
    >
      <div className="w-100">
        <div
          className="modal-box max-w-400"
          style={{ boxShadow: "0px 2px 6px #0000000A", position: "relative" }}
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
            <div className="flex flex-direction-column flex-v-center flex-h-center mx-auto">
              <h3 className="m-t-10">{msg}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
