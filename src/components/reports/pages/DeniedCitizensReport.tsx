// src/modules/reports/pages/DeniedCitizensReport.tsx
import React, { useState } from "react";
import styles from "../styles/DeniedCitizensReport.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { RiResetRightLine } from "react-icons/ri";

interface Citizen {
  id: string;
  name: string;
  plan: string;
  denialReason: string;
  denialDate: string;
}

const DeniedCitizensReport: React.FC = () => {
  const [search, setSearch] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");

  // Dummy data
  const citizens: Citizen[] = [
    {
      id: "CIT-2001",
      name: "John Doe",
      plan: "SNAP",
      denialReason: "Income exceeds threshold",
      denialDate: "2025-09-09",
    },
    {
      id: "CIT-2002",
      name: "Alice Brown",
      plan: "Medicaid",
      denialReason: "Not NJ Resident",
      denialDate: "2025-09-08",
    },
  ];

  const filtered = citizens.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (reasonFilter ? c.denialReason === reasonFilter : true)
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Denied Citizens Report</h2>
        <Button to="/user/reports" className={styles.backBtn}>
          ← Back to Reports Dashboard
        </Button>
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        <Input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select onValueChange={(v: string) => setReasonFilter(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Reason" />
          </SelectTrigger>
          <SelectContent>
            {["", "Income exceeds threshold", "Not NJ Resident"].map(
              (status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <Button className={styles["reset-btn"]}>
          <RiResetRightLine />
        </Button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Citizen ID</th>
              <th>Name</th>
              <th>Plan</th>
              <th>Denial Reason</th>
              <th>Denial Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.plan}</td>
                <td>{c.denialReason}</td>
                <td>{c.denialDate}</td>
                <td>
                  <Button to={`/citizen/${c.id}`} className={styles.viewBtn}>
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeniedCitizensReport;
