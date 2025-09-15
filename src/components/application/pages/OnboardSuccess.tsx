import React from "react";
import styles from "./OnboardSuccess.module.css";
import Button from "../../ui/Button";
import { FaRegCopy } from "react-icons/fa";
import OnboardSuccessImage from "../../../assets/onboard_success.png";

interface OnboardingSuccessProps {
  citizenId?: string;
  onGoToDashboard?: () => void;
}

const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({
  citizenId = "HIS-CTZ-2024-0012345",
  onGoToDashboard,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(citizenId);
    alert("Citizen ID copied to clipboard!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Illustration */}
        <div className={styles.illustration}>
          <img src={OnboardSuccessImage} alt="Onboarding Success" />
        </div>

        {/* Title */}
        <h2 className={styles.title}>Onboarding Successful!</h2>
        <p className={styles.subtitle}>
          Congratulations, the new citizen has been successfully onboarded to
          the Health Insurance System.
        </p>

        {/* Citizen ID */}
        <div className={styles.citizenIdBox}>
          <label>Generated Citizen ID:</label>
          <div className={styles.citizenIdRow}>
            <span>{citizenId}</span>
            <FaRegCopy />
          </div>
        </div>

        {/* Action Button */}
        <Button
          type="button"
          onClick={onGoToDashboard}
          className={styles.dashboardBtn}
          to="/user/data/citizen-data"
        >
          Proceed to collect Citizen Data
        </Button>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
