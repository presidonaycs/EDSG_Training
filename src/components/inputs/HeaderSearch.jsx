/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { BsSearch } from 'react-icons/bs';

const HeaderSearch = (props) => (
  <div className={`${props.className ? props.className : ''} flex flex-v-center search-box`}>
    <BsSearch />
    <input
      type="search"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      placeholder={props.placeholder || 'Search...'}
    />
  </div>
);

export default HeaderSearch;
