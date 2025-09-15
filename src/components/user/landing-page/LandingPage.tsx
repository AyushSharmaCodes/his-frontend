import styles from "./LandingPage.module.css";

import logo from "../../../assets/HIS_Logo_Color.png";
import userProfilePic from "../../../assets/user_profile.jpg";

import { MdSettings, MdSpaceDashboard } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import AdminNavBar from "../../admin/pages/NavBar";
import CaseWorkerNavBar from "../../case-worker/pages/CaseWorkerNavBar";

const LandingPage: React.FC = () => {
  const location = useLocation();

  // Basic role-based target resolution
  const role = (localStorage.getItem("role") || "").toLowerCase();
  const isUser = role === "user" || role === "case_worker";
  const dashboardPath = isUser ? "/user/dashboard" : "/admin/dashboard";
  const name = isUser ? "Case-Worker" : "Admin";
  const profilePath = isUser ? "/user/profile" : "/admin/profile";

  // Determine page title based on route
  let pageTitle = "Dashboard";
  if (location.pathname.includes("/admin/plans")) pageTitle = "Plans";
  else if (location.pathname.includes("/admin/case-workers"))
    pageTitle = "Case Workers";
  else if (location.pathname.includes("/admin/reports")) pageTitle = "Reports";
  else if (location.pathname.includes("/admin/settings"))
    pageTitle = "Settings";

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <aside className={styles.sidebar}>
        <hgroup className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <span className={styles.logoText}>HIS ({name})</span>
        </hgroup>
        <hr />
        <nav className={styles.nav}>
          <NavLink
            to={dashboardPath}
            className={({ isActive }) =>
              `${isActive ? styles.active : ""} ${styles.navItem}`
            }
          >
            <MdSpaceDashboard size={30} /> Dashboard
          </NavLink>
          {isUser ? (
            <CaseWorkerNavBar
              className={{ active: styles.active, navItem: styles.navItem }}
            />
          ) : (
            <AdminNavBar
              className={{ active: styles.active, navItem: styles.navItem }}
            />
          )}
        </nav>
        <hr />
        <footer className={styles.footer}>
          <figure className={styles.userProfile}>
            <img
              src={userProfilePic}
              alt="User Profile"
              className={styles.userImage}
            />
            <p className={styles.userInfo}>
              <span className={styles.userName}>User</span>
              <NavLink to={profilePath} className={styles.viewProfileLink}>
                View Profile
              </NavLink>
            </p>
          </figure>
        </footer>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <hgroup className={styles.mainHeader}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <div className={styles["user-control"]}>
            <IoNotificationsOutline size={28} className={styles.icon} />
            <div className={styles.dropdown}>
              <MdSettings size={28} className={styles.icon} />
              <div className={styles["dropdown-menu"]}>
                <NavLink to="/admin/settings">Settings</NavLink>
                <NavLink
                  to="/log-out"
                  onClick={() => {
                    try {
                      localStorage.removeItem("role");
                    } catch {}
                  }}
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </hgroup>
        <section className={styles.contentArea}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
