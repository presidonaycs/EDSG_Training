/* eslint-disable react/destructuring-assignment */
import React from "react";

const TextareaInput = (props) => (
  <div className={`${props.className} form-group`}>
    <label htmlFor={props.name}>{props.label}</label>
    <textarea
      name={props.name}
      id={props.name}
      value={props.value}
      rows={props.rows}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      disabled={props.disabled}
      onKeyPress={props.onKeyPress}
      onKeyDown={props.onKeyDown}
    />
  </div>
);

export default TextareaInput;
