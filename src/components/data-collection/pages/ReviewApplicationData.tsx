import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ReviewApplicationData.module.css";
import { FaEdit, FaFileAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Label } from "../../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { Textarea } from "../../ui/Textarea";
import Checkbox from "../../ui/Checkbox";
import { useNavigate } from "react-router-dom";

type ReviewForm = {
  firstName: string;
  lastName: string;
  ssn: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  income: number;
  incomeSource: string;
  employer: string;
  maritalStatus: string;
  householdSize: number;
  hasDependents: boolean;
  dependent1Name?: string;
  dependent1Dob?: string;
  dependent1Relation?: string;
  dependent2Name?: string;
  dependent2Dob?: string;
  dependent2Relation?: string;
  conditions?: string;
  medications?: string;
  allergies?: string;
};

const ReviewApplicationData: React.FC = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { register, handleSubmit, watch, setValue } = useForm<ReviewForm>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      ssn: "XXX-XX-XXXX",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      address1: "123 Main St",
      city: "Anytown",
      state: "IL",
      zip: "12345",
      income: 5000,
      employer: "Acme Corp",
      householdSize: 1,
      hasDependents: true,
    },
  });
  const navigate = useNavigate();

  const hasDependents = watch("hasDependents");

  const documents = [
    {
      name: "Alice_Johnson_ID.pdf",
      type: "Identification",
      size: "2.1 MB",
      date: "2024-07-28",
    },
    {
      name: "Alice_Johnson_ProofOfRes.jpeg",
      type: "Proof of Residency",
      size: "1.5 MB",
      date: "2024-07-28",
    },
    {
      name: "Alice_Johnson_Paystub.pdf",
      type: "Income Verification",
      size: "1.8 MB",
      date: "2024-07-28",
    },
    {
      name: "Alice_Johnson_Medical.png",
      type: "Medical Records",
      size: "0.9 MB",
      date: "2024-07-28",
    },
  ];

  const handleEditClick = (section: string) => {
    setEditingSection(editingSection === section ? null : section);
  };

  const onSubmit = (data: ReviewForm) => {
    console.log("Review data:", data);
    navigate("/user/applications/success");
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <hgroup className={styles.formHeader}>
        <div>
          <h1 className={styles.title}>Review Application Data</h1>
          <p className={styles.subtitle}>
            Please review all the information below for accuracy. You can go
            back and edit any section before confirming submission.
          </p>
        </div>
        <Button
          to="/user/data/upload-documents"
          type="button"
          className={styles.cancelBtn}
        >
          <MdCancel
            size={22}
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          Cancel
        </Button>
      </hgroup>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        {/* Personal Info */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => handleEditClick("Personal Information")}
            >
              <FaEdit className={styles.icon} />
              {editingSection === "Personal Information"
                ? " Close"
                : " Edit Section"}
            </button>
          </div>
          {editingSection === "Personal Information" && (
            <div className={styles.editContent}>
              <div className={styles.grid}>
                <div>
                  <Label>First Name *</Label>
                  <Input {...register("firstName")} />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input {...register("lastName")} />
                </div>
                <div>
                  <Label>SSN / Aadhar Equivalent</Label>
                  <Input {...register("ssn")} />
                </div>
              </div>
              <div className={styles.grid}>
                <div>
                  <Label>Email Address</Label>
                  <Input type="email" {...register("email")} />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input type="tel" {...register("phone")} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Income */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Income Details</h3>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => handleEditClick("Income Details")}
            >
              <FaEdit className={styles.icon} />
              {editingSection === "Income Details" ? " Close" : " Edit Section"}
            </button>
          </div>
          {editingSection === "Income Details" && (
            <div className={styles.editContent}>
              <div className={styles.grid}>
                <div>
                  <Label>Monthly Gross Income ($)</Label>
                  <Input type="number" {...register("income")} />
                </div>
                <div>
                  <Label>Source of Income *</Label>
                  <Select
                    onValueChange={(v) => setValue("incomeSource", v)}
                    value={watch("incomeSource") || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Salary", "Self-Employed", "Business", "Rental"].map(
                        (src) => (
                          <SelectItem key={src} value={src}>
                            {src}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Employer</Label>
                  <Input {...register("employer")} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Family */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Family & Dependents</h3>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => handleEditClick("Family & Dependents")}
            >
              <FaEdit className={styles.icon} />
              {editingSection === "Family & Dependents"
                ? " Close"
                : " Edit Section"}
            </button>
          </div>
          {editingSection === "Family & Dependents" && (
            <div className={styles.editContent}>
              <div className={styles.grid}>
                <div>
                  <Label>Marital Status</Label>
                  <Select
                    onValueChange={(v) => setValue("maritalStatus", v)}
                    value={watch("maritalStatus") || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Single", "Married", "Divorced"].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Household Size</Label>
                  <Input
                    type="number"
                    {...register("householdSize", { valueAsNumber: true })}
                  />
                </div>
              </div>
              <div className={styles.checkboxRow}>
                <Checkbox
                  checked={watch("hasDependents")}
                  onCheckedChange={(c) =>
                    setValue("hasDependents", c as boolean)
                  }
                  id="hasDependents"
                />
                <Label htmlFor="hasDependents">
                  Does the applicant have dependents?
                </Label>
              </div>
              {hasDependents && (
                <>
                  <h4 className={styles.subTitle}>Dependents Details</h4>
                  <div className={styles.grid}>
                    <div>
                      <Label>Dependent 1 Name</Label>
                      <Input {...register("dependent1Name")} />
                    </div>
                    <div>
                      <Label>Dependent 1 DOB</Label>
                      <Input type="date" {...register("dependent1Dob")} />
                    </div>
                    <div>
                      <Label>Dependent 1 Relationship</Label>
                      <Select
                        onValueChange={(v) => setValue("dependent1Relation", v)}
                        value={watch("dependent1Relation") || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Son", "Daughter", "Spouse"].map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Medical */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Medical History</h3>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => handleEditClick("Medical History")}
            >
              <FaEdit className={styles.icon} />
              {editingSection === "Medical History"
                ? " Close"
                : " Edit Section"}
            </button>
          </div>
          {editingSection === "Medical History" && (
            <div className={styles.editContent}>
              <div className={styles.grid}>
                <div>
                  <Label>Pre-existing Conditions</Label>
                  <Textarea {...register("conditions")} />
                </div>
                <div>
                  <Label>Current Medications</Label>
                  <Textarea {...register("medications")} />
                </div>
                <div>
                  <Label>Allergies</Label>
                  <Textarea {...register("allergies")} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Uploaded Documents */}
        <div className={styles.documents}>
          <h2 className={styles.docsTitle}>Uploaded Documents</h2>
          <p className={styles.docsSubtitle}>
            List of all supporting documents submitted.
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Type</th>
                <th>Size</th>
                <th>Upload Date</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.name}>
                  <td>
                    <FaFileAlt className={styles.fileIcon} /> {doc.name}
                  </td>
                  <td>{doc.type}</td>
                  <td>{doc.size}</td>
                  <td>{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>

      {/* Fixed Actions */}
      <div className={styles.formActions}>
        <Button
          type="button"
          className={styles.backBtn}
          to="/user/data/upload-documents"
        >
          ← Back to Uploads
        </Button>
        <Button
          type="submit"
          className={styles.submitBtn}
          to="/user/data/submission"
        >
          Confirm Submission
        </Button>
      </div>
    </div>
  );
};

export default ReviewApplicationData;
