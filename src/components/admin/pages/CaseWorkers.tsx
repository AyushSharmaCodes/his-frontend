import React, { useState } from "react";
import Button from "../../ui/Button";
import styles from "./CaseWorkers.module.css";
import { FaPlus, FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type Worker = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

const initialWorkers: Worker[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.j@his.gov",
    role: "Eligibility Specialist",
    active: true,
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob.w@his.gov",
    role: "Claims Processor",
    active: false,
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carolD@his.gov",
    role: "Enrollment Coordinator",
    active: true,
  },
  {
    id: 4,
    name: "David Lee",
    email: "david.l@his.gov",
    role: "Policy Analyst",
    active: true,
  },
  {
    id: 5,
    name: "Eve Brown",
    email: "eve.b@his.gov",
    role: "Member Services Rep",
    active: false,
  },
];

const CaseWorkers: React.FC = () => {
  const [workers, setWorkers] = useState(initialWorkers);

  const toggleStatus = (id: number) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Case Workers</h2>
        <Button
          type="button"
          className={styles.addButton}
          to="/admin/case-workers/create"
        >
          <FaPlus className={styles.icon} />
        </Button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.email}</td>
                <td>{worker.role}</td>
                <td>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={worker.active}
                      onChange={() => toggleStatus(worker.id)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </td>
                <td>
                  <NavLink
                    to={`/admin/case-workers/${worker.id}/profile`}
                    className={styles.actionBtn}
                  >
                    <FaEdit size={22} />
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseWorkers;
