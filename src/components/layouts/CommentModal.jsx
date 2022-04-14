import * as React from "react";
import TextareaInput from "../inputs/TextareaInput";
import { IoMdClose } from "react-icons/io";
import LoaderSrc from "../../assets/svg/loading.svg";

const CommentModal = ({ closeModal, ...props }) => {
  const [disableBtn, setDisableBtn] = React.useState(false);

  React.useEffect(() => {
    props.setState({ ...props.state, comment: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="overlay"
      style={{
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 2px 6px #0000000A",
      }}
    >
      <div>
        <IoMdClose className="close-btn pointer" onClick={closeModal} />
        <div className="modal-box max-w-700 pd-10">
          <TextareaInput
            label={"Add Comment"}
            value={props.state && props.state.comment}
            rows={5}
            onChange={(e) => {
              props.setState({ ...props.state, comment: e.target.value });
              //   setComment(e.target.value);
            }}
          />
          <button
            className="btn btn-large p-r w-100 flex flex-v-center flex-h-center justify-content-center m-t-10"
            onClick={() => {
              setDisableBtn(true);
              props.action();
            }}
            disabled={disableBtn}
            style={{ height: "43px" }}
          >
            <p style={{ margin: "auto 15px auto" }}>{props.btnText}</p>
            {disableBtn && <img src={LoaderSrc} alt="Loading..." />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
