import React from 'react';

const Footer = () => (
  <footer>
    <div className="content space-between flex-v-center">
      <div className="footer-inner-left">
        <p>
          {new Date().getFullYear()}
          &nbsp;Edo State Government Digital Office
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
