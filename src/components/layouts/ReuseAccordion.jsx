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
            // <div style={{padding: "5px"}}>
            content.map((item, idx) => (
              <div
                className="flex"
                key={idx}
                style={{
                  borderBottom: "1px solid rgba(108,108,108,.4)",
                  // backgroundColor: "#F5F7F9",
                  padding: "10px",
                  margin: "10px",
                  marginBottom: "0",
                }}
              >
                <p>{item}</p>
              </div>
            ))
          ) : (
            props.bodyType === "table" && (
              <div
                className="table-view w-100"
                style={{
                  borderSpacing: "0",
                  borderCollapse: "collapse",
                  border: "none",
                }}
                // key={props.id}
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
                    {props.tableHeader.map((item) => (
                      <div
                        className="th"
                        style={{
                          width: "max-content",
                          padding: "15px",
                          ...centerContent,
                        }}
                      >
                        <p className="san-sherif">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="table-body">
                  <div
                    className="table-row"
                    // key={id}
                    style={{
                      boxShadow: "0px 2px 6px #0000000A",
                      border: "none",
                      borderBottom: "1px solid  rgba(0,0,0,.1)",
                    }}
                  >
                    {content.map((item) => {
                      Object.values(item).map((val) => {
                        <div className="td" style={{ ...centerContent }}>
                          {val}
                        </div>;
                      });
                    })}
                  </div>
                </div>
              </div>
            )
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
