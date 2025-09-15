import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Label } from "../../ui/Label";
import { Textarea } from "../../ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";

import { FaRegCalendarAlt } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { format } from "date-fns";
import styles from "./PlanCreate.module.css";
import DatePickerWithClose from "../../utility/DatePickerWithClose";

type PlanFormValues = {
  planName: string;
  planCode: string;
  planType: string;
  description?: string;

  minAge?: number;
  maxAge?: number;
  incomeLimit?: number;
  employmentStatus?: string;
  mustHaveChildren: boolean;

  monthlyBenefit?: number;
  premiumAmount?: number;
  copay?: number;

  startDate: Date; // required
  endDate?: Date;
  status: string;

  requiredDocs: string[];
};

const PlanCreate: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<PlanFormValues>({
    defaultValues: {
      mustHaveChildren: false,
      requiredDocs: [],
    },
  });

  const onSubmit = (data: PlanFormValues) => {
    console.log("Form Data:", data);
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className={styles.form}>
      <hgroup className={styles.formHeader}>
        <div>
          <h2 className={styles.formTitle}>Create New Plan</h2>
          <p className={styles.formSubtitle}>
            Fill in the details below to create a new assistance plan
          </p>
        </div>
        <Button to="/admin/plans" type="button" className={styles.cancelBtn}>
          <MdCancel
            size={22}
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          Cancel
        </Button>
      </hgroup>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
        {/* Basic Details */}
        <div className={styles.section}>
          <h3>Plan Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <Label htmlFor="planName">Plan Name *</Label>
              <Input
                id="planName"
                placeholder="Enter plan name"
                {...register("planName", { required: true })}
                className={styles.input}
              />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="planCode">Plan Code *</Label>
              <Input
                id="planCode"
                placeholder="Enter plan code"
                {...register("planCode", { required: true })}
                className={styles.input}
              />
            </div>
            <div className={styles.formField}>
              <Label>Plan Type *</Label>
              <Select
                onValueChange={(v: string) => setValue("planType", v)}
                value={watch("planType") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Food Assistance",
                    "Child Care",
                    "Health",
                    "Commercial",
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={`${styles.formField} ${styles.formGridFull}`}>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter plan description"
                {...register("description")}
                className={styles.textarea}
              />
            </div>
          </div>
        </div>

        {/* Eligibility Rules */}
        <div className={styles.section}>
          <h3>Eligibility Requirements</h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <Label htmlFor="minAge">Minimum Age</Label>
              <Input
                id="minAge"
                type="number"
                placeholder="e.g., 18"
                {...register("minAge", { valueAsNumber: true })}
              />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="maxAge">Maximum Age</Label>
              <Input
                id="maxAge"
                type="number"
                placeholder="e.g., 65"
                {...register("maxAge", { valueAsNumber: true })}
              />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="incomeLimit">Income Limit ($)</Label>
              <Input
                id="incomeLimit"
                type="number"
                placeholder="e.g., 50000"
                {...register("incomeLimit", { valueAsNumber: true })}
              />
            </div>
            <div className={styles.formField}>
              <Label>Employment Status</Label>
              <Select
                onValueChange={(v: string) => setValue("employmentStatus", v)}
                value={watch("employmentStatus") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  {["Any", "Unemployed", "Employed"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={styles.checkboxRow}>
            <Checkbox
              checked={watch("mustHaveChildren")}
              onCheckedChange={(checked: boolean) =>
                setValue("mustHaveChildren", checked)
              }
              id="mustHaveChildren"
            />
            <Label htmlFor="mustHaveChildren">Must have Children</Label>
          </div>
        </div>

        {/* Financial Details */}
        <div className={styles.section}>
          <h3>Financial Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <Label htmlFor="monthlyBenefit">Monthly Benefit Amount ($)</Label>
              <Input
                id="monthlyBenefit"
                type="number"
                placeholder="e.g., 500"
                {...register("monthlyBenefit", { valueAsNumber: true })}
              />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="premiumAmount">Premium Amount ($)</Label>
              <Input
                id="premiumAmount"
                type="number"
                placeholder="e.g., 50"
                {...register("premiumAmount", { valueAsNumber: true })}
              />
            </div>
            <div className={styles.formField}>
              <Label htmlFor="copay">Co-Pay Amount ($)</Label>
              <Input
                id="copay"
                type="number"
                placeholder="e.g., 25"
                {...register("copay", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* Plan Lifecycle */}
        <div className={styles.section}>
          <h3>Plan Schedule & Status</h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <Label>Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className={styles.dateButton} type="button">
                    <FaRegCalendarAlt className={styles.icon} />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <DatePickerWithClose
                    selected={startDate}
                    onSelect={(date: Date | undefined) =>
                      setValue("startDate", date as Date, {
                        shouldValidate: true,
                      })
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className={styles.formField}>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className={styles.dateButton} type="button">
                    <FaRegCalendarAlt className={styles.icon} />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <DatePickerWithClose
                    selected={endDate}
                    onSelect={(date: Date | undefined) =>
                      setValue("endDate", date)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className={styles.formField}>
              <Label>Status</Label>
              <Select
                onValueChange={(v: string) => setValue("status", v)}
                value={watch("status") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {["Active", "Inactive"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Document Requirements */}
        <div className={styles.section}>
          <h3>Required Documents</h3>
          <div className={styles.formField}>
            <Label>Add Required Documents</Label>
            <Select
              onValueChange={(v: string) => {
                const docs = watch("requiredDocs");
                if (!docs.includes(v)) {
                  setValue("requiredDocs", [...docs, v]);
                }
              }}
              value={undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select documents to add" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Proof of Income",
                  "ID Proof",
                  "Residency Proof",
                  "Employment Verification",
                  "Bank Statements",
                ].map((doc) => (
                  <SelectItem key={doc} value={doc}>
                    {doc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className={styles.badgeContainer}>
              {watch("requiredDocs").map((doc) => (
                <span key={doc} className={styles.badge}>
                  {doc}
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "requiredDocs",
                        watch("requiredDocs").filter((d) => d !== doc)
                      )
                    }
                    className={styles.badgeRemove}
                    title="Remove document"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" className={styles.submitBtn}>
          <IoCreate
            size={22}
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          Create Plan
        </Button>
      </form>
    </div>
  );
};

export default PlanCreate;
