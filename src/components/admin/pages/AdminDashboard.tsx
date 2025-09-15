import Card from "../../ui/Card";
import Button from "../../ui/Button";
import styles from "./AdminDashBoard.module.css";

import { MdOutlineEdit } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";

const Dashboard: React.FC = () => {
  return (
    <>
      <article>
        <div className={styles.cardsContainer}>
          <Card
            title="Card Title"
            content="12"
            icon={<MdSpaceDashboard />}
            style={{ backgroundColor: "#8bc2e3ff", color: "#256d91ff" }}
          />
          <Card
            title="Card Title"
            content="34"
            icon={<RiPagesLine />}
            style={{ backgroundColor: "#6fd48dff", color: "#256d34ff" }}
          />
          <Card
            title="Card Title"
            content="56"
            icon={<BsPeopleFill />}
            style={{ backgroundColor: "#d683d5ff", color: "#6b256aff" }}
          />
          <Card
            title="Card Title"
            content="78"
            icon={<TbReportSearch />}
            style={{ backgroundColor: "#f0a3a0ff", color: "#911c1fff" }}
          />
        </div>
      </article>
      <article className={styles.lowerSection}>
        <div className={styles.actionsContainer}>
          <p>Quick Actions</p>
          <Button type="button" onClick={() => alert("Add New Plan")}>
            + Add New Plan
          </Button>
          <Button
            type="button"
            icon={<MdOutlineEdit />}
            onClick={() => alert("Manage Case Workers")}
            className={styles["action-button"]}
          >
            Manage Case Workers
          </Button>
        </div>
        <div className={styles.activityContainer}>
          <p>Recent Activity</p>
          <table className={styles.activityTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-10-01</td>
                <td>Created new insurance plan</td>
                <td>Admin User</td>
              </tr>
              <tr>
                <td>2024-10-02</td>
                <td>Updated case worker profile</td>
                <td>Admin User</td>
              </tr>
              <tr>
                <td>2024-10-03</td>
                <td>Generated monthly report</td>
                <td>Admin User</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
};

export default Dashboard;
