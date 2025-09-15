// src/components/errors/SessionTimeout.tsx
import React from "react";
import styles from "../styles/ErrorPage.module.css";
import Button from "@/components/ui/Button";

const SessionTimeout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.clockIcon}>⏰</span>
        </div>
        <h2 className={styles.title}>Session Timeout</h2>
        <p className={styles.message}>
          Your session has expired due to inactivity. Please log in again to
          continue.
        </p>
        <Button to="/login" className={styles.actionBtn}>
          Login Again
        </Button>
      </div>
    </div>
  );
};

export default SessionTimeout;
