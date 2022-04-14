import React from "react";

import PortalRoutes from "../routes/PortalRoutes";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import sidebarMenu from "../config/sidebarMenu";

function UserPortal(props) {
  const { history } = props;

  return (
    <div className="container">
      <Sidebar history={history} menuList={sidebarMenu()} />
      <div className="portal">
        {/* <Header navList={['Home', 'Notification', 'Set Reminder']} /> */}
        <Header />
        <div className="content main-content">
          <PortalRoutes />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserPortal;
