import React, { useState } from "react";
import styles from "../styles/SystemAuditReport.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface AuditLog {
  id: string;
  user: string;
  role: "Admin" | "Caseworker";
  action: string;
  timestamp: string;
  status: "Success" | "Failed" | "Suspicious";
}

const SystemAuditReport: React.FC = () => {
  // Dummy audit logs
  const logs: AuditLog[] = [
    {
      id: "A001",
      user: "admin01",
      role: "Admin",
      action: "Logged in",
      timestamp: "2025-09-13 09:10 AM",
      status: "Success",
    },
    {
      id: "A002",
      user: "cw-john",
      role: "Caseworker",
      action: "Generated Notice",
      timestamp: "2025-09-13 09:45 AM",
      status: "Success",
    },
    {
      id: "A003",
      user: "cw-jane",
      role: "Caseworker",
      action: "Issued Benefit",
      timestamp: "2025-09-13 10:15 AM",
      status: "Failed",
    },
    {
      id: "A004",
      user: "unknown-ip",
      role: "Admin",
      action: "Suspicious login attempt",
      timestamp: "2025-09-13 10:40 AM",
      status: "Suspicious",
    },
  ];

  // Pagination
  // const [page, setPage] = useState(1);
  // const pageSize = 8;
  // const paginatedLogs = logs.slice((page - 1) * pageSize, page * pageSize);
  // const totalPages = Math.ceil(logs.length / pageSize);

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const paginatedLogs = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>System Audit Report</h2>
        <Button className={styles.backBtn} to="/user/reports">
          Back to Dashboard
        </Button>
      </hgroup>

      {/* 🔹 Filter/Search */}
      <div className={styles.filterBox}>
        <Input
          type="text"
          placeholder="Search by user or action..."
          className={styles.Input}
        />
        <Select onValueChange={(v: string) => v}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {["", "Success", "Failed", "Suspicious"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className={styles.applyBtn}>Apply</Button>
        <Button className={styles.clearBtn}>Clear</Button>
      </div>

      {/* 🔹 Audit Log Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>User</th>
              <th>Role</th>
              <th>Action</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.user}</td>
                <td>{log.role}</td>
                <td>{log.action}</td>
                <td>{log.timestamp}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[log.status.toLowerCase()]
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      <div className={styles.pagination}>
        <Button
          className={styles.pageBtn}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className={styles.pageBtn}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SystemAuditReport;
