import * as React from "react";

const height = "15px";
const width = "15px";

const CheckboxInput = (props) => {
  return (
    <div className={`${props.className} form-group flex flex-v-center`}>
      <input
        type="checkbox"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        readOnly={props.readOnly}
        onBlur={props.onBlur}
        disabled={props.disabled}
        onKeyPress={props.onKeyPress}
        onKeyDown={props.onKeyDown}
        style={{
          height: `${!props.height ? height : props.height}`,
          width: `${!props.width ? width : props.width}`,
          margin: 0,
          ...props.overrideStyles,
        }}
        checked={props.value}
      />
      <label
        htmlFor={props.name}
        style={{
          margin: `${
            !props.labelMargin ? "2px  0px 0px 7px" : props.labelMargin
          }`,
        }}
      >
        {props.label}
      </label>
    </div>
  );
};

export default CheckboxInput;
