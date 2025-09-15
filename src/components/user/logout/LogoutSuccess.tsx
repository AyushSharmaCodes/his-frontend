import styles from "./LogoutSuccess.module.css";
import Button from "@/components/ui/Button";

const LogoutSuccess: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>You have been successfully logged out.</h2>
        <p className={styles.message}>
          Thank you for using the HIS Portal. Your session has ended securely.
        </p>

        <div className={styles.actions}>
          <Button to="/" className={styles.primaryBtn}>
            Log Back In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutSuccess;
