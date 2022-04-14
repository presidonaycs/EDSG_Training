/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Cookies from "js-cookie";

import { RiBarChartFill } from "react-icons/ri";
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { IoIosSettings } from "react-icons/io";
import { BsPerson, BsKanban } from "react-icons/bs";
import { ImFileText } from "react-icons/im";

const sidebarMenu = () => {
  const fullName = Cookies.get('fullname');

  console.log('Full Name: ', fullName);

  const menu = [];

  menu.push({
    title: "Dashboard",
    href: "/training-manager",
    icon: <RiBarChartFill className="icon" />,
  });
  menu.push({
    title: "Request Training",
    icon: <BsPerson className="icon" />,
    href: "/training-manager/request",
  });
  menu.push({
    title: "Approved Training",
    icon: <FaRegCheckCircle className="icon" />,
    href: "/training-manager/approved-request",
  });
  menu.push({
    title: "Declined Training",
    icon: <ImCancelCircle className="icon" />,
    href: "/training-manager/declined-request",
  });
  menu.push({
    title: "Completed Training",
    icon: <BsKanban className="icon" />,
    href: "/training-manager/completed",
  });
  menu.push({
    title: "Training Approval",
    icon: <ImFileText className="icon" />,
    href: "/training-manager/approval",
  });
  (fullName === 'EdoGov Admin' || fullName === 'Edo Gov Admin') && menu.push({
    title: "Setup",
    icon: <IoIosSettings className="icon" />,
    children: [
      {
        title: "Training Category",
        href: "/training-manager/category"
      },
      {
        title: "Training Methods",
        href: "/training-manager/method",
      },
      {
        title: "Training Approver",
        href: "/training-manager/approver",
      },
    ],
  });

  return menu;
};

export default sidebarMenu;
