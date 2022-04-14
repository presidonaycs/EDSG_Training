/* eslint-disable react/destructuring-assignment */
import React from "react";
// import { GoCalendar } from "react-icons/go";

const FormDateInput = (props) => (
  <div className={`${props.className} form-group form-group-search`}>
    <label htmlFor={props.name}>{props.label}</label>
    <input
      type="date"
      name={props.name}
      id={props.name}
      value={props.value}
      onChange={props.onChange}
      readOnly={props.readOnly}
      onBlur={props.onBlur}
      disabled={props.disabled}
      onKeyPress={props.onKeyPress}
      onKeyDown={props.onKeyDown}
      className="pd-r-0"
      required={props.required}
    />
    {/* <GoCalendar style={{fontSize: "20px", color: "rgba(112, 112, 112, .5)"}} /> */}
  </div>
);

export default FormDateInput;
