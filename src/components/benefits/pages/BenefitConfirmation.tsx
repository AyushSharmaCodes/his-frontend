import Button from "@/components/ui/Button";
import styles from "./BenefitConfirmation.module.css";

interface BenefitConfirmationProps {
  selectedCitizen: any;
  formData: {
    benefitType: string;
    amount: string;
    paymentMethod: string;
    issuanceDate: string;
    remarks: string;
  };
  onClick: () => void;
  onCancel: () => void;
}

const BenefitConfirmation: React.FC<BenefitConfirmationProps> = ({
  selectedCitizen,
  formData,
  onClick,
  onCancel,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Confirm Issuance</h3>
        <p>
          <strong>Citizen:</strong> {selectedCitizen?.name}
        </p>
        <p>
          <strong>Benefit Type:</strong> {formData.benefitType}
        </p>
        <p>
          <strong>Amount:</strong> ${formData.amount}
        </p>
        <p>
          <strong>Payment Method:</strong> {formData.paymentMethod}
        </p>
        <div className={styles.modalButtons}>
          <Button onClick={onClick} className={styles.issueBtn}>
            Confirm
          </Button>
          <Button onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BenefitConfirmation;
