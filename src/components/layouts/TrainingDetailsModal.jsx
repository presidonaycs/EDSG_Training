import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Cookies from "js-cookie";

import { IoMdClose } from "react-icons/io";
import TrainingRequestDetails from "./TrainingRequestDetails";
// import SuccessModal from "./SuccessModal";

const TrainingDetailsModal = ({ closeModal, getList, details }) => {
  return (
    <div className="overlay">
      <IoMdClose className="close-btn pointer" onClick={closeModal} />
      <div className="modal-box" style={{ width: "70%" }}>
        <div className="content">
          <TrainingRequestDetails
            cardDetails={details}
            style={{ transition: "all 0.6s ease-in" }}
            getPendingRequestApprovalList={getList}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingDetailsModal;
