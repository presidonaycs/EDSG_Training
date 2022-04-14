/* eslint-disable react/destructuring-assignment */
import React from "react";

const SelectInput = (props) => {
  const options =
    props.options &&
    [{ name: "Select item", value: "", id: 0 }, ...props.options].map(
      (option) =>
        typeof option === "object" ? (
          <option
            // onClick={() => {
            //   option.id !== 0 && console.log("option id", option.id);
            //   //  option.id !== 0 && props.selectOption(id);
            // }}
            id={option.id ? option.id : null}
            value={
              option.value &&
              option.value.toString().toLowerCase() === "select item..."
                ? ""
                : option.value
            }
            key={option.name}
          >
            {option.name}
          </option>
        ) : (
          <option
            value={
              option && option.toString().toLowerCase() === "select item..."
                ? ""
                : option
            }
            key={option}
          >
            {option}
          </option>
        )
    );
  return (
    <div className={`${props.className} form-group`}>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
      >
        {options}
      </select>
    </div>
  );
};

export default SelectInput;
