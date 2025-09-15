// src/modules/benefit/pages/BenefitHistory.tsx
import React, { useState } from "react";
import styles from "./BenefitHistory.module.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface Transaction {
  id: string;
  dateTime: string;
  citizenName: string;
  benefitType: string;
  amount: number;
  status: "Success" | "Failed" | "Processing" | "Pending";
  paymentMethod: string;
}

const BenefitHistory: React.FC = () => {
  // Dummy dataset (expand for pagination demo)
  const [transactions] = useState<Transaction[]>(
    Array.from({ length: 28 }).map((_, i) => ({
      id: `TXN-${1000 + i}`,
      dateTime: "2025-09-12 10:30 AM",
      citizenName: `Citizen ${i + 1}`,
      benefitType: ["Medical", "Dental", "Vision", "Prescription"][i % 4],
      amount: 100 + i * 10,
      status: ["Success", "Failed", "Processing", "Pending"][i % 4] as
        | "Success"
        | "Failed"
        | "Processing"
        | "Pending",
      paymentMethod: ["Bank Transfer", "Credit Card", "Check"][i % 3],
    }))
  );

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Benefit Transaction History</h2>

      {/* 🔹 Filter Section */}
      <div className={styles.filterBox}>
        <Input
          type="text"
          placeholder="Search by ID or Citizen Name"
          className={styles.input}
        />
        <Select onValueChange={(v: string) => v}>
          <SelectTrigger>
            <SelectValue placeholder="Benefit Type" />
          </SelectTrigger>
          <SelectContent>
            {["", "Medical", "Dental", "Vision", "Prescription"].map(
              (status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <Select onValueChange={(v: string) => v}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {["", "Success", "Failed", "Processing", "Pending"].map(
              (status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <Button className={styles.applyBtn}>Apply Filters</Button>
        <Button className={styles.clearBtn}>Clear</Button>
      </div>

      {/* 🔹 Transaction Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date & Time</th>
              <th>Citizen Name</th>
              <th>Benefit Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.dateTime}</td>
                <td>{txn.citizenName}</td>
                <td>{txn.benefitType}</td>
                <td>${txn.amount.toFixed(2)}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[txn.status.toLowerCase()]
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td>{txn.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      <div className={styles.pagination}>
        <Button
          className={styles.pageBtn}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Previous
        </Button>
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className={styles.pageBtn}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default BenefitHistory;
