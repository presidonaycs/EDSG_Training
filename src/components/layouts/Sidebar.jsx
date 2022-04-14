import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { FiHelpCircle } from "react-icons/fi";

import EdsgLogo from '../../assets/images/edo-logo-250.png';

import { logout } from '../../utility/auth';

const Sidebar = ({ history, menuList }) => {
  const { location: { pathname } } = history;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="page-sidebar">
      <div className="sidebar-header">
        <img src={EdsgLogo} alt="logo" className="brand" width="150" />
      </div>

      <div className="sidebar-menu">
        <ul className="menu-items">
          <li>
            <AiOutlineHome className="icon" />
            <span onClick={handleLogout} role="presentation" className="has-sub-menu pointer">
              <span className="title">Home</span>
            </span>
          </li>
          <li>
            <FiHelpCircle className="icon" />
            <Link
              to={{ pathname: `${localStorage.getItem("api")}${localStorage.getItem("helpLink")}`}}
              target="_blank"
            >
              <span role="presentation" className="has-sub-menu pointer">
                <span className="title">User Manual</span>
              </span>
            </Link>
          </li>
          {menuList &&
            menuList.map((item) => (
              <MenuItem props={item} pathname={pathname} key={item.title} />
            ))}
          <li>
            <RiLogoutCircleLine className="icon" />
            <span onClick={handleLogout} role="presentation" className="has-sub-menu pointer">
              <span className="title">Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const MenuItem = ({
  props: {
    title, href, icon, children
  }, pathname
}) => {
  const [isShowingSub, setIsShowingSub] = useState(false);

  return (
    <>
      <li className={`${pathname === href ? 'active' : ''}`}>
        {icon}
        {children ? (
          <>
            <span onClick={() => setIsShowingSub(!isShowingSub)} role="presentation" className="has-sub-menu pointer">
              <span className="title">{title}</span>
            </span>
            {children && <IoIosArrowBack className={`${isShowingSub ? 'open' : ''} arrow`} />}
          </>
        ) : (
          <Link to={href}>
            <span className="title">{title}</span>
          </Link>
        )}
      </li>
      {children && isShowingSub && (
        <ul className={`${isShowingSub ? 'show' : ''} sub-menu`}>
          {children && children.map((sub) => (
            <li className={`${pathname === sub.href ? 'active' : ''}`} key={sub.title}>
              <Link to={sub.href}>{sub.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Sidebar;
