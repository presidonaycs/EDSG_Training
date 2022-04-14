/* eslint-disable react/destructuring-assignment */
import React from "react";

const TextInput = (props) => (
  <div className={`${props.className} form-group`}>
    <label htmlFor={props.name}>{props.label}</label>
    <input
      type={props.type || "text"}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      readOnly={props.readOnly}
      onBlur={props.onBlur}
      disabled={props.disabled}
      onKeyPress={props.onKeyPress}
      onKeyDown={props.onKeyDown}
      min={props.minDate}
      max={props.maxDate}
      required={props.required}
    />
  </div>
);

export default TextInput;
