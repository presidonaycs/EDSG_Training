import * as React from "react";
import moment from "moment";
import ColorController from "../../controllers/ColorController";
import TrainingRequestDetails from "../layouts/TrainingRequestDetails";

const TransactionCard = (props) => {
  const [showLeaveRequestDetail, setShowLeaveRequestDetail] = React.useState(
    false
  );

  return (
    <div>
      <div
        className="flex space-between m-t-15"
        style={{
          boxShadow: "0px 2px 6px #0000000A",
          padding: props.padding || ".6rem",
          fontSize: props.fontSize || "13px",
          cursor: "pointer",
          backgroundColor: showLeaveRequestDetail
            ? "#D5FFD5"
            : props.bgColor || "#fff",
          transition: "all 0.6s ease-in",
        }}
        onClick={() => {
          setShowLeaveRequestDetail(showLeaveRequestDetail ? false : true);
        }}
      >
        <div
          style={{ padding: ".4rem", fontSize: "13px" }}
          className="col-5 my-auto"
        >
          {props.request ||
            "Bridge Oyegun - Admin Officer, Community Engagement - Annual Leave Request"}
        </div>
        <div
          className="flex space-around text-center col-4 my-auto"
          style={{ padding: ".4rem" }}
        >
          <div className="m-r-auto flex">
            <div
              className="m-r-5"
              style={{
                width: "1.1rem",
                backgroundColor: `${
                  props.status ? ColorController.getColor(props.status) : "red"
                }`,
                borderRadius: "50%",
                height: "1.1rem",
              }}
            ></div>
            <div className="my-auto">
              {props.status || "Currently with Anthony Okungbowa (HOS)"}
            </div>
          </div>
        </div>
        <div
          className="col-3 my-auto pd-l-auto"
          style={{
            borderLeft: "1px solid gray",
            padding: ".4rem",
            // paddingLeft: ".56rem",
          }}
        >
          <b className="bold-text">Last Treated:</b>
          {moment(props.lastTreated).format("DD.MM.YYYY") || "08.08.2020"}
        </div>
      </div>
      {showLeaveRequestDetail && (
        <div>
          <TrainingRequestDetails
            // height={height}
            showLeaveRequestDetail={showLeaveRequestDetail}
            style={{ transition: "all 0.6s ease-in" }}
            cardDetails={props.approvalRequest && props.approvalRequest}
            approvalRequests={props.approvalRequests && props.approvalRequests}
            setApprovalRequests={
              props.setApprovalRequests && props.setApprovalRequests
            }
          />
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
