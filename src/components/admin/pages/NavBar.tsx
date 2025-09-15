import { BsPeopleFill } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";
import { BiSolidReport } from "react-icons/bi";

interface AdminNavBarProps {
  className?: {
    active: string;
    navItem: string;
  };
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ className = styles }) => {
  return (
    <>
      <NavLink
        to="/admin/plans"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <RiPagesLine size={30} /> Plans
      </NavLink>
      <NavLink
        to="/admin/case-workers"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <BsPeopleFill size={30} /> Case Workers
      </NavLink>
      <NavLink
        to="/admin/reports"
        className={({ isActive }) =>
          `${isActive ? className.active : ""} ${className.navItem}`
        }
      >
        <BiSolidReport size={30} /> Reports
      </NavLink>
    </>
  );
};

export default AdminNavBar;
