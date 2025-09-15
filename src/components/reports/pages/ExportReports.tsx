// src/modules/reports/pages/ExportReports.tsx
import React, { useState } from "react";
import styles from "../styles/ExportReports.module.css";
import Button from "@/components/ui/Button";
import { FaDownload } from "react-icons/fa";
import { Label } from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const ExportReports: React.FC = () => {
  const [reportType, setReportType] = useState("");
  const [fileFormat, setFileFormat] = useState("xlsx");

  const handleDownload = () => {
    if (!reportType) {
      alert("Please select a report type before downloading.");
      return;
    }
    alert(
      `Downloading ${reportType} report in ${fileFormat.toUpperCase()} format...`
    );
    // TODO: integrate backend API call for export
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Export Reports</h2>

      <div className={styles.card}>
        {/* Report Type */}
        <div className={styles.formGroup}>
          <Label className={styles.Label}>Select Report Type:</Label>
          <Select
            onValueChange={(v: string) => setReportType(v)}
            value={reportType}
          >
            <SelectTrigger>
              <SelectValue placeholder="-- Choose Report --" />
            </SelectTrigger>
            <SelectContent>
              {[
                { value: "system-audit", label: "System Audit Report" },
                { value: "payment-status", label: "Payment Status Report" },
                { value: "notice-report", label: "Notice Report" },
                { value: "benefit-issuance", label: "Benefit Issuance Report" },
                { value: "plan-performance", label: "Plan Performance Report" },
                { value: "beneficiary", label: "Beneficiary Report" },
                { value: "daily-status", label: "Daily Status Report" },
                {
                  value: "approved-citizens",
                  label: "Approved Citizens Report",
                },
                { value: "denied-citizens", label: "Denied Citizens Report" },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* File Format */}
        <div className={styles.formGroup}>
          <Label className={styles.Label}>Select File Format:</Label>
          <div className={styles.radioGroup}>
            <div className={styles.field}>
              <Input
                id="excel"
                type="radio"
                name="format"
                value="xlsx"
                checked={fileFormat === "xlsx"}
                onChange={(e) => setFileFormat(e.target.value)}
                className={styles.radioBtn}
              />
              <Label htmlFor="excel" className={styles.radioLabel}>
                Excel (.xlsx)
              </Label>
            </div>
            <div className={styles.field}>
              <Input
                id="pdf"
                type="radio"
                name="format"
                value="pdf"
                checked={fileFormat === "pdf"}
                onChange={(e) => setFileFormat(e.target.value)}
                className={styles.radioBtn}
              />
              <Label htmlFor="pdf" className={styles.radioLabel}>
                PDF (.pdf)
              </Label>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <Button className={styles.downloadBtn} onClick={handleDownload}>
          <FaDownload size={18} style={{ marginRight: "10px" }} />
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default ExportReports;
