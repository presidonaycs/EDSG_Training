import React, { useEffect, useState } from "react";
import LocationDetails from "../layouts/LocationDetails";
import LoadingSpinner from "../../resources/loadingSpinner";
import TrainingRequestDetails from "../layouts/TrainingRequestDetails";
import { Tabs } from "antd";
import querySearch from "stringquery";
// Api
import { get, put } from "../../api-services/fetch";
import Greeting from "../layouts/Greeting";
import { URLAPI } from "../../utility/ApiMethods";
import { Pagination } from "antd";
import TrainingDetailsModal from "../layouts/TrainingDetailsModal";
import Cookies from "js-cookie";

const { TabPane } = Tabs;

const TrainingRequestApproval = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [details, setDetails] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalElement, setTotalElement] = useState();
  const [limit, setLimit] = useState(20);
  const [current, setCurrent] = useState(1);
  const [approvedDetails, setApprovedDetails] = useState([]);
  const [errorMsgApproved, setErrorMsgApproved] = useState("");
  const [totalElementApproved, setTotalElementApproved] = useState();
  const [limitApproved, setLimitApproved] = useState(20);
  const [currentApproved, setCurrentApproved] = useState(1);
  const [declinedDetails, setDeclinedDetails] = useState([]);
  const [errorMsgDeclined, setErrorMsgDeclined] = useState("");
  const [totalElementDeclined, setTotalElementDeclined] = useState();
  const [limitDeclined, setLimitDeclined] = useState(20);
  const [currentDeclined, setCurrentDeclined] = useState(1);
  const [singleRequest, setSingleRequest] = useState();
  const qs = querySearch(window.location.search);

  const getList = async () => {
    setIsLoading(true);
    setErrorMsg("");
    const payload = {
      pageNumber: current,
      pageSize: limit,
    };
    const res = await put({
      endpoint: URLAPI.pendingrequest.Get,
      body: payload,
    });

    if (res && res.status === 200) {
      let result = JSON?.parse(res.headers["x-pagination"]).TotalCount;
      setTotalElement(result);
      const { data } = res;
      if (data.code === 1) {
        if (data.data.length < 1) {
          setErrorMsg("No Pending Request yet");
        } else {
          setDetails(data.data);
          if (qs.id) {
            const res = data.data?.find((r) => r.id == qs.id);
            setSingleRequest(res);
            setShowFormModal(true);
          }
        }
      } else {
        setErrorMsg(data.message);
      }
    } else {
      setErrorMsg("Something has gone wrong. Please, try again.");
    }
    setIsLoading(false);
  };

  const getApprovedList = async () => {
    setIsLoading(true);
    setErrorMsgApproved("");
    const payload = {
      pageNumber: currentApproved,
      pageSize: limitApproved,
    };
    const res = await put({
      endpoint: URLAPI.pendingrequest.GetApproved,
      body: payload,
    });

    if (res && res.status === 200) {
      let result = JSON?.parse(res.headers["x-pagination"]).TotalCount;
      setTotalElement(result);
      const { data } = res;
      if (data.code === 1) {
        setApprovedDetails(data.data);
        if (data.data.length < 1) {
          setErrorMsgApproved("No Approved Request yet");
        }
      } else {
        setErrorMsgApproved(data.message);
      }
    } else {
      setErrorMsgApproved("Something has gone wrong. Please, try again.");
    }
    setIsLoading(false);
  };

  const getDeclinedList = async () => {
    setIsLoading(true);
    setErrorMsgDeclined("");
    const payload = {
      pageNumber: currentDeclined,
      pageSize: limitDeclined,
    };
    const res = await put({
      endpoint: URLAPI.pendingrequest.GetDeclined,
      body: payload,
    });

    if (res && res.status === 200) {
      let result = JSON?.parse(res.headers["x-pagination"]).TotalCount;
      setTotalElement(result);
      const { data } = res;
      if (data.code === 1) {
        if (data.data.length < 1) {
          setErrorMsgDeclined("No Declined Request yet");
        } else {
          setDeclinedDetails(data.data);
        }
      } else {
        setErrorMsgDeclined(data.message);
      }
    } else {
      setErrorMsgDeclined("Something has gone wrong. Please, try again.");
    }
    setIsLoading(false);
  };

  const paginationChangeHandler = (current, pageSize) => {
    setLimit(pageSize);
    setCurrent(current);
  };

  useEffect(() => {
    getList();
  }, [current, limit]);

  const paginationChangeHandlerApproved = (current, pageSize) => {
    setLimitApproved(pageSize);
    setCurrentApproved(current);
  };

  useEffect(() => {
    getApprovedList();
  }, [currentApproved, limitApproved]);

  const paginationChangeHandlerDeclined = (current, pageSize) => {
    setLimitDeclined(pageSize);
    setCurrentDeclined(current);
  };

  useEffect(() => {
    getDeclinedList();
  }, [currentDeclined, limitDeclined]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EDSG - Training Request Approval";
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const callRender = (tab) => {
    console.log(tab);
    if (tab == 1) getList();
    if (tab == 2) getApprovedList();
    if (tab == 3) getDeclinedList();
  };

  const closeModal = () => {
    window.location.href = Cookies.get("homeLink");
    setShowFormModal(false);
  };

  return (
    <div className="w-100">
      {showFormModal && (
        <TrainingDetailsModal
          getList={getList}
          closeModal={closeModal}
          details={singleRequest}
        />
      )}
      {isLoading && <LoadingSpinner />}
      <div className="w-100 flex flex-v-center space-between">
        <Greeting />
        {/* <LocationDetails /> */}
      </div>
      <div className="w-100 m-t-20">
        <div className="w-100">
          <h3>Training Request Approval</h3>
        </div>
        <div className="tabs">
          <Tabs onChange={callRender}>
            <TabPane tab="Pending" key="1">
              <table className="table-view m-t-10">
                <thead className="table-header">
                  <tr className="table-row">
                    <th className="th">
                      <p>Training</p>
                    </th>
                    <th className="th">
                      <p>Initiator</p>
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
                        getList={getList}
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
              {errorMsg && (
                <div className="w-100 center-text p-20">{errorMsg}</div>
              )}
            </TabPane>
            <TabPane tab="Approved" key="2">
              <table className="table-view m-t-10">
                <thead className="table-header">
                  <tr className="table-row">
                    <th className="th">
                      <p>Training</p>
                    </th>
                    <th className="th">
                      <p>Initiator</p>
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
                  {!(isLoading || errorMsgApproved) &&
                    approvedDetails &&
                    approvedDetails.map((item) => (
                      <ListItem
                        key={item.id}
                        details={item}
                        getList={getApprovedList}
                      />
                    ))}
                </tbody>
              </table>
              {totalElementApproved > limitApproved && (
                <div style={{ marginTop: "20px" }}>
                  <Pagination
                    showSizeChanger
                    pageSize={limitApproved}
                    onShowSizeChange={paginationChangeHandlerApproved}
                    current={currentApproved}
                    total={totalElementApproved}
                    // showTotal={true}
                    onChange={paginationChangeHandlerApproved}
                    // pageSizeOptions={pageSizeOptions}
                    responsive
                  />
                </div>
              )}
              {errorMsgApproved && (
                <div className="w-100 center-text p-20">{errorMsgApproved}</div>
              )}
            </TabPane>
            <TabPane tab="Declined" key="3">
              <table className="table-view m-t-10">
                <thead className="table-header">
                  <tr className="table-row">
                    <th className="th">
                      <p>Training</p>
                    </th>
                    <th className="th">
                      <p>Initiator</p>
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
                  {!(isLoading || errorMsgDeclined) &&
                    declinedDetails &&
                    declinedDetails.map((item) => (
                      <ListItem
                        key={item.id}
                        details={item}
                        getList={getDeclinedList}
                      />
                    ))}
                </tbody>
              </table>
              {totalElementDeclined > limitDeclined && (
                <div style={{ marginTop: "20px" }}>
                  <Pagination
                    showSizeChanger
                    pageSize={limitDeclined}
                    onShowSizeChange={paginationChangeHandlerDeclined}
                    current={currentDeclined}
                    total={totalElementDeclined}
                    // showTotal={true}
                    onChange={paginationChangeHandlerDeclined}
                    // pageSizeOptions={pageSizeOptions}
                    responsive
                  />
                </div>
              )}
              {errorMsgDeclined && (
                <div className="w-100 center-text p-20">{errorMsgDeclined}</div>
              )}
            </TabPane>
          </Tabs>
        </div>
        {isLoading && <div className="w-100 center-text p-20">Loading...</div>}
      </div>
    </div>
  );
};

const ListItem = ({ details = {}, getList }) => {
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
          {details.staffName}
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
          <td colSpan={6}>
            <TrainingRequestDetails
              cardDetails={details}
              style={{ transition: "all 0.6s ease-in" }}
              getPendingRequestApprovalList={getList}
            />
          </td>
        </tr>
      )}
    </>
  );
};

// class Tabs extends React.Component {
//   state = {
//     activeTab: this.props.children[0].props.label,
//   };
//   changeTab = (tab) => {
//     this.setState({ activeTab: tab });
//   };
//   render() {
//     let content;
//     let buttons = [];
//     return (
//       <div>
//         {React.Children.map(this.props.children, (child) => {
//           buttons.push(child.props.label);
//           if (child.props.label === this.state.activeTab)
//             content = child.props.children;
//         })}

//         <TabButtons
//           activeTab={this.state.activeTab}
//           buttons={buttons}
//           changeTab={this.changeTab}
//         />
//         <div className="tab-content">{content}</div>
//       </div>
//     );
//   }
// }

// const TabButtons = ({ buttons, changeTab, activeTab }) => {
//   return (
//     <div className="tab-buttons">
//       {buttons.map((button) => {
//         return (
//           <button
//             className={button === activeTab ? "active" : ""}
//             onClick={() => changeTab(button)}
//           >
//             {button}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// const Tab = (props) => {
//   return <React.Fragment>{props.children}</React.Fragment>;
// };

export default TrainingRequestApproval;
