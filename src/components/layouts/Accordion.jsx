import * as React from "react";
import "../../assets/css/Accordion.css";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa";
import moment from "moment";

const tableHeader = {
  borderBottom: "rgba(28,129,28,.5)",
};

const centerContent = {
  textAlign: "center",
};

const Accordion = ({ title, content, ...props }) => {
  const [active, setActive] = React.useState("");
  const [height, setHeight] = React.useState("0px");

  const oldContent = React.useRef(null);
  const toggleAccordion = () => {
    setActive(active === "" ? "active" : "");
    setHeight(
      active === "active" ? "0px" : `${oldContent.current.scrollHeight}px`
    );
  };
  return (
    <div className="accordion__section">
      <button className={`accordion ${active}`} onClick={toggleAccordion}>
        <p className="accordion__title">{title}</p>
        {!active
          ? props.openIcon || (
              <GoPlus
                className="accordion__icon"
                fontSize="25px"
                color="#1C811C"
              />
            )
          : props.closeIcon || (
              <FaMinus
                className="accordion__icon"
                fontSize="25px"
                color="#1C811C"
              />
            )}
      </button>
      <div
        ref={oldContent}
        className="accordion__content"
        style={{
          maxHeight: `${height}`,
          padding: props.bodyPadding,
          backgroundColor: props.bodyBGColor,
        }}
      >
        {Array.isArray(content) ? (
          props.bodyType === "row-list" ? (
            content.map((item, idx) => (
              <div
                className="flex accordion-btn"
                key={idx}
                style={{
                  borderBottom: "1px solid rgba(108,108,108,.4)",
                  padding: "12px",
                  marginBottom: "0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  item.func && item.func();
                }}
              >
                <p className="w-100">{item.title}</p>
              </div>
            ))
          ) : (
            <div
              className="table-view w-100"
              style={{
                borderSpacing: "0",
                borderCollapse: "collapse",
                border: "none",
              }}
              key={props.id}
            >
              <div
                className="table-header"
                style={{
                  backgroundColor: "#F0F0F0",
                  boxShadow: "0px 2px 6px #0000000A",
                  ...props.headerStyle,
                }}
              >
                <div className="table-row" style={{ ...tableHeader }}>
                  <div
                    className="th"
                    style={{
                      width: "max-content",
                      padding: "15px",
                      ...centerContent,
                    }}
                  >
                    <p className="san-sherif">Leave Type</p>
                  </div>
                  <div className="th" style={{ ...centerContent }}>
                    <p className="san-sherif">Start Date</p>
                  </div>
                  <div className="th" style={{ ...centerContent }}>
                    <p className="san-sherif">End Date</p>
                  </div>
                  <div className="th" style={{ ...centerContent }}>
                    <p className="san-sherif">Duration</p>
                  </div>
                  <div className="th" style={{ ...centerContent }}>
                    <p className="san-sherif">Status</p>
                  </div>
                </div>
              </div>
              <div className="table-body">
                {content.map(
                  ({
                    staffName,
                    startDate,
                    endDate,
                    leaveType,
                    duration,
                    leaveDuration,
                    leaveSession,
                    reliefOfficer,
                    statusName,
                    id,
                    ...rest
                  }) => (
                    <div
                      className="table-row"
                      key={id}
                      style={{
                        boxShadow: "0px 2px 6px #0000000A",
                        border: "none",
                        borderBottom: "1px solid  rgba(0,0,0,.1)",
                      }}
                    >
                      {/* <div className="td" style={{ ...centerContent }}>
                        {staffName || leaveSession || reliefOfficer}
                      </div> */}
                      <div className="td" style={{ ...centerContent }}>
                        {leaveType}
                      </div>
                      <div className="td" style={{ ...centerContent }}>
                        {moment(startDate).format("MMMM Do, YYYY")}
                      </div>
                      <div className="td" style={{ ...centerContent }}>
                        {moment(endDate).format("MMMM Do, YYYY")}
                      </div>
                      <div className="td" style={{ ...centerContent }}>
                        {duration || leaveDuration}
                      </div>
                      <div className="td" style={{ ...centerContent }}>
                        {statusName}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        ) : (
          <div
            className="accordion__text"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
};

export default Accordion;
