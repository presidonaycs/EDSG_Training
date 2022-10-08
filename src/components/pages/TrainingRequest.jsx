/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

import { BiEditAlt } from "react-icons/bi";
import { GiTrashCan } from "react-icons/gi";

import LocationDetails from "../layouts/LocationDetails";
import TrainingRequestForm from "../layouts/TrainingRequestForm";
import IsLoading from "../common/IsLoading";
import TrainingRequestDetails from "../layouts/TrainingRequestDetails";

import { del, get, put } from "../../api-services/fetch";
import notification from "../../utility/notification";
import { Pagination } from "antd";

const TrainingRequest = ({ history }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalElement, setTotalElement] = useState();
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);

  const paginationChangeHandler = (current, pageSize) => {
    setLimit(pageSize);
    setCurrent(current);
  };

  useEffect(() => {
    getList();
  }, [current, limit]);

  const getList = async () => {
    setIsLoading(true);
    setErrorMsg("");
    const payload = {
      pageNumber: current,
      pageSize: limit,
    };
    const res = await put({
      endpoint: "/Request/pendingrequest",
      body: payload,
    });

    let result = JSON?.parse(res.headers["x-pagination"]).TotalCount;
    setTotalElement(result);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        setDetails(data.data);
        if (data.data.length < 1) {
          setErrorMsg("No Request yet");
        }
      } else {
        setErrorMsg(data.message);
      }
    } else {
      setErrorMsg("Something has gone wrong. Please, try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EDSG - Training Request";

    getList();
  }, []);

  const editRequest = (info) => {
    console.log("About to show the form...");
    setSelectedRequest(info);
  };

  const closeForm = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="w-100">
      <div className="w-100 flex space-between flex-v-baseline m-b-20">
        <h3>Training Request</h3>
        {/* <LocationDetails /> */}
      </div>
      <div className="w-100 flex space-between m-b-10">
        <h3>{`${selectedRequest ? "Update" : "Create"} Request`}</h3>
      </div>
      <div className="w-100 m-b-20">
        <TrainingRequestForm details={selectedRequest} closeForm={closeForm} />
      </div>

      <table className="table-view m-t-10">
        <thead className="table-header">
          <tr className="table-row">
            <th className="th">
              <p>Training</p>
            </th>
            <th className="th">
              <p>Organizing Body</p>
            </th>
            <th className="th">
              <p>Date</p>
            </th>
            <th className="th">
              <p>Status</p>
            </th>
            <th className="th actions">
              <p>Last Treated</p>
            </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {!(isLoading || errorMsg) &&
            details &&
            details.map((item) => (
              <ListItem
                key={item.id}
                details={item}
                editTrainingRequest={editRequest}
              />
            ))}
        </tbody>
      </table>
      {totalElement > limit && (
        <div style={{ marginTop: "20px" }}>
          <Pagination
            showSizeChanger
            pageSize={limit}
            onShowSizeChange={paginationChangeHandler}
            current={current}
            total={totalElement}
            // showTotal={true}
            onChange={paginationChangeHandler}
            // pageSizeOptions={pageSizeOptions}
            responsive
          />
        </div>
      )}
      {isLoading && <div className="w-100 center-text p-20">Loading...</div>}
      {errorMsg && <div className="w-100 center-text p-20">{errorMsg}</div>}
      {isLoading && <IsLoading />}
    </div>
  );
};

const ListItem = ({ details = {}, editTrainingRequest }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const editTraining = (e) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    console.log("Editing Training...");
    editTrainingRequest(details);
  };

  const deleteItem = async (e) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    const confirmAction = confirm(
      `Click OK to confirm the deletion of "${details.title}"`
    );
    if (!confirmAction) return;

    setIsDeleting(true);
    const res = await del({ endpoint: "/Request", param: details.id });

    console.log(res);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        notification({
          title: "Successful Training Deletion",
          message: data.message,
          type: "success",
        });
        setIsDeleted(true);
      } else {
        notification({
          title: "Training Deletion Error",
          message: data.message,
          type: "danger",
        });
      }
    } else {
      notification({
        title: "Network Error",
        message:
          "Something went wrong while deleting a Training. Please, try again later.",
        type: "danger",
      });
    }
    setIsDeleting(false);
  };

  return (
    <>
      {!isDeleted && (
        <>
          {isDeleting && <IsLoading message="Deleting Training Request..." />}
          <tr
            className={`${showDetails && "active"} table-row pointer`}
            onClick={() => setShowDetails(!showDetails)}
            role="presentation"
          >
            <td className="td p-r" style={{ padding: "20px 10px" }}>
              {details.title}
            </td>
            <td className="td p-r" style={{ padding: "20px 10px" }}>
              {details.organisingBody}
            </td>
            <td className="td p-r" style={{ padding: "20px 10px" }}>
              {details.startDate}
            </td>
            <td className="td p-r" style={{ padding: "20px 10px" }}>
              <div className={`status status-${details.status}`}>
                {`${details.status !== 3 ? "" : "Currently with "}`}
                {details.status !== 3 ? "" : <b>{details.currentlyWith} - </b>}
                <b>{details.approvalStatus}</b>
              </div>
            </td>
            {details.status === 4 ? (
              <td className="td p-r actions">
                <button
                  data-tip
                  data-for="edit-btn"
                  type="button"
                  className="m-l-10 pointer action-btn"
                  onClick={editTraining}
                >
                  <BiEditAlt />
                </button>
                <ReactTooltip id="edit-btn" type="info" effect="solid">
                  <span>Edit/Submit Request</span>
                </ReactTooltip>
                <button
                  data-tip
                  data-for="delete-btn"
                  type="button"
                  className="m-l-10 del pointer action-btn"
                  onClick={deleteItem}
                >
                  <GiTrashCan />
                </button>
                <ReactTooltip id="delete-btn" type="warning" effect="solid">
                  <span>Delete Request</span>
                </ReactTooltip>
              </td>
            ) : (
              <td className="td p-r actions" style={{ padding: "20px 10px" }}>
                {details.lastTreated}
              </td>
            )}
          </tr>
          {showDetails && (
            <tr className="">
              <td colSpan={5}>
                <TrainingRequestDetails
                  owner
                  cardDetails={details}
                  style={{ transition: "all 0.6s ease-in" }}
                />
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
};

export default TrainingRequest;
