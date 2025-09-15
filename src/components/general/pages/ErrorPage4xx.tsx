// src/components/errors/ErrorPage4xx.tsx
import React from "react";
import styles from "../styles/ErrorPage.module.css";
import Button from "@/components/ui/Button";

const ErrorPage4xx: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.sadIcon}>☹️</span>
        </div>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>
          We're sorry, the page you requested could not be found. Please check
          the URL or return to the dashboard.
        </p>
        <Button to="/user/dashboard" className={styles.actionBtn}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage4xx;
