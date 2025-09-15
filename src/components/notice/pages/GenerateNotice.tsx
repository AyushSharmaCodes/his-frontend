// src/modules/correspondence/pages/GenerateNotice.jsx
import { useState } from "react";
import styles from "./GenerateNotice.module.css";
import { Textarea } from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const GenerateNotice: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "generated">(
    "idle"
  );

  const [form, setForm] = useState({
    citizenId: "",
    plan: "",
    type: "",
    remarks: "",
  });

  const handleGenerate = () => {
    if (!form) return;
    setStatus("loading");

    // simulate backend call
    setTimeout(() => {
      setStatus("generated");
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Notice Generated Successfully! (Dummy Action)");
  };

  const handleViewNotice = () => {
    // Navigate to CitizenNoticeView
    window.location.href = "/user/notice/view";
  };

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>Generate New Notice</h2>
      </hgroup>

      <form className={styles.form} onSubmit={handleSubmit}>
        {status === "loading" && (
          <div className={styles.loadingContainer}>
            <div className={styles.bigSpinner} />
            <span>Generating Notice...</span>
          </div>
        )}
        {status === "generated" && (
          <div className={styles.successContainer}>
            <div className={styles.successMark}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.successText}>
              Notice Generated Successfully!
            </span>
            <Button
              type="button"
              className={styles.successBtn}
              onClick={handleViewNotice}
            >
              View Notice
            </Button>
          </div>
        )}
        {status === "idle" && (
          <>
            <Label>Citizen ID</Label>
            <Input
              type="text"
              name="citizenId"
              value={form.citizenId}
              onChange={handleChange}
              required
            />

            <Label>Plan</Label>
            <Select onValueChange={(v: string) => v} value={form.plan}>
              <SelectTrigger>
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                {["", "SNAP", "CCAP", "Medicaid", "Medicare", "QHP"].map(
                  (type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Label>Notice Type</Label>
            <Select onValueChange={(v: string) => v} value={form.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "",
                  "Eligibility Approval",
                  "Eligibility Denial",
                  "Benefit Issuance",
                  "Benefit Adjustment",
                  "Benefit Termination",
                  "Renewal Reminder",
                  "Renewal Approval",
                  "Renewal Denial",
                  "Missing Documents",
                  "Additional Documents",
                  "Case Closure",
                  "Case Transfer",
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Remarks</Label>
            <Textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              rows={4}
              className={styles.remarks}
            />

            <Button
              type="button"
              className={styles.submitBtn}
              onClick={handleGenerate}
            >
              Generate Notice
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default GenerateNotice;
