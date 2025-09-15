import React from "react";
import styles from "./CaseWorkerDashboard.module.css";
import { FaPen, FaSearch, FaEye } from "react-icons/fa";

const CaseWorkerDashboard: React.FC = () => {
  const activities = [
    {
      id: "HIS-00123",
      applicant: "John Doe",
      activity: "Submitted new application",
      date: "2024-07-28",
      status: "Pending Review",
    },
    {
      id: "HIS-00122",
      applicant: "Jane Smith",
      activity: "Document verification complete",
      date: "2024-07-27",
      status: "Approved",
    },
    {
      id: "HIS-00121",
      applicant: "Robert Johnson",
      activity: "Residency check failed",
      date: "2024-07-26",
      status: "Rejected",
    },
    {
      id: "HIS-00120",
      applicant: "Emily White",
      activity: "Updated contact information",
      date: "2024-07-26",
      status: "Approved",
    },
    {
      id: "HIS-00119",
      applicant: "Michael Brown",
      activity: "Application created (draft)",
      date: "2024-07-25",
      status: "Pending Review",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome, Case Worker!</h1>
        <p className={styles.subtitle}>
          Your dashboard provides quick access to essential tasks and insights.
        </p>
      </header>

      {/* Quick Access */}
      <section className={styles.quickAccess}>
        <h2 className={styles.sectionTitle}>Quick Access</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <FaPen className={styles.cardIcon} />
            <h3>Application Registration</h3>
            <p>Initiate new health insurance applications for citizens.</p>
            <a href="#" className={styles.cardLink}>
              Learn More →
            </a>
          </div>

          <div className={styles.card}>
            <FaSearch className={styles.cardIcon} />
            <h3>Review Citizen Data</h3>
            <p>Verify collected citizen information and documents.</p>
            <a href="#" className={styles.cardLink}>
              Learn More →
            </a>
          </div>

          <div className={styles.card}>
            <FaEye className={styles.cardIcon} />
            <h3>View Case Status</h3>
            <p>Track the progress and status of all active applications.</p>
            <a href="#" className={styles.cardLink}>
              Learn More →
            </a>
          </div>
        </div>
      </section>

      {/* Recent Case Activities */}
      <section className={styles.activities}>
        <h2 className={styles.sectionTitle}>Recent Case Activities</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Applicant</th>
                <th>Activity</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.applicant}</td>
                  <td>{a.activity}</td>
                  <td>{a.date}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        a.status === "Approved"
                          ? styles.badgeApproved
                          : a.status === "Rejected"
                          ? styles.badgeRejected
                          : styles.badgePending
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CaseWorkerDashboard;
