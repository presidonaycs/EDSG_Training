import axios from 'axios';

export const getLocation = async (pos) => fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${process.env.REACT_APP_G_LOCATION_API_KEY}`)
  .then((response) => response.json())
  .then((data) => data);

export const getLocation2 = async (pos) => {
  const options = {
    url: 'http://18.225.15.178/services/api/userlocations',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: pos
  };
  console.log(options);
  return axios(options)
    .then((res) => res, (err) => err.response);
};

export const uploadDocument = (payload) => {
  const options = {
    url: 'https://edogoverp.com/services/api/documents/training',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: payload
  };
  console.log(options);
  return axios(options)
    .then((res) => res, (err) => err.response);
};

export const getProfilePicture = (email) => {
  const options = {
    url: `https://edogoverp.com/services/api/emails?email=${email}`,
    headers: { 'Content-Type': 'application/json' }
  };
  console.log(options);
  return axios(options)
    .then((res) => res, (err) => err.response);
};
