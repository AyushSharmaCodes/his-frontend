import { useState } from "react";
import styles from "./NoticeDashboard.module.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const NoticeDashboard: React.FC = () => {
  const [search, setSearch] = useState("");

  // Dummy data (replace with API call later)
  const notices = [
    {
      id: "N001",
      citizenName: "John Doe",
      plan: "SNAP",
      type: "Eligibility Approval",
      date: "2025-09-10",
      status: "Sent",
    },
    {
      id: "N002",
      citizenName: "Mary Smith",
      plan: "Medicaid",
      type: "Eligibility Denial",
      date: "2025-09-11",
      status: "Pending",
    },
    {
      id: "N003",
      citizenName: "Raj Patel",
      plan: "QHP",
      type: "Renewal Reminder",
      date: "2025-09-12",
      status: "Sent",
    },
  ];

  const filtered = notices.filter(
    (n) =>
      n.citizenName.toLowerCase().includes(search.toLowerCase()) ||
      n.plan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Correspondence - Notices</h2>

      <div className={styles.actions}>
        <Input
          type="text"
          placeholder="Search by citizen or plan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchBox}
        />
        <Button className={styles.newBtn} to="/user/notice/generate">
          + Generate New Notice
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.tableContent}>
          <thead>
            <tr>
              <th>Notice ID</th>
              <th>Citizen Name</th>
              <th>Plan</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.citizenName}</td>
                <td>{n.plan}</td>
                <td>{n.type}</td>
                <td>{n.date}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      n.status === "Sent"
                        ? styles.statusSent
                        : n.status === "Pending"
                        ? styles.statusPending
                        : ""
                    }`}
                  >
                    {n.status}
                  </span>
                </td>
                <td>
                  <Button className={styles.viewBtn}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticeDashboard;
