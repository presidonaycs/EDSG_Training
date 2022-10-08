import * as React from "react";
import moment from "moment";
import Accordion from "../layouts/Accordion";

// icons
import { BsCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import CommentModal from "../layouts/CommentModal";
import Successmodal from "../layouts/SuccessModal";
import ErrorModal from "../layouts/ErrorModal";
import { PDFExport } from "@progress/kendo-react-pdf";
import Cookies from "js-cookie";
// Api
import { URLAPI } from "../../utility/ApiMethods";
import { Put, Get } from "../../utility/fetch";
import EdsgLogo from "../../assets/images/edsg-logo-250.png";
// Image
import festac from "../../assets/images/Festac-logo.jpg";
import { formatFileUrl, formatReviewStatus } from "../../utility/general";
import CompletionFormModal from "./CompletionFormModal";
import PictureModal from "./PictureModal";

const borderBottom = {
  borderBottom: "1px solid rgba(108,108,108,.4)",
};

const TrainingRequestDetails = (props) => {
  const pdfExportComponent = React.useRef(null);
  const [requestState, setRequestState] = React.useState({
    comment: "",
    learningRequestId: "",
    approvalStatus: 1,
  });
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showCompletionModal, setShowCompletionModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [btnText, setBtnText] = React.useState("");
  const [reviewDetails, setReviewDetails] = React.useState({});
  const [showPictureModal, setShowPictureModal] = React.useState(false);

  const openPicture = () => {
    console.log("open");
    setShowPictureModal(true);
  };

  const closePictureModal = () => {
    setShowPictureModal(false);
  };

  const approvalRequest = () => {
    Put({ ...requestState }, URLAPI.approveTraining.Put, (data) => {
      // console.log("Logging Data After submitting Training", data);
      if (data) {
        if (data.code === 1) {
          console.log("Training Approved Successfully");
          setShowCommentModal(false);
          props.setApprovalRequests &&
            props.setApprovalRequests({
              ...props.approvalRequests,
              loading: true,
            });

          Get(URLAPI.pendingrequest.Get, (data) => {
            console.log("Logging Pending Request in side put function ", data);
            setShowSuccess(true);
            setShowCommentModal(false);
            if (data) {
              if (data.code === 1) {
                if (data.data) {
                  if (data.data.length === 0) {
                    props.setApprovalRequests &&
                      props.setApprovalRequests({
                        ...props.approvalRequests,
                        data: [],
                        loading: false,
                      });
                  } else {
                    props.setApprovalRequests &&
                      props.setApprovalRequests({
                        ...props.approvalRequests,
                        data: [...data.data],
                        loading: false,
                      });
                  }
                }
              }
            }
          });

          !props.owner && setShowSuccess(true);
        } else if (data.code === 0) {
          setErrorMsg(data.message);
          setShowErrorModal(true);
        }
      }
    });
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setShowSuccess(false);
    setShowCommentModal(false);
  };

  const getDifferenceInDays = (date1, date2) => {
    const diffInMs = moment(date2).diff(moment(date1), "days");
    // const diffInMs = Math.abs(date2 - date1);
    return diffInMs + 1;
  };

  React.useEffect(() => {
    Get(
      `${URLAPI.pendingrequest.GetDetails}${props.cardDetails.id}`,
      (response) => {
        console.log("Logging Review Details", response);

        if (response) {
          if (response.code === 1) {
            if (response.data) {
              setReviewDetails([...response.data]);
            }
          }
        }
      }
    );
  }, [props.cardDetails.id]);

  return (
    <div className="m-t-10" style={{ transition: "all 0.6s ease-in" }}>
      <PDFExport
        paperSize="A2"
        margin="2mm"
        fileName={props.cardDetails.title}
        ref={pdfExportComponent}
      >
        <div
          className="flex-between flex-align w-100 p-20 m-t-20 m-b-10"
          style={{
            boxShadow: "0px 2px 6px #0000000A",
            backgroundColor: "white",
          }}
        >
          <div className="sidebar-header">
            <img src={EdsgLogo} alt="logo" className="brand" width="150" />
          </div>
          <div style={{ textAlign: "center" }}>
            <b>
              {props.cardDetails?.mda ||
                Cookies.get("mdaName")?.toUpperCase() ||
                "Personal Care And Beauty Agency"}
            </b>
            {/* <p className="no-margin">7th Floor, Block C, Secretariat Building, Sapele Road,</p>  */}
            <p className="no-margin">
              {Cookies.get("mdaAddress") ||
                "7th Floor, Block C, Secretariat Building, Sapele Road"}
            </p>
          </div>
          <div>
            <img src={festac} width="40px" />
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-direction-column col-4 no-padding">
            <div className="no-padding">
              <div
                style={{
                  boxShadow: "0px 2px 6px #0000000A",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    borderBottom: "1px solid rgba(108,108,108,.4)",
                    borderTop: "1px solid rgba(108,108,108,.4)",
                  }}
                >
                  <h4
                    className=""
                    style={{
                      padding: ".8rem",
                      backgroundColor: "#f5f7f9",
                      borderBottom: "1px solid rgba(108,108,108,.4)",
                    }}
                  >
                    Training Profile
                  </h4>
                </div>
                <div style={{ padding: ".8rem" }}>
                  <p className="">
                    <b>Training Category :&nbsp;</b>
                    {props.cardDetails && props.cardDetails.learningCategory}
                  </p>
                  <p className="m-t-10">
                    <b>Training Method :&nbsp;</b>
                    {props.cardDetails && props.cardDetails.learningMethod}
                  </p>
                  <p className="m-t-10">
                    <b>Training Location :&nbsp;</b>
                    {props.cardDetails && props.cardDetails.location}
                  </p>
                  <p className="m-t-10">
                    <b>Training Duration :&nbsp;</b>
                    {props.cardDetails &&
                      props.cardDetails.startDate &&
                      props.cardDetails.endDate &&
                      `${moment(props.cardDetails.startDate).format(
                        "DD/MM/YYYY"
                      )} - ${moment(props.cardDetails.endDate).format(
                        "DD/MM/YYYY"
                      )}`}
                  </p>
                  <p className="m-t-10">
                    <b>No of Days :&nbsp;</b>
                    {
                      props.cardDetails &&
                        props.cardDetails.startDate &&
                        props.cardDetails.endDate &&
                        `${getDifferenceInDays(
                          props.cardDetails.startDate,
                          props.cardDetails.endDate
                        )} `
                      // `${moment(props.cardDetails.endDate).diff(
                      //   moment(props.cardDetails.startDate),
                      //   "days"
                      // )}`}
                    }
                  </p>
                </div>
              </div>
            </div>
            <div
              className="m-t-20"
              style={{
                boxShadow: "0px 2px 6px #0000000A",
                backgroundColor: "white",
                padding: "0",
              }}
            >
              <div
                className="flex flex-v-center"
                style={{
                  borderBottom: "1px solid rgba(108,108,108,.4)",
                  padding: "0.8rem",
                }}
              >
                <h4 className="">Cost Implication</h4>
                <p className="m-l-auto">(₦)</p>
              </div>
              <div className="flex w-100">
                <div
                  className="w-100"
                  style={{
                    color: "rgba(120,120,120,.9)",
                    textAlign: "left",

                    paddingBottom: ".5rem",
                  }}
                >
                  <div className="flex  space-between wrap pd-10 w-100">
                    <div>Training Cost</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.totalCost &&
                        `N${props.cardDetails.totalCost}`}
                    </div>
                  </div>
                  <div className="flex  wrap space-between pd-10 w-100">
                    <div>Personal Expense</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.personalExpense &&
                        `N${props.cardDetails.personalExpense}`}
                    </div>
                  </div>
                  <div className="flex  wrap space-between pd-10 w-100">
                    <div>Duty Tour Allowance</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.dtaExpense &&
                        `N${props.cardDetails.dtaExpense}`}
                    </div>
                  </div>
                  <div className="flex  wrap space-between pd-10 w-100">
                    <div>Transportation</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.transportationExpense &&
                        `N${props.cardDetails.transportationExpense}`}
                    </div>
                  </div>
                  <div className="flex  wrap space-between pd-10 w-100">
                    <div>Local Transportation</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.localTransportationExpense &&
                        `N${props.cardDetails.localTransportationExpense}`}
                    </div>
                  </div>
                  <div className="flex  wrap space-between pd-10 w-100">
                    <div>Journals/Publication</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.journalPublicationExpense &&
                        `N${props.cardDetails.journalPublicationExpense}`}
                    </div>
                  </div>
                  <div className="flex  wrap space-between pd-10 w-100">
                    <div>Subscription</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.subscriptionExpense &&
                        `N${props.cardDetails.subscriptionExpense}`}
                    </div>
                  </div>
                  <div className="flex  wrap space-between pd-10 w-100">
                    <div>Contingencies</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.contingenciesExpense &&
                        `N${props.cardDetails.contingenciesExpense}`}
                    </div>
                  </div>

                  <div
                    className="flex  wrap space-between pd-10 w-100"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    <div>Total Cost</div>
                    <div>
                      {props.cardDetails &&
                        props.cardDetails.allCost &&
                        `(NGN${props.cardDetails.allCost})`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8 pd-r-0">
            <div
              className="m-b-20"
              style={{
                boxShadow: "0px 2px 6px #0000000A",
                backgroundColor: "white",
              }}
            >
              <div>
                <div
                  style={{
                    backgroundColor: "#f5f7f9",
                  }}
                >
                  <h4
                    style={{
                      padding: "0.8rem",
                      borderTop: "1px solid rgba(108,108,108,.4)",
                      ...borderBottom,
                    }}
                  >
                    Training :&nbsp;
                    {props.cardDetails && props.cardDetails.title}
                  </h4>
                </div>
              </div>
              <div>
                <div>
                  <div className="w-100" style={{ paddingBottom: ".6rem" }}>
                    <h4
                      style={{
                        padding: ".5rem .5rem .3rem",
                      }}
                    >
                      Organizer:
                    </h4>
                    <div className="m-l-50 border-bottom-gray-1">
                      <p className="pd-b-5">
                        {props.cardDetails && props.cardDetails.organisingBody}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-100" style={{ paddingBottom: ".6rem" }}>
                    <h4
                      style={{
                        padding: "0 .5rem .3rem",
                      }}
                    >
                      From:
                    </h4>
                    <div className="m-l-50 border-bottom-gray-1">
                      <p className="pd-b-5">
                        {props.cardDetails && props.cardDetails.staffName}
                        &nbsp;(
                        {props.cardDetails && props.cardDetails.role})
                      </p>
                    </div>
                  </div>
                </div>
                {props.cardDetails && props.cardDetails.mda && (
                  <div>
                    <div className="w-100" style={{ paddingBottom: ".6rem" }}>
                      <h4
                        style={{
                          padding: "0 .5rem .3rem",
                        }}
                      >
                        MDA:
                      </h4>
                      <div className="m-l-50 border-bottom-gray-1">
                        <p className="pd-b-5">
                          {props.cardDetails && props.cardDetails.mda}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div className="w-100" style={{ paddingBottom: ".6rem" }}>
                    <h4
                      style={{
                        padding: ".5rem .5rem .3rem",
                      }}
                    >
                      Details:
                    </h4>
                    <div className="m-l-50" style={{ paddingRight: "10px" }}>
                      <p className="m-b-20">
                        {props.cardDetails && props.cardDetails.details
                          ? `${props.cardDetails.details}`
                          : "no details"}
                      </p>

                      <div className="row">
                        <div className="col-6">
                          <h4 className="underline">
                            Expected Impact on the individual
                          </h4>
                          <p className="m-t-10">
                            {props.cardDetails &&
                              props.cardDetails.impactOnindividual &&
                              `${props.cardDetails.impactOnindividual}`}
                          </p>
                        </div>
                        <div className="col-6">
                          <h4 className="underline">
                            Expected Impact on the Organisation
                          </h4>
                          <p className="m-t-10">
                            {props.cardDetails &&
                              props.cardDetails.impactOnOrganisation &&
                              `${props.cardDetails.impactOnOrganisation}`}
                          </p>
                        </div>
                      </div>
                      <div className="w-100 m-b-20">
                        <h4 className="underline m-b-10">
                          Supporting Document
                        </h4>
                        {props.cardDetails && props.cardDetails?.documentPath && (
                          <a
                            className="gray underline flex"
                            href={String(props.cardDetails?.documentPath)}
                            alt="Idea attached file"
                            target="_blank"
                            rel="noreferrer noopener"
                            download
                          >
                            Training Request Supporting Document
                          </a>
                        )}
                        {props.cardDetails &&
                          props.cardDetails?.documents?.length > 0 &&
                          props.cardDetails.documents.map((docs) => (
                            <a
                              className="gray underline flex"
                              href={String(docs.docPath)}
                              alt="Idea attached file"
                              target="_blank"
                              rel="noreferrer noopener"
                              download
                            >
                              Training Request Supporting Document
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!props.owner && props.cardDetails.status == 3 && (
              <div className="m-t-20 m-b-20">
                <Accordion
                  title={"Action"}
                  bodyType="row-list"
                  content={[
                    {
                      title: "Approve",
                      func: () => {
                        setBtnText("Approve");
                        setRequestState({
                          ...requestState,
                          approvalStatus: 1,
                          learningRequestId: props.cardDetails.id,
                        });
                        setShowCommentModal(true);
                        setSuccessMsg(
                          "Training Request Approved Successfully!"
                        );
                      },
                    },
                    {
                      title: "Decline",
                      func: () => {
                        setBtnText("Decline");
                        setRequestState({
                          ...requestState,
                          approvalStatus: 0,
                          learningRequestId: props.cardDetails.id,
                        });
                        setShowCommentModal(true);
                        setSuccessMsg(
                          "Training Request Declined Successfully!"
                        );
                      },
                    },
                  ]}
                  bodyBGColor="#fff"
                  openIcon={
                    <BsCaretDownFill
                      color="#fff"
                      fontSize="20px"
                      className="accordion__icon"
                    />
                  }
                  closeIcon={
                    <BsFillCaretUpFill
                      color="#fff"
                      fontSize="20px"
                      className="accordion__icon"
                    />
                  }
                />
              </div>
            )}
            {reviewDetails.length > 0 &&
              reviewDetails.map((detail, idx) => (
                <div
                  className="m-t-10"
                  style={{
                    boxShadow: "0px 2px 6px #0000000A",
                    backgroundColor: "white",
                    opacity: detail.status === 3 ? "0.5" : "1",
                  }}
                >
                  <div
                    className="p-10-20"
                    style={{ borderBottom: "1px solid rgba(108,108,108,.4)" }}
                  >
                    <div className="flex space-between">
                      <div
                        className="flex flex-v-center"
                        style={{ width: "40%" }}
                      >
                        <div
                          style={{
                            border: "1px solid #B2D4B2",
                            color: "#6F6F6F",
                            backgroundColor: "#C0DBC031",
                            borderRadius: "2px",
                            padding: "7px",
                          }}
                        >
                          Reviewer {idx + 1}:
                        </div>
                        <div className={`m-l-5 `}>
                          <div
                            className="flex flex-direction-column m-r-5"
                            style={{ textAlign: "right" }}
                          >
                            <h4 className="bold-text">{detail.approver}</h4>
                            <p style={{ color: "#909090" }}>{detail.role}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex space-between"
                        style={{ width: "30%" }}
                      >
                        <div
                          style={{
                            position: "relative",
                            top: "13px",
                          }}
                        >
                          In-Tray
                        </div>
                        <div
                          style={{
                            position: "relative",
                            top: "13px",
                          }}
                        >
                          Out-Tray
                        </div>
                      </div>
                      <div className="flex">
                        <div>SIGNATURE</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-10-20 flex space-between">
                    <div className="p-10-20" style={{ width: "40%" }}>
                      <h4 className="m-b-5" style={{ color: "#1C811C" }}>
                        Action/Recommendation
                      </h4>
                      <p className="m-b-10">{detail.comment || ""}</p>
                    </div>
                    <div
                      className="flex space-between"
                      style={{ width: "30%" }}
                    >
                      <div>{detail?.dateTimeIn?.substring(0, 12)}</div>

                      <div>{detail?.date?.substring(0, 12)}</div>
                    </div>
                    <div className="flex">
                      <div>
                        <img
                          style={{ width: "200px", height: "80px" }}
                          src={`data:image/png;base64, ${detail.signature64}`}
                          alt="signature"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {props.cardDetails.status === 7 && (
              <div className="m-t-10">
                <div className="w-100" style={{ alignContent: "end" }}>
                  <button
                    style={{
                      color: "rgb(67, 66, 93)",
                      backgroundColor: "rgba(239, 214, 107, 0.95)",
                      borderRadius: "50px",
                    }}
                    type="button"
                    className="btn btn-large"
                    onClick={() => setShowCompletionModal(true)}
                  >
                    Upload Certificate of Completion
                  </button>
                </div>
              </div>
            )}
            {props.cardDetails.status === 1 && (
              <div className="w-100 m-t-20">
                <div className="no-padding">
                  <div
                    style={{
                      boxShadow: "0px 2px 6px #0000000A",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{ borderBottom: "1px solid rgba(108,108,108,.4)" }}
                    >
                      <h4 className="" style={{ padding: ".8rem" }}>
                        Training Completion Certificate
                      </h4>
                    </div>
                    <div style={{ padding: ".8rem" }}>
                      <p className="">
                        <b>Certificate Name :&nbsp;</b>
                        {props.cardDetails && props.cardDetails.certification}
                      </p>
                      <img
                        className="m-t-10 w-100 p-20"
                        style={{}}
                        src={
                          `data:image/jpeg;base64, ${props.cardDetails.certificationPath}` ||
                          ""
                        }
                        alt="upload certificate..."
                      />
                      <div className="w-100 p-10-20">
                        <h4 className="m-b-10">Closing Remark:</h4>
                        <p className="m-b-20">
                          {props.cardDetails && props.cardDetails.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {showCommentModal && (
          <CommentModal
            state={requestState}
            setState={setRequestState}
            btnText={btnText}
            action={() => {
              approvalRequest();
            }}
            closeModal={() => closeModal()}
          />
        )}
        {showSuccess && (
          <div
            className="overlay flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 6px #0000000A",
            }}
          >
            <Successmodal
              action={successMsg}
              closeModal={() => {
                closeModal();
                !props.owner && props.getPendingRequestApprovalList();
              }}
            />
          </div>
        )}
        {showErrorModal && (
          <div
            className="overlay flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 6px #0000000A",
            }}
          >
            <ErrorModal action={errorMsg} closeModal={() => closeModal()} />
          </div>
        )}
        {showPictureModal && (
          <PictureModal
            closeModal={closePictureModal}
            picture={props.cardDetails.documentPath}
          />
        )}
        {showCompletionModal && (
          <CompletionFormModal
            requestId={props.cardDetails.id}
            closeModal={() => setShowCompletionModal(false)}
          />
        )}
      </PDFExport>
      {props.cardDetails.status === 1 ||
        (props.cardDetails.status === 7 && (
          <div className="mb5 flex justify-content-center m-b-20 ">
            <button
              className="btn btn w-100"
              onClick={() => {
                if (pdfExportComponent.current) {
                  pdfExportComponent.current.save();
                }
              }}
            >
              Download
            </button>
          </div>
        ))}
    </div>
  );
};
export default TrainingRequestDetails;
