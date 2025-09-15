import styles from "./NoticeSendFailure.module.css";

const NoticeSendFailure: React.FC = () => {
  return (
    <div className={styles.errorOverlay}>
      <div className={styles.errorBox}>
        <div className={styles.errorMark}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className={styles.errorText}>Failed to Send Notice!</div>
        <div className={styles.errorSubtext}>
          Please try again in a few moments.
        </div>
      </div>
    </div>
  );
};

export default NoticeSendFailure;
