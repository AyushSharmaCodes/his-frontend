import React, { useState } from "react";
import styles from "./EligibilityDashboard.module.css";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Label } from "../../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";

type Application = {
  id: string;
  citizenName: string;
  plan: string;
  submissionDate: string;
  status: "Pending" | "Approved" | "Denied";
};

const EligibilityDashboard: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [search, setSearch] = useState("");

  const applications: Application[] = [
    {
      id: "APP-1001",
      citizenName: "John Doe",
      plan: "SNAP",
      submissionDate: "2024-08-10",
      status: "Pending",
    },
    {
      id: "APP-1002",
      citizenName: "Jane Smith",
      plan: "Medicaid",
      submissionDate: "2024-08-08",
      status: "Approved",
    },
    {
      id: "APP-1003",
      citizenName: "Robert Johnson",
      plan: "QHP",
      submissionDate: "2024-08-05",
      status: "Denied",
    },
    {
      id: "APP-1004",
      citizenName: "Emily White",
      plan: "CCAP",
      submissionDate: "2024-08-02",
      status: "Pending",
    },
  ];

  const filteredApplications = applications.filter((app) => {
    return (
      (statusFilter === "" || app.status === statusFilter) &&
      (planFilter === "" || app.plan === planFilter) &&
      (search === "" ||
        app.citizenName.toLowerCase().includes(search.toLowerCase()) ||
        app.id.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Eligibility Determination</h1>
        <p className={styles.breadcrumb}>Home / Eligibility Determination</p>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterItem}>
          <Label>Search</Label>
          <Input
            placeholder="Search by Citizen ID, Name, SSN, Application ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterItem}>
          <Label>Status</Label>
          <Select
            onValueChange={(v) => setStatusFilter(v)}
            value={statusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Denied">Denied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={styles.filterItem}>
          <Label>Plan</Label>
          <Select onValueChange={(v) => setPlanFilter(v)} value={planFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Plans" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="SNAP">SNAP</SelectItem>
              <SelectItem value="CCAP">CCAP</SelectItem>
              <SelectItem value="Medicaid">Medicaid</SelectItem>
              <SelectItem value="Medicare">Medicare</SelectItem>
              <SelectItem value="QHP">QHP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {/* Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Citizen Name</th>
              <th>Application ID</th>
              <th>Applied Plan</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.citizenName}</td>
                <td>{app.id}</td>
                <td>{app.plan}</td>
                <td>{app.submissionDate}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      app.status === "Pending"
                        ? styles.pending
                        : app.status === "Approved"
                        ? styles.approved
                        : styles.denied
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className={styles.actions}>
                  <Button className={styles.viewBtn}>View Details</Button>
                  {app.status === "Pending" && (
                    <Button
                      className={styles.runBtn}
                      to="/user/eligibility/check"
                    >
                      Run Eligibility Check
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EligibilityDashboard;
