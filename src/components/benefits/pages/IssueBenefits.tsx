import React, { useState } from "react";
import styles from "./IssueBenefits.module.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import ReactDOM from "react-dom";
import BenefitConfirmation from "./BenefitConfirmation";
import BenefitSuccess from "./BenefitSuccess";

// Define the SelectedCitizen type
interface SelectedCitizen {
  id: string;
  name: string;
  caseId: string;
  eligibility: {
    benefitType: string;
    approvedAmount: number;
    status: string;
    approvalDate: string;
  };
}

const IssueBenefits: React.FC = () => {
  const [citizenId, setCitizenId] = useState("");
  const [selectedCitizen, setSelectedCitizen] =
    useState<SelectedCitizen | null>(null);
  const [formData, setFormData] = useState({
    benefitType: "",
    amount: "",
    paymentMethod: "",
    issuanceDate: new Date().toISOString().split("T")[0],
    remarks: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const portalRoot = document.getElementById("overlay") as HTMLElement;

  // Dummy citizen lookup
  const handleSearch = () => {
    if (citizenId === "CITIZEN123") {
      setSelectedCitizen({
        id: "CITIZEN123",
        name: "Jane Doe",
        caseId: "CASE-001234",
        eligibility: {
          benefitType: "Medical",
          approvedAmount: 500,
          status: "Approved",
          approvalDate: "2025-09-10",
        },
      });
      setFormData((prev) => ({
        ...prev,
        benefitType: "Medical",
        amount: "500",
      }));
    } else {
      setSelectedCitizen(null);
      alert("Citizen not found!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIssueBenefit = () => {
    setShowConfirmation(true);
  };

  const confirmIssue = () => {
    setShowConfirmation(false);
    setTransactionId("TXN-" + Math.floor(Math.random() * 100000));
    setSelectedCitizen(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Issue Benefits</h2>

      {/* Search Citizen */}
      <div className={styles.searchBox}>
        <Input
          type="text"
          placeholder="Enter Citizen ID or Case ID"
          value={citizenId}
          onChange={(e) => setCitizenId(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Citizen Details */}
      <div className={styles.scroll}>
        {selectedCitizen && (
          <div className={styles.citizenCard}>
            <h3>Citizen Details</h3>
            <p>
              <strong>Name:</strong> {selectedCitizen.name}
            </p>
            <p>
              <strong>Citizen ID:</strong> {selectedCitizen.id}
            </p>
            <p>
              <strong>Case ID:</strong> {selectedCitizen.caseId}
            </p>
            <p>
              <strong>Eligibility:</strong>{" "}
              {selectedCitizen.eligibility.benefitType} - $
              {selectedCitizen.eligibility.approvedAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedCitizen.eligibility.status}
            </p>
          </div>
        )}

        {/* Benefit Issuance Form */}
        {selectedCitizen && (
          <div className={styles.formCard}>
            <h3>Benefit Issuance</h3>
            <div className={styles.formGroup}>
              <Label>Benefit Type</Label>
              <Input
                type="text"
                name="benefitType"
                value={formData.benefitType}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className={styles.formGroup}>
              <Label>Approved Amount</Label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="paymentMethod">Card Type:</Label>
              <Select
                onValueChange={(v: string) =>
                  setFormData((prev) => ({ ...prev, paymentMethod: v }))
                }
                value={formData.paymentMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "",
                    "Bank Transfer",
                    "Check",
                    "Credit Card",
                    "EBT Card",
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formGroup}>
              <Label>Issuance Date</Label>
              <Input
                type="date"
                name="issuanceDate"
                value={formData.issuanceDate}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <Label>Remarks</Label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>

            <div className={styles.buttonRow}>
              <Button onClick={handleIssueBenefit} className={styles.issueBtn}>
                Issue Benefit
              </Button>
              <Button className={styles.cancelBtn}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation &&
          ReactDOM.createPortal(
            <BenefitConfirmation
              selectedCitizen={selectedCitizen}
              formData={formData}
              onClick={confirmIssue}
              onCancel={() => setShowConfirmation(false)}
            />,
            portalRoot
          )}

        {/* Result */}
        {transactionId &&
          ReactDOM.createPortal(
            <BenefitSuccess
              transactionId={transactionId}
              setTransactionId={setTransactionId}
            />,
            portalRoot
          )}
      </div>
    </div>
  );
};

export default IssueBenefits;
