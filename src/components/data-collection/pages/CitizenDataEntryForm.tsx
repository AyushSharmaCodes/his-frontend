import React from "react";
import { useForm } from "react-hook-form";
import styles from "./CitizenDataEntryForm.module.css";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { Label } from "../../ui/Label";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";

type CitizenForm = {
  income: number;
  incomeSource: string;
  employer: string;
  bankName: string;
  accountHolder: string;
  accountNumber: number;
  cardType: string;
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

const CitizenDataEntryForm: React.FC = () => {
  const { handleSubmit, register, watch, setValue } = useForm<CitizenForm>({
    defaultValues: {
      income: 5000,
      employer: "Acme Corp",
      householdSize: 1,
      hasDependents: true,
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: CitizenForm) => {
    console.log("Onboarding data:", data);
    navigate("/user/applications/validate");
  };

  const hasDependents = watch("hasDependents");

  return (
    <div className={styles.container}>
      <hgroup className={styles.formHeader}>
        <div>
          <h1 className={styles.title}>Citizen Entry Form</h1>
          <p className={styles.subtitle}>
            Please fill out the form below to proceed for health insurance
            coverage. All fields are required unless marked optional.
          </p>
        </div>
        <Button
          to="/user/applications"
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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Income Details</h3>
          <div className={styles.grid}>
            <div>
              <Label>Monthly Gross Income *</Label>
              <Input placeholder="income" {...register("income")} />
            </div>
            <div>
              <Label>Source of Income *</Label>
              <Select
                onValueChange={(v: string) => setValue("incomeSource", v)}
                value={watch("incomeSource") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Source" />
                </SelectTrigger>
                <SelectContent>
                  {["", "Salary", "Self-Employed", "Business", "Rental"].map(
                    (type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Employer Name (if applicable)</Label>
              <Input placeholder="Acme Corp" {...register("employer")} />
            </div>
          </div>
        </div>

        {/* Bank and Card Details */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Bank / Card Details</h3>
          <div className={styles.grid}>
            <div>
              <Label>Bank Name *</Label>
              <Input placeholder="Enter Bank Name" {...register("bankName")} />
            </div>
            <div>
              <Label>Account Holder Name *</Label>
              <Input
                placeholder="Enter Account Holder Name"
                {...register("accountHolder")}
              />
            </div>
            <div>
              <Label>Account Number *</Label>
              <Input
                placeholder="Enter Account Number"
                {...register("accountNumber")}
              />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number:</Label>
              <Input
                type="text"
                id="routingNumber"
                name="routingNumber"
                maxLength={9}
                pattern="[0-9]{9}"
                placeholder="9-digit Routing Number"
                required
              />
            </div>
            <div>
              <Label htmlFor="cardType">Card Type:</Label>
              <Select
                onValueChange={(v: string) => setValue("cardType", v)}
                value={watch("cardType") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Card" />
                </SelectTrigger>
                <SelectContent>
                  {["", "Debit", "Credit", "Prepaid"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cardLast4">Card Last 4 Digits:</Label>
              <Input
                type="text"
                id="cardLast4"
                name="cardLast4"
                maxLength={4}
                pattern="[0-9]{4}"
                placeholder="1234"
                required
              />
            </div>
            <div>
              <Label htmlFor="walletId">
                Digital Wallet (PayPal / Venmo / Zelle):
              </Label>
              <Input
                type="text"
                id="walletId"
                name="walletId"
                placeholder="Enter Wallet Email or ID"
              />
            </div>
          </div>
        </div>

        {/* Household Info */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Household & Family Composition
          </h2>
          <div className={styles.grid}>
            <div className={styles.formField}>
              <Label>Marital Status</Label>
              <Select
                onValueChange={(v: string) => setValue("maritalStatus", v)}
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
            <div className={styles.formField}>
              <Label htmlFor="householdSize">Household Size</Label>
              <Input
                id="householdSize"
                type="number"
                {...register("householdSize", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className={styles.checkboxRow}>
            <Checkbox
              checked={watch("hasDependents")}
              onCheckedChange={(checked: boolean) =>
                setValue("hasDependents", checked)
              }
              id="hasDependents"
            />
            <Label htmlFor="hasDependents">
              Does the applicant have dependents?
            </Label>
          </div>

          {hasDependents && (
            <>
              <br />
              <h3 className={styles.subTitle}>Dependents Details</h3>
              <br />
              <div className={styles.grid}>
                <div className={styles.formField}>
                  <Label htmlFor="dependent1Name">Dependent 1 Name</Label>
                  <Input id="dependent1Name" {...register("dependent1Name")} />
                </div>
                <div className={styles.formField}>
                  <Label htmlFor="dependent1Dob">Dependent 1 DOB</Label>
                  <Input
                    id="dependent1Dob"
                    type="date"
                    {...register("dependent1Dob")}
                  />
                </div>
                <div className={styles.formField}>
                  <Label>Dependent 1 Relationship</Label>
                  <Select
                    onValueChange={(v: string) =>
                      setValue("dependent1Relation", v)
                    }
                    value={watch("dependent1Relation") || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Son", "Daughter", "Spouse"].map((relation) => (
                        <SelectItem key={relation} value={relation}>
                          {relation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className={styles.grid}>
                <div className={styles.formField}>
                  <Label htmlFor="dependent2Name">Dependent 2 Name</Label>
                  <Input id="dependent2Name" {...register("dependent2Name")} />
                </div>
                <div className={styles.formField}>
                  <Label htmlFor="dependent2Dob">Dependent 2 DOB</Label>
                  <Input
                    id="dependent2Dob"
                    type="date"
                    {...register("dependent2Dob")}
                  />
                </div>
                <div className={styles.formField}>
                  <Label>Dependent 2 Relationship</Label>
                  <Select
                    onValueChange={(v: string) =>
                      setValue("dependent2Relation", v)
                    }
                    value={watch("dependent2Relation") || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Son", "Daughter", "Spouse"].map((relation) => (
                        <SelectItem key={relation} value={relation}>
                          {relation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Medical History */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Medical History</h2>
          <div className={styles.grid}>
            <div className={styles.formField}>
              <Label htmlFor="conditions">Pre-existing Conditions</Label>
              <Textarea
                id="conditions"
                {...register("conditions")}
                className={styles.textArea}
              />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea id="medications" {...register("medications")} />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea id="allergies" {...register("allergies")} />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <Button type="button" className={styles.draftBtn}>
            Save Draft
          </Button>
          <Button
            type="submit"
            className={styles.submitBtn}
            to="/user/data/upload-documents"
          >
            Next: Upload Documents
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CitizenDataEntryForm;
