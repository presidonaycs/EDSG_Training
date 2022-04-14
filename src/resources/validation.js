import React from "react";

export function isEmail(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
}



export function validateNumber(number) {

  const re = /^\d+(\.\d+)?$/;
  if (number === '' && re.test(number)) {
    return number;
  }
  else {
    return number.substring(0, number.length - 1);
  }
}

export function validateDecimal(number) {

  const re = /^\d+(\.\d+)?$/;
  if (number === '' || re.test(number)) {
    return number;
  }
  else {
    return number.substring(0, number.length - 1);
  }
}


export default { isEmail, validateNumber, validateDecimal };
