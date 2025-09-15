import React from "react";
import styles from "./CaseWorkerProfile.module.css";
import Button from "../../ui/Button";
import { MdDelete } from "react-icons/md";

type AssignedCase = {
  id: string;
  citizen: string;
  plan: string;
  status: "Approved" | "Pending" | "Denied";
  dueDate: string;
};

type ActivityLog = {
  date: string;
  time: string;
  description: string;
};

const assignedCases: AssignedCase[] = [
  {
    id: "2023001",
    citizen: "John Doe",
    plan: "Basic Health Plan",
    status: "Approved",
    dueDate: "2024-07-30",
  },
  {
    id: "2023002",
    citizen: "Jane Smith",
    plan: "Family Coverage",
    status: "Pending",
    dueDate: "2024-08-15",
  },
  {
    id: "2023003",
    citizen: "Robert Johnson",
    plan: "Premium Plan",
    status: "Approved",
    dueDate: "2024-09-01",
  },
  {
    id: "2023004",
    citizen: "Emily Davis",
    plan: "Dental & Vision",
    status: "Pending",
    dueDate: "2024-09-20",
  },
  {
    id: "2023005",
    citizen: "William Brown",
    plan: "Catastrophic Plan",
    status: "Denied",
    dueDate: "2024-10-05",
  },
];

const activityLogs: ActivityLog[] = [
  {
    date: "2024-07-10",
    time: "10:30 AM",
    description: "Reviewed case #2023002, awaiting additional documents.",
  },
  {
    date: "2024-07-09",
    time: "03:15 PM",
    description: "Approved health plan for John Doe (Case #2023001).",
  },
  {
    date: "2024-07-08",
    time: "11:00 AM",
    description:
      "Initial consultation call with Emily Davis regarding new application.",
  },
  {
    date: "2024-07-07",
    time: "09:45 AM",
    description: "Updated contact information for William Brown.",
  },
  {
    date: "2024-07-06",
    time: "02:00 PM",
    description: "Conducted internal training session on new policy updates.",
  },
  {
    date: "2024-07-05",
    time: "04:00 PM",
    description: "Submitted quarterly performance report.",
  },
];

const CaseWorkerProfile: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>
        Case Worker Profile: Sophia Rodriguez
      </h2>

      <div className={styles.grid}>
        {/* Personal Info */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Personal Information</h3>
          <ul className={styles.infoList}>
            <li>
              <strong>Name:</strong> Sophia Rodriguez
            </li>
            <li>
              <strong>Case Worker ID:</strong> CW-8765
            </li>
            <li>
              <strong>Email:</strong> sophia.rodriguez@his.gov
            </li>
            <li>
              <strong>Phone:</strong> (555) 123-4567
            </li>
            <li>
              <strong>Role:</strong> Senior Case Worker
            </li>
            <li>
              <strong>Status:</strong> Active
            </li>
          </ul>
        </div>

        {/* Assigned Cases */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Assigned Cases</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Citizen Name</th>
                <th>Plan Type</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {assignedCases.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td className={styles.link}>{c.citizen}</td>
                  <td>{c.plan}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        c.status === "Approved"
                          ? styles.badgeApproved
                          : c.status === "Pending"
                          ? styles.badgePending
                          : styles.badgeDenied
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>{c.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Employment Details */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Employment Details</h3>
          <ul className={styles.infoList}>
            <li>
              <strong>Hire Date:</strong> 2020-03-15
            </li>
            <li>
              <strong>Department:</strong> Enrollment & Support
            </li>
            <li>
              <strong>Supervisor:</strong> Michael Chen
            </li>
          </ul>
        </div>

        {/* Activity Log */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Activity Log</h3>
          <ul className={styles.logList}>
            {activityLogs.map((log, idx) => (
              <li key={idx}>
                <span className={styles.logDate}>
                  {log.date} – {log.time}
                </span>
                <p className={styles.logDesc}>{log.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button type="button" className={styles.deleteButton}>
        <MdDelete size={22} />
        Delete Account
      </Button>
    </div>
  );
};

export default CaseWorkerProfile;
