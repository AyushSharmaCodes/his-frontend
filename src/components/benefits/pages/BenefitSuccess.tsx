import Button from "@/components/ui/Button";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./BenefitSuccess.module.css";

interface BenefitSuccessProps {
  transactionId: string;
  setTransactionId: (id: string | null) => void;
}

const BenefitSuccess: React.FC<BenefitSuccessProps> = ({
  transactionId,
  setTransactionId,
}) => {
  return (
    <div className={styles.modal}>
      <div className={`${styles.modalContent} ${styles.successModalContent}`}>
        <div className={styles.successMsg}>
          <div className={styles.successIcon}>
            <FaCheckCircle size={40} />
          </div>
          <div className={styles.successText}>
            <h3>Benefit Issued Successfully!</h3>
            <p>
              Transaction ID: <strong>{transactionId}</strong>
            </p>
          </div>
        </div>
        <Button
          onClick={() => setTransactionId(null)}
          className={styles.closeButton}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default BenefitSuccess;
