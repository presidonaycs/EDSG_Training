/* eslint-disable react/destructuring-assignment */
import React from 'react';

import '../../assets/css/select-search.css';

import SelectSearch from 'react-select-search';

const AutoComplete = ({
  className, name, label, options, onChange,
  value, getOptions = () => {}, multiple
}) => (
  <div className={`${className || ''} form-group`}>
    <label htmlFor={name}>
      {label}
    </label>
    <SelectSearch
      closeOnSelect
      printOptions="on-focus"
      search
      multiple={multiple}
      value={value}
      placeholder="..."
      options={options || []}
      getOptions={options && options.length > 0 ? null : getOptions}
      onChange={onChange}
    />
  </div>
);

export default AutoComplete;
