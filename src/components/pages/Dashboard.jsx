import React, { useEffect, useState } from "react";

import LocationDetails from "../layouts/LocationDetails";
import DashboardLeaveCard from "../layouts/DashboardLeaveCard";
import LoadingSpinner from "../../resources/loadingSpinner";
import TrainingRequestDetails from "../layouts/TrainingRequestDetails";

// Icons
import { FiAward } from "react-icons/fi";
import { GrStatusGood } from "react-icons/gr";

// Api
import { get, put } from "../../api-services/fetch";
import notification from "../../utility/notification";
import Greeting from "../layouts/Greeting";
import { Pagination } from "antd";

const Dashboard = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardValues, setCardValues] = useState({});

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

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EDSG - Training Dashboard";

    getCardValues();
  }, []);

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

  const getCardValues = async () => {
    const res = await get({ endpoint: "/Dashboard/trainingcounts" });
    console.log(res);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        setCardValues(data.data);
      } else {
        notification({
          title: "Error Getting Methods",
          message: data.message,
          type: "danger",
        });
      }
    } else {
      notification({
        title: "Network",
        message:
          "Something has gone wrong while trying to get list of methods. Please, try again.",
        type: "danger",
      });
    }
  };

  return (
    <div className="w-100">
      {isLoading && <LoadingSpinner />}
      <div className="w-100 flex flex-v-center space-between">
        <Greeting />
        {/* <LocationDetails /> */}
      </div>
      <div className="flex wrap row">
        <div className="col-6 no-margin">
          <DashboardLeaveCard
            header="Training Request"
            title="My Request Statistics"
            icon={<FiAward fontSize="30px" />}
            cardDetail={[
              {
                detailName: "Pending Request",
                detailValue: cardValues.underApprovalCount || 0,
              },
              {
                detailName: "Approved Training",
                detailValue: cardValues.approvedCount || 0,
              },
              {
                detailName: "Completed Training",
                detailValue: cardValues.completedCount || 0,
              },
              {
                detailName: "Declined Request",
                detailValue: cardValues.declinedCount || 0,
              },
              {
                detailName: "Draft Request",
                detailValue: cardValues.savedCount || 0,
              },
            ]}
          />
        </div>
        <div className="col-6 no-margin">
          <DashboardLeaveCard
            header="Request Approval"
            title="My Approval Statistics"
            icon={<GrStatusGood fontSize="30px" />}
            cardDetail={[
              {
                detailName: "Pending Approval",
                detailValue: cardValues.pendingApprovalOnMeCount || 0,
              },
            ]}
          />
        </div>
      </div>
      <div className="w-100 m-t-20">
        <div className="w-100">
          <h3>Training Requests</h3>
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
              details.map((item) => <ListItem key={item.id} details={item} />)}
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
      </div>
    </div>
  );
};

const ListItem = ({ details = {} }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
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
          {details.creationDate}
        </td>
        <td className="td p-r" style={{ padding: "20px 10px" }}>
          <div className={`status status-${details.status}`}>
            {`${details.status !== 3 ? "" : "Currently with "}`}
            {details.status !== 3 ? "" : <b>{details.currentlyWith} - </b>}
            <b>{details.approvalStatus}</b>
          </div>
        </td>
        <td className="td p-r actions" style={{ padding: "20px 10px" }}>
          {details.lastTreated}
        </td>
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
  );
};

export default Dashboard;
