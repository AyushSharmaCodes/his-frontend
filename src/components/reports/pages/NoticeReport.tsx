// src/modules/reports/pages/NoticeReport.tsx
import React, { useState } from "react";
import styles from "../styles/NoticeReport.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface Notice {
  id: string;
  citizenName: string;
  type: string;
  date: string;
  status: "Delivered" | "Failed" | "Pending";
}

const NoticeReport: React.FC = () => {
  const [notices] = useState<Notice[]>([
    {
      id: "N-1001",
      citizenName: "Alice Smith",
      type: "Eligibility Approval",
      date: "2025-09-10",
      status: "Delivered",
    },
    {
      id: "N-1002",
      citizenName: "John Doe",
      type: "Plan Rejection",
      date: "2025-09-11",
      status: "Failed",
    },
    {
      id: "N-1003",
      citizenName: "Mary Johnson",
      type: "Renewal Reminder",
      date: "2025-09-12",
      status: "Pending",
    },
    {
      id: "N-1004",
      citizenName: "Raj Patel",
      type: "Payment Status",
      date: "2025-09-12",
      status: "Delivered",
    },
  ]);

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(notices.length / pageSize);
  const paginated = notices.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>Notice Report</h2>
        <Button className={styles.backBtn} to="/user/reports">
          Back to Dashboard
        </Button>
      </hgroup>

      {/* Filters */}
      <div className={styles.filterBox}>
        <Input
          type="text"
          placeholder="Search by Citizen or Notice ID"
          className={styles.Input}
        />
        <Select onValueChange={(v: string) => v}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {["", "Delivered", "Failed", "Pending"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className={styles.applyBtn}>Apply</Button>
        <Button className={styles.clearBtn}>Clear</Button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Notice ID</th>
              <th>Citizen Name</th>
              <th>Notice Type</th>
              <th>Date of Issue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.citizenName}</td>
                <td>{n.type}</td>
                <td>{n.date}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[n.status.toLowerCase()]
                    }`}
                  >
                    {n.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <Button
          className={styles.pageBtn}
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          className={styles.pageBtn}
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NoticeReport;
