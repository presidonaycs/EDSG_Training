/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

const FormSearchInput = (props) => {
  // const [suggested, setSuggested] = useState([]);
  const reliefOfficers = props.searchValue && props.searchValue;
  // const reliefOfficers = [
  //   { name: "USA" },
  //   { name: "India" },
  //   { name: "Argentina" },
  //   { name: "Armenia" },
  //   { name: "UK" },
  //   { name: "USA-was" },
  //   { name: "Canada" },
  //   { name: "Califonia" },
  // ];

  // const searchInput = document.querySelector(`.sfield`);

  // const input =
  //   props.formState && props.formState[props.stateName].toLowerCase();
  // React.useEffect(() => {
  //   input && props.setSuggestions([]);
  // }, [input]);

  // const suggestedLenght = suggested.length;

  // useEffect(() => {
  //   input &&
  //     setSuggested(
  //       reliefOfficers.filter((item) => {
  //         return (
  //           (item.firstName &&
  //             item.firstName.toLowerCase().includes(input.toLowerCase())) ||
  //           (item.lastName &&
  //             item.lastName.toLowerCase().includes(input.toLowerCase()))
  //         );
  //       })
  //     );

  //   return () => {
  //     setSuggested([]);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [input]);

  // useEffect(() => {
  //   input &&
  //     suggestedLenght === 1 &&
  //     input === suggested[0].name.toLowerCase() &&
  //     setSuggested([]);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [suggestedLenght]);

  return (
    <div className={`${props.className} form-group form-group-search`}>
      <label htmlFor={props.name}>{props.label}</label>
      <BsSearch
        style={{
          color: `${!props.color ? "black" : props.color}`,
          position: "absolute",
          top: `${props.formState ? "20px" : "30px"}`,
        }}
      />
      {console.log("set State value in searchInput :", props.formState)}
      <input
        type="search"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        readOnly={props.readOnly}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        disabled={props.disabled}
        onKeyPress={props.onKeyPress}
        onKeyDown={props.onKeyDown}
        required={props.required}
        className="sfield"
        // onInput={() => searchInput(value)}
      />
      <div id="suggestions" className="suggestions">
        {reliefOfficers &&
          reliefOfficers.map((suggestion, idx) => (
            <div
              key={idx}
              className="suggestion-item"
              onClick={() => {
                props.setStateValue({
                  ...props.formState,
                  [props.stateName]: `${suggestion.firstName} ${suggestion.lastName}`,
                });
                props.setSuggestions([]);
                props.selectedId && props.selectedId(Number(suggestion.id));
                props.selectReliefOfficer &&
                  props.selectReliefOfficer &&
                  props.selectReliefOfficer(Number(suggestion.id));
              }}
            >
              {`${suggestion.firstName} ${suggestion.lastName}`}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FormSearchInput;
