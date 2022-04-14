/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';

import notification from '../../utility/notification';
import { logout } from '../../utility/auth';

const SessionHOC = (ProtectedComponent) => class AutoLogout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      warningTime: 1000 * 60 * 2,
      signoutTime: 1000 * 60 * 3
    };
  }

  componentDidMount() {
    const events = [
      'load',
      'mousedown',
      'mousemove',
      'click',
      'scroll',
      'keypress'
    ];

    events.forEach((event) => {
      window.addEventListener(event, this.resetTimeout);
    });

    this.setTimeout();
  }

  componentWillUnmount() {
    const events = [
      'load',
      'mousedown',
      'mousemove',
      'click',
      'scroll',
      'keypress'
    ];

    events.forEach((event) => {
      window.removeEventListener(event, this.resetTimeout);
    });
    clearTimeout(this.warnTimeout);
    clearTimeout(this.logoutTimeout);
  }

  clearTimeoutFunc = () => {
    if (this.warnTimeout) {
      clearTimeout(this.warnTimeout);
    }
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
    }
  };

  setTimeout = () => {
    const { warningTime, signoutTime } = this.state;
    this.warnTimeout = setTimeout(this.warn, warningTime);
    this.logoutTimeout = setTimeout(() => logout(), signoutTime);
  };

  resetTimeout = () => {
    this.clearTimeoutFunc();
    this.setTimeout();
  };

  warn = () => {
    notification({
      title: 'SESSION TIMEOUT WARNING',
      message: 'Due to inactivity on the portal, you will be logged out automatically in the next 5 minutes. To avoid being logged out, do something on the portal.',
      type: 'warning'
    });
  };

  render() {
    return (
      <>
        <ProtectedComponent {...this.props} />
      </>
    );
  }
};

export default SessionHOC;
