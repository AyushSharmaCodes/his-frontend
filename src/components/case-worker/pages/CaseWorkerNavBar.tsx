import { NavLink } from "react-router-dom";
import { MdAppRegistration } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";
import { BiSolidReport } from "react-icons/bi";
import { MdEventNote } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

import styles from "./CaseWorkerNavBar.module.css";

interface CaseWorkerNavBarProps {
  className?: {
    active: string;
    navItem: string;
  };
}

const CaseWorkerNavBar: React.FC<CaseWorkerNavBarProps> = ({
  className = styles,
}) => {
  return (
    <>
      <NavLink
        to="/user/applications"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <MdAppRegistration size={30} /> Citizen Registration (AR)
      </NavLink>
      <NavLink
        to="/user/data"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <BsCollectionFill size={30} /> Data Collection (DC)
      </NavLink>
      <NavLink
        to="/user/eligibility"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <GrValidate size={30} /> Eligibility Determination (ED)
      </NavLink>
      <NavLink
        to="/user/notice"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <MdEventNote size={30} /> Correspondence (CO)
      </NavLink>
      <NavLink
        to="/user/benefits"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <FaMoneyCheckAlt size={30} /> Benefits Issuance (BI)
      </NavLink>
      <NavLink
        to="/user/payments"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <MdPayments size={30} /> Payments Status
      </NavLink>
      <NavLink
        to="/user/reports"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <BiSolidReport size={30} /> Reports
      </NavLink>
    </>
  );
};

export default CaseWorkerNavBar;
