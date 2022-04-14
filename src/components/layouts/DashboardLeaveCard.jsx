import * as React from "react";
import { MdCardTravel } from "react-icons/md";

const DashboardLeaveCard = (props) => {
  return (
    <div className="flex flex-v-center m-t-20">
      <div
        className="w-100"
        style={{
          margin: "0",
          padding: "0",
          boxShadow: "0px 2px 6px #0000000A"
        }}
      >
        <div
          className=" w-100 flex space-between m-b-10 bg-white"
          style={{ padding: props.headerPadding || "10px" }}
        >
          <h3 className="my-auto">
            {props.header}
          </h3>
          <div>{props.icon || <MdCardTravel fontSize="30px" />}</div>
        </div>
        <div className="flex flex-direction-column">
          <div
            className="border-top-green-4 border-bottom-gray-1 w-100 flex row wrap space-between"
            style={{
              padding: "10px",
              paddingRight: "5px",
              margin: 0,
              backgroundColor: props.titleColor || "transparent",
            }}
          >
            <div>{props.title || "Annual Leave Plan"}</div>
            <div>{props.title2 || ""}</div>
          </div>
          {props.cardDetail.map(({ detailName, detailValue }, idx) => (
            <div
              key={idx}
              className="flex space-between pd-y-7 pd-l-7 pd-r-0 border-bottom-gray-1"
              style={{
                backgroundColor: props.bodyColor || "white",
                paddingRight: "0",
                height: "auto",
              }}
            >
              <p className="  no-margin">{detailName}</p>
              <p
                className=" no-margin bolder-text"
                style={{
                  paddingRight: "7px"
                }}
              >
                {detailValue}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLeaveCard;
