import * as React from "react";
import { HiOutlineUpload } from "react-icons/hi";

import { FileUpload } from "../../utility/fetch";

const UploadButton = (props) => {
  const [file, setFile] = React.useState("");
  const [filename, setFilename] = React.useState("Choose File");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    const data = new FormData();
    // data.append("myFile", e.target.files[0], e.target.files[0].name);
    data.append("files", e.target.files[0]);

    FileUpload(FormData, (data) => {
      console.log("file upload response", data);
    });
  };

  return (
    <div className={`w-100 ${props.className}`}>
      <input type="file" id="file" onChange={onChange} />
      <label
        className="flex space-between"
        htmlFor="file"
        id="file-label"
        style={{
          display: "inline-block",
          color: props.color || "#43425D",
          backgroundColor: props.bgColor || "#EFD66BF2",
          padding: props.padding || "6px 0",
          width: props.width || "75%",
          borderRadius: props.borderRadius || "50px",
        }}
      >
        {props.icon || (
          <HiOutlineUpload
            color={props.iconColor || "#1C811C"}
            fontSize={props.iconSize || "20px"}
            style={{ marginLeft: "10px" }}
          />
        )}
        <span className="mx-auto m-t-auto">
          {props.btnText || "Upload Document(s)"}
        </span>
      </label>
    </div>
  );
};

export default UploadButton;
