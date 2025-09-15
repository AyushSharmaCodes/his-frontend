import React, { useState } from "react";
import styles from "./ApplicationHomePage.module.css";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

type Application = {
  id: string;
  name: string;
  status: "In Progress" | "Submitted" | "Rejected";
  createdDate: string;
};

const ApplicaitonHomePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [applications] = useState<Application[]>([
    {
      id: "APP-1001",
      name: "John Doe",
      status: "In Progress",
      createdDate: "2024-08-01",
    },
    {
      id: "APP-1002",
      name: "Jane Smith",
      status: "Submitted",
      createdDate: "2024-08-02",
    },
    {
      id: "APP-1003",
      name: "Robert Johnson",
      status: "Rejected",
      createdDate: "2024-08-03",
    },
    {
      id: "APP-1004",
      name: "Emily Davis",
      status: "In Progress",
      createdDate: "2024-08-04",
    },
  ]);

  const filteredApps = applications.filter(
    (app) =>
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Citizen Applications</h1>
        <Button
          type="button"
          className={styles.addButton}
          to="/user/applications/citizen-onboarding"
        >
          + New Citizen Registration
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.filter}>
          <div className={styles.searchBar}>
            <Input
              placeholder="Search by Application ID or Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Citizen Name</th>
                <th>Status</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.name}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[app.status.replace(" ", "")]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>{app.createdDate}</td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={4} className={styles.noData}>
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicaitonHomePage;
