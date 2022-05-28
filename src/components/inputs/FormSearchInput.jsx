/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { BsSearch } from 'react-icons/bs';

const FormSearchInput = (props) => {
  // const [suggested, setSuggested] = useState([]);
  const reliefOfficers = props.searchValue && props.searchValue;

  // console.log('search input props', props);
  return (
    <div className={`${props.className} form-group form-group-search`}>
      <label htmlFor={props.name}>{props.label}</label>
      {props.isBs ? null : <BsSearch
        style={{
          color: `${!props.color ? 'black' : props.color}`,
          position: 'absolute',
          top: `${props.formState ? '20px' : '30px'}`,
        }}
      />}
      {/* {console.log('set State value in searchInput :', props.formState)} */}
      <input
        type='search'
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
        className='sfield'
        // onInput={() => searchInput(value)}
      />
      <div id='suggestions' className='suggestions'>
        {reliefOfficers &&
          reliefOfficers.map((suggestion, idx) => (
            <div
              key={idx}
              className='suggestion-item'
              onClick={() => {
                props.setState
                  ? props.setStateValue({
                      ...props.formState,
                      [props.stateName]: `${suggestion.firstName} ${suggestion.lastName}`,
                    })
                  : props.stateName(
                      // 'employeeName',
                      props.displayName,

                      props.displayType === 'beneficiary'
                        ? `${suggestion.beneficiary}`
                        : props.displayType === 'names'
                        ? `${suggestion.firstName} ${suggestion.lastName}`
                        : `${suggestion.name}`,
                    );
                props.setSuggestions(props.dropDownName, []);
                props.selectedId && props.selectedId(Number(suggestion.id));

                props.selectReliefOfficer &&
                  props.selectReliefOfficer(props.stateValue, Number(suggestion.id));
              }}>
              {/* {`${suggestion.firstName} ${suggestion.lastName}`} */}
              {props.displayType === 'beneficiary'
                ? `${suggestion.beneficiary}`
                : props.displayType === 'names'
                ? `${suggestion.firstName} ${suggestion.lastName}`
                : `${suggestion.name}`}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FormSearchInput;
