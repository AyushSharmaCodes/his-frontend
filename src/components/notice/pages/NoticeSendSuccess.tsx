import styles from "./NoticeSendSuccess.module.css";

const NoticeSendSuccess: React.FC = () => {
  return (
    <div className={styles.successOverlay}>
      <div className={styles.successBox}>
        <div className={styles.successMark}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            width="36"
            height="36"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className={styles.successText}>Notice Sent!</div>
        <div className={styles.successSubtext}>
          Redirecting to NoticeDashboard...
        </div>
      </div>
    </div>
  );
};

export default NoticeSendSuccess;
