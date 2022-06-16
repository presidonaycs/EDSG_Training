import React, { useEffect, useState } from "react";
import LocationDetails from "../layouts/LocationDetails";
import LoadingSpinner from "../../resources/loadingSpinner";
import TrainingRequestDetails from "../layouts/TrainingRequestDetails";
// import { Tabs } from "antd";

// Api
import { get } from "../../api-services/fetch";
import Greeting from "../layouts/Greeting";
import { URLAPI } from "../../utility/ApiMethods";
import "./tabs.css";

// const { TabPane } = Tabs;

const TrainingRequestApproval = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [approvedDetails, setApprovedDetails] = useState([]);
  const [errorMsgApproved, setErrorMsgApproved] = useState("");
  const [declinedDetails, setDeclinedDetails] = useState([]);
  const [errorMsgDeclined, setErrorMsgDeclined] = useState("");

  const getList = async () => {
    setIsLoading(true);
    setErrorMsg("");
    const res = await get({ endpoint: URLAPI.pendingrequest.Get });

    console.log("getList", res);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        setDetails(data.data);
        if (data.data.length < 1) {
          setErrorMsg("No Pending Request yet");
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
    const res = await get({ endpoint: URLAPI.pendingrequest.GetApproved });

    console.log("getList", res);

    if (res && res.status === 200) {
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
    const res = await get({ endpoint: URLAPI.pendingrequest.GetDeclined });

    console.log("getList", res);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        setDeclinedDetails(data.data);
        if (data.data.length < 1) {
          setErrorMsgDeclined("No Declined Request yet");
        }
      } else {
        setErrorMsgDeclined(data.message);
      }
    } else {
      setErrorMsgDeclined("Something has gone wrong. Please, try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EDSG - Training Request Approval";
    getList();
    getApprovedList();
    getDeclinedList();
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="w-100">
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
          <Tabs>
            <Tab label="Pending Requests" key="1">
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
                        getList={getList}
                      />
                    ))}
                </tbody>
              </table>
              {errorMsg && (
                <div className="w-100 center-text p-20">{errorMsg}</div>
              )}
            </Tab>
            <Tab label="Approved Requests" key="2">
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
              {errorMsgApproved && (
                <div className="w-100 center-text p-20">{errorMsgApproved}</div>
              )}
            </Tab>
            <Tab label="Declined Requests" key="3">
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
              {errorMsgDeclined && (
                <div className="w-100 center-text p-20">{errorMsgDeclined}</div>
              )}
            </Tab>
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
        <td className="td" style={{ padding: "20px 10px" }}>
          {details.organisingBody}
        </td>
        <td className="td" style={{ padding: "20px 10px" }}>
          {details.startDate}
        </td>
        <td className="td" style={{ padding: "20px 10px" }}>
          <div className={`status status-${details.status}`}>
            {`${details.status !== 3 ? "" : "Currently with "}`}
            {details.status !== 3 ? "" : <b>{details.currentlyWith} - </b>}
            <b>{details.approvalStatus}</b>
          </div>
        </td>
        <td className="td actions" style={{ padding: "20px 10px" }}>
          {details.lastTreated}
        </td>
      </tr>
      {showDetails && (
        <tr className="">
          <td colSpan={5}>
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

class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.label,
  };
  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };
  render() {
    let content;
    let buttons = [];
    return (
      <div>
        {React.Children.map(this.props.children, (child) => {
          buttons.push(child.props.label);
          if (child.props.label === this.state.activeTab)
            content = child.props.children;
        })}

        <TabButtons
          activeTab={this.state.activeTab}
          buttons={buttons}
          changeTab={this.changeTab}
        />
        <div className="tab-content">{content}</div>
      </div>
    );
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab-buttons">
      {buttons.map((button) => {
        return (
          <button
            className={button === activeTab ? "active" : ""}
            onClick={() => changeTab(button)}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

const Tab = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default TrainingRequestApproval;
