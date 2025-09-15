import React, { useState } from "react";
import styles from "./PaymentStatus.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface PaymentRecord {
  transactionId: string;
  citizenId: string;
  citizenName: string;
  program: string;
  issuanceDate: string;
  amount: number;
  paymentMethod: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
}

const dummyPayments: PaymentRecord[] = [
  {
    transactionId: "TXN-001234",
    citizenId: "CIT-1001",
    citizenName: "John Doe",
    program: "SNAP",
    issuanceDate: "2025-09-01",
    amount: 500,
    paymentMethod: "Bank Transfer",
    status: "SUCCESS",
  },
  {
    transactionId: "TXN-001235",
    citizenId: "CIT-1002",
    citizenName: "Mary Jane",
    program: "Medicaid",
    issuanceDate: "2025-09-01",
    amount: 800,
    paymentMethod: "Cheque",
    status: "PENDING",
  },
  {
    transactionId: "TXN-001236",
    citizenId: "CIT-1003",
    citizenName: "Raj Kumar",
    program: "QHP",
    issuanceDate: "2025-09-02",
    amount: 1200,
    paymentMethod: "Bank Transfer",
    status: "FAILED",
  },
];

const PaymentStatus: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "SUCCESS" | "PENDING" | "FAILED"
  >("ALL");

  const filteredPayments = dummyPayments.filter((record) => {
    const matchesSearch =
      record.citizenId.toLowerCase().includes(search.toLowerCase()) ||
      record.citizenName.toLowerCase().includes(search.toLowerCase()) ||
      record.transactionId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>Payment Status</h2>
      </hgroup>
      <div className={styles.filters}>
        <Input
          type="text"
          placeholder="Search by Citizen ID, Name, or Transaction ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <Select
          onValueChange={(value) =>
            setFilterStatus(value as "ALL" | "SUCCESS" | "PENDING" | "FAILED")
          }
          value={filterStatus}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Source" />
          </SelectTrigger>
          <SelectContent>
            {["ALL", "SUCCESS", "PENDING", "FAILED"].map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Citizen ID</th>
              <th>Citizen Name</th>
              <th>Program</th>
              <th>Issuance Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((record) => (
              <tr key={record.transactionId}>
                <td>{record.transactionId}</td>
                <td>{record.citizenId}</td>
                <td>{record.citizenName}</td>
                <td>{record.program}</td>
                <td>{record.issuanceDate}</td>
                <td>${record.amount}</td>
                <td>{record.paymentMethod}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      record.status === "SUCCESS"
                        ? styles.success
                        : record.status === "FAILED"
                        ? styles.failed
                        : styles.pending
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td>
                  {record.status !== "SUCCESS" ? (
                    <Button className={styles.retryBtn}>Retry</Button>
                  ) : (
                    <Button className={styles.viewBtn}>View</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentStatus;
