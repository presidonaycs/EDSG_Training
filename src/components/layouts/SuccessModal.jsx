import * as React from "react";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import clapIcon from "../../assets/images/clapIcon.png";

const SuccessModal = ({
  closeModal,
  action = "Your update was successfully",
  ...props
}) => {
  return (
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
        <div className="flex flex-direction-column flex-v-center mx-auto">
          <div>
            <img src={clapIcon} width="65px" alt="Clap" />
          </div>
          <h2 className="m-t-5">Hello {Cookies.get("fullname")}!</h2>
          <h3 className="m-t-10">{action}</h3>
        </div>
        <button
          type="button"
          className="btn btn-large w-100 m-t-10 btn-round"
          onClick={() => closeModal()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
