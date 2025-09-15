// src/components/errors/ErrorPage5xx.tsx
import React from "react";
import styles from "../styles/ErrorPage.module.css";
import Button from "@/components/ui/Button";

const ErrorPage5xx: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.errorIcon}>⚠️</span>
        </div>
        <h2 className={styles.title}>Internal Server Error</h2>
        <p className={styles.message}>
          Oops! Something went wrong on our end. Please try again later or
          contact support if the issue persists.
        </p>
        <Button to="/user/dashboard" className={styles.actionBtn}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage5xx;
