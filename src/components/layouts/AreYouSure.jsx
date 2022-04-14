import * as React from "react";
import { IoMdClose } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

const AreYouSure = ({
  closeModal,
  currentPeriod,
  setConfirmDelete,
  handleDeleteBtn,
  confirmDelete,
  ...props
}) => {
  React.useEffect(() => {
    handleDeleteBtn(currentPeriod.id);
  }, [confirmDelete, currentPeriod, handleDeleteBtn]);
  return (
    <div
      className="overlay"
      style={{ alignContent: "center", justifyContent: "center" }}
    >
      <div
        className="modal-box max-w-400"
        style={{
          boxShadow: "0px 2px 6px #0000000A",
          backgroundColor: "white",
          position: "relative",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
          color: "#99A6C4",
        }}
      >
        <div className="content flex-h-center flex-v-center">
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
            onClick={() => closeModal()}
          />
          <div style={{ margin: "10px auto" }}>
            <FaTrashAlt fontSize="35px" color="#F6649F" />
          </div>

          <div className="flex flex-direction-column w-100 center-text pd-10">
            <div className="pd-y-7">
              <h2 style={{ color: "#63646E", marginTop: "20px" }}>
                Are you sure you want to delete
              </h2>
              <h2 className="pd-y-7">
                {currentPeriod.title}: {currentPeriod.name}?
              </h2>
            </div>
            <div>
              <p style={{ fontSize: "13px" }}>
                PS: This process cannot be undone.
              </p>
            </div>
            <div className="flex space-between m-t-20 pd-10">
              <button
                className="bg-danger btn btn-large w-45"
                type="button"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Yes, Delete
              </button>
              <button
                className="bg-light-gray btn btn-large w-45"
                type="button"
                onClick={() => {
                  setConfirmDelete(false);
                  closeModal();
                }}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
