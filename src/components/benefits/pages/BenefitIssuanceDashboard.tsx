import React, { useState } from "react";
import styles from "./BenefitIssuanceDashboard.module.css";
import Button from "@/components/ui/Button";

interface Citizen {
  id: number;
  name: string;
  plan: string;
  benefitAmount: number;
  status: "Pending" | "Issued" | "Failed";
}

const BenefitIssuanceDashboard: React.FC = () => {
  const [citizens, setCitizens] = useState<Citizen[]>([
    {
      id: 1,
      name: "John Doe",
      plan: "SNAP",
      benefitAmount: 250,
      status: "Pending",
    },
    {
      id: 2,
      name: "Mary Johnson",
      plan: "Medicaid",
      benefitAmount: 500,
      status: "Issued",
    },
    {
      id: 3,
      name: "Robert Brown",
      plan: "CCAP",
      benefitAmount: 300,
      status: "Failed",
    },
  ]);

  const handleIssueBenefit = (id: number) => {
    setCitizens((prev) =>
      prev.map((citizen) =>
        citizen.id === id ? { ...citizen, status: "Issued" } : citizen
      )
    );
    alert(`Benefit Issued for Citizen ID: ${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Benefit Issuance Dashboard</h2>
        <div className={styles.actionBtns}>
          <Button className={styles.btn} to="/user/benefits/issuance">
            Issue New Benefit
          </Button>
          <Button className={styles.btn} to="/user/benefits/history">
            View Issuance History
          </Button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Citizen Name</th>
              <th>Plan</th>
              <th>Benefit Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {citizens.map((citizen) => (
              <tr key={citizen.id}>
                <td>{citizen.name}</td>
                <td>{citizen.plan}</td>
                <td>${citizen.benefitAmount}</td>
                <td
                  className={`${styles.status} ${
                    styles[citizen.status.toLowerCase()]
                  }`}
                >
                  {citizen.status}
                </td>
                <td>
                  {citizen.status === "Pending" ? (
                    <Button
                      className={styles.issueBtn}
                      onClick={() => handleIssueBenefit(citizen.id)}
                    >
                      Issue Benefit
                    </Button>
                  ) : (
                    <span>—</span>
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

export default BenefitIssuanceDashboard;
