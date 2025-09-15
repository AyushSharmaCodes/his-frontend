import Button from "@/components/ui/Button";
import styles from "./EligibilityResult.module.css";
import { useNavigate } from "react-router-dom";

const EligibilityResult = () => {
  const navigate = useNavigate();
  // Dummy citizen data
  const citizen = {
    name: "Jane Doe",
    dob: "1990-05-15",
    applicationId: "HIS-2024-001234",
    selectedPlan: "SNAP",
    eligibility: "Approved", // or "Approved"
    reasons: [
      "Annual income ₹60,000 exceeds SNAP threshold of ₹50,000.",
      "Household size declared as 1 — minimum SNAP requires 2.",
    ],
    alternatives: ["Medicaid", "TANF"],
  };

  // Dummy plan summary (static)
  const planSummary = {
    planName: "HealthBridge Platinum",
    type: "HMO",
    premium: "$350.00/month",
    deductible: "$1,500.00",
  };

  const handleButton = () => {
    {
      citizen.eligibility === "Approved" && navigate("/user/notice/generate");
    }
    {
      citizen.eligibility === "Rejected" &&
        navigate("/user/applications/citizen-onboarding");
    }
  };

  return (
    <div className={styles.container}>
      {/* Fixed Header */}
      <header className={styles.header}>
        <h2 className={styles.pageTitle}>
          Eligibility Result
          <span
            className={`${styles.badge} ${
              citizen.eligibility === "Approved"
                ? styles.approved
                : styles.rejected
            }`}
          >
            {citizen.eligibility}
          </span>
        </h2>
      </header>

      {/* Scrollable Content */}
      <div className={styles.content}>
        {/* Citizen Details */}
        <div className={styles.card}>
          <h3>Citizen Details</h3>
          <div className={styles.detailsRow}>
            <p>
              <strong>Name:</strong> {citizen.name}
            </p>
            <p>
              <strong>Application ID:</strong> {citizen.applicationId}
            </p>
          </div>
          <p>
            <strong>Date of Birth:</strong> {citizen.dob}
          </p>
        </div>

        {/* Plan Summary */}
        <div className={styles.card}>
          <h3>Plan Summary</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Type</th>
                <th>Monthly Premium</th>
                <th>Annual Deductible</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{citizen.selectedPlan}</td>
                <td>{planSummary.type}</td>
                <td>{planSummary.premium}</td>
                <td>{planSummary.deductible}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Eligibility Status */}
        <div className={styles.section}>
          <h3>Eligibility Status</h3>
          <span
            className={`${styles.badge} ${
              citizen.eligibility === "Approved"
                ? styles.approved
                : styles.rejected
            }`}
          >
            {citizen.eligibility}
          </span>
        </div>

        {citizen.eligibility === "Rejected" && (
          <>
            <div className={styles.section}>
              <h3>Reasons</h3>
              <ul>
                {citizen.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h3>Suggested Alternatives</h3>
              <ul>
                {citizen.alternatives.map((plan, index) => (
                  <li key={index}>{plan}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Fixed Button at Bottom */}
      <footer className={styles.footer}>
        <Button className={styles.proceedBtn} onClick={handleButton}>
          {citizen.eligibility === "Approved" ? "Proceed" : "Re-Apply"}
        </Button>
      </footer>
    </div>
  );
};

export default EligibilityResult;
