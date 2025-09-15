// src/modules/reports/pages/ApprovedCitizensReport.tsx
import React, { useState } from "react";
import styles from "../styles/ApprovedCitizensReport.module.css";
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
  caseworker: string;
  approvalDate: string;
}

const ApprovedCitizensReport: React.FC = () => {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [caseworkerFilter, setCaseworkerFilter] = useState("");

  // Dummy data
  const citizens: Citizen[] = [
    {
      id: "CIT-1001",
      name: "Ramesh Kumar",
      plan: "SNAP",
      caseworker: "Caseworker A",
      approvalDate: "2025-09-10",
    },
    {
      id: "CIT-1002",
      name: "Mary Smith",
      plan: "Medicaid",
      caseworker: "Caseworker B",
      approvalDate: "2025-09-11",
    },
  ];

  const filtered = citizens.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (planFilter ? c.plan === planFilter : true) &&
      (caseworkerFilter ? c.caseworker === caseworkerFilter : true)
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Approved Citizens Report</h2>
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
        <Select onValueChange={(v: string) => setPlanFilter(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            {["", "SNAP", "CCAP", "Medicaid", "Medicare"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
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
              <th>Caseworker</th>
              <th>Approval Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.plan}</td>
                <td>{c.caseworker}</td>
                <td>{c.approvalDate}</td>
                <td>
                  <Button
                    to={`/user/reports/beneficiaries/${c.id}`}
                    className={styles.viewBtn}
                  >
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

export default ApprovedCitizensReport;
