// src/components/errors/AccessDenied.tsx
import React from "react";
import styles from "../styles/ErrorPage.module.css";
import Button from "@/components/ui/Button";

const AccessDenied: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.lockIcon}>🔒</span>
        </div>
        <h2 className={styles.title}>Access Denied</h2>
        <p className={styles.message}>
          You do not have the necessary permissions to view this page. Please
          contact your administrator if you believe this is an error.
        </p>
        <Button to="/dashboard" className={styles.actionBtn}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AccessDenied;
