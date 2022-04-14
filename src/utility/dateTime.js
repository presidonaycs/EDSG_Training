import moment from 'moment-timezone';

const appendLeadZero = (val) => (Number(val) > 9 ? val : `0${val}`);

const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'April',
  'May', 'June', 'July', 'Aug',
  'Sept', 'Oct', 'Nov', 'Dec'
];

/**
 * recieve a date value and return true if the date is today. Otherwise, false.
 * @param {String} date
 * @returns {Boolean}
 */
export const isToday = (date) => {
  const theDate = new Date(date);
  const today = new Date();
  return today.setHours(0, 0, 0, 0) === theDate.setHours(0, 0, 0, 0);
};

/**
 * recieve a date-time string and return date
 * @param {String} dateString
 * @returns {String} Format: Tues, 24 Sept 2019
 */
export const getDate = (dateString) => {
  const date = new Date(dateString);

  return `${date.getDate()}-${MONTHS[date.getMonth()]}-${date.getFullYear()}`;
};

export const getTime = (dateString) => {
  const date = new Date(dateString);

  return `${date.toLocaleString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`;
};

export const getCurrentDateTime = (dateObj) => {
  const date = new Date(dateObj);
  const day = isToday(date) ? 'Today'
    : `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

  return `${day}
  ${date.toLocaleString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`;
};

export const getDayPeriod = (date = new Date()) => {
  const d = new Date(date);

  if (d.getHours() < 12) return 'Morning';
  if (d.getHours() > 11 && d.getHours() < 16) return 'Afternoon';
  return 'Evening';
};

export const formatDateforPicker = (date, format = null) => {
  const d = new Date(date);
  if (format) {
    return moment(date, format).format('YYYY-MM-DD');
  }
  return `${d.getFullYear()}-${appendLeadZero(d.getMonth() + 1)}-${appendLeadZero(d.getDate())}`;
};

export const formatSimpleDate = (date) => {
  const d = new Date(date);
  return `${appendLeadZero(d.getDate())}/${appendLeadZero(d.getMonth() + 1)}/${d.getFullYear()}`;
};

export const getDaysFromDate = (date) => {
  const today = moment().format('YYYY-MM-DD');
  return moment(date, 'YYYY-MM-DD').diff(today, 'days');
};

export const formatTimeFromNow = (date) => moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow();

export const formatDateTime = (date) => {
  if (!date) return null;

  if (date.match(/\d{2}\/\d{2}\/\d{4}/)) {
    return moment.tz(date, 'MM/DD/YYYY', 'Africa/Lagos').format('DD:MM:YYYY / h:mm A');
  } if (date.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+/)) {
    return moment.tz(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Africa/Lagos').format('DD:MM:YYYY / h:mm A');
  } if (date.match(/\d{4}-\d{2}-\d{2}/)) {
    return moment.tz(date, 'YYYY-MM-DD', 'Africa/Lagos').format('DD:MM:YYYY / h:mm A');
  } return null;
};

export const formatTime = (date) => {
  if (!date) return null;

  if (date.match(/\d{2}\/\d{2}\/\d{4}/)) {
    return moment.tz(date, 'MM/DD/YYYY', 'Africa/Lagos').format('hh:mma');
  } if (date.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+/)) {
    return moment.tz(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Africa/Lagos').format('hh:mma');
  } if (date.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
    return moment.tz(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Africa/Lagos').format('hh:mma');
  } if (date.match(/\d{4}-\d{2}-\d{2}/)) {
    return moment.tz(date, 'YYYY-MM-DD', 'Africa/Lagos').format('hh:mma');
  }
  return null;
};
