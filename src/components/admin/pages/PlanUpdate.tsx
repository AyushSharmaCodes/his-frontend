import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./PlanUpdate.module.css";
import Button from "../../ui/Button";
import { MdCancel } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Label } from "@/components/ui/Label";
import { format } from "date-fns";
import DatePickerWithClose from "../../utility/DatePickerWithClose";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

type UpdatePlanForm = {
  planCode: string;
  planName: string;
  planType: string;
  description: string;

  minAge?: number;
  maxAge?: number;
  incomeLimit?: number;
  employmentStatus: string;
  mustHaveChildren: boolean;

  monthlyBenefit?: number;
  premiumAmount?: number;
  copay?: number;

  startDate: Date; // required
  endDate?: Date; // optional
  status: string;

  requiredDocs: string[];

  createdBy: string;
  createdDate: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
};

const PlanUpdate: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePlanForm>({
    defaultValues: {
      planCode: "SNAP01",
      planName: "SNAP",
      planType: "Food Assistance",
      description: "Food support for low-income families",
      minAge: 0,
      maxAge: 65,
      incomeLimit: 30000,
      employmentStatus: "Any",
      mustHaveChildren: true,
      monthlyBenefit: 500,
      premiumAmount: 0,
      copay: 0,
      startDate: new Date("2025-01-01"),
      endDate: undefined,
      status: "Active",
      requiredDocs: ["Proof of Income", "ID Proof"],
      createdBy: "AdminUser01",
      createdDate: "2025-01-15",
      lastUpdatedBy: "CurrentAdmin",
      lastUpdatedDate: "2025-09-03",
    },
  });

  const onSubmit: SubmitHandler<UpdatePlanForm> = async (data) => {
    console.log("Updated Plan Data:", data);
    alert("Plan updated! Check console for details.");
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>
        <div>
          <h2 className={styles.formTitle}>Update Plan Details</h2>
          <p className={styles.formSubtitle}>
            Update your plan to match your needs
          </p>
        </div>
        <Button to="/admin/plans" type="button" className={styles.cancelBtn}>
          <MdCancel
            size={22}
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
        {/* Non-editable Field */}
        <div className={styles.section}>
          <h3>Plan Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label htmlFor="planCode">Plan Code</label>
              <input
                id="planCode"
                {...register("planCode")}
                className={styles.input}
                readOnly
              />
            </div>

            {/* Editable Fields */}
            <div className={styles.formField}>
              <label htmlFor="planName">Plan Name</label>
              <input
                id="planName"
                {...register("planName", { required: true })}
                className={styles.input}
              />
              {errors.planName && <span>Name is required</span>}
            </div>

            <div className={styles.formField}>
              <label htmlFor="planType">Plan Type</label>
              <select
                id="planType"
                {...register("planType")}
                className={styles.input}
              >
                <option>Food Assistance</option>
                <option>Child Care</option>
                <option>Health Plan</option>
                <option>Commercial Plan</option>
              </select>
            </div>

            <div className={styles.formField}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                {...register("description")}
                className={styles.textarea}
              />
            </div>
          </div>
        </div>

        {/* Eligibility Rules */}
        <div className={styles.section}>
          <h3>Eligibility Rules</h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>Min Age</label>
              <input
                type="number"
                {...register("minAge", { valueAsNumber: true })}
                className={styles.input}
              />
            </div>
            <div className={styles.formField}>
              <label>Max Age</label>
              <input
                type="number"
                {...register("maxAge", { valueAsNumber: true })}
                className={styles.input}
              />
            </div>
            <div className={styles.formField}>
              <label>Income Limit ($)</label>
              <input
                type="number"
                {...register("incomeLimit", { valueAsNumber: true })}
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label>Employment Status</label>
              <select
                {...register("employmentStatus")}
                className={styles.input}
              >
                <option>Any</option>
                <option>Employed</option>
                <option>Unemployed</option>
              </select>
            </div>

            <div className={styles.checkboxRow}>
              <input
                type="checkbox"
                {...register("mustHaveChildren")}
                id="mustHaveChildren"
              />
              <label htmlFor="mustHaveChildren">Must Have Children</label>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className={styles.section}>
          <h3>Financial Details</h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>Monthly Benefit Amount ($)</label>
              <input
                type="number"
                {...register("monthlyBenefit", { valueAsNumber: true })}
                className={styles.input}
              />
            </div>
            <div className={styles.formField}>
              <label>Premium Amount ($)</label>
              <input
                type="number"
                {...register("premiumAmount", { valueAsNumber: true })}
                className={styles.input}
              />
            </div>
            <div className={styles.formField}>
              <label>Co-Pay ($)</label>
              <input
                type="number"
                {...register("copay", { valueAsNumber: true })}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Plan Lifecycle */}
        <div className={styles.section}>
          <h3>Plan Lifecycle</h3>
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
              <Label>End Date (optional)</Label>
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
              <label>Status</label>
              <select {...register("status")} className={styles.input}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Document Requirements */}
        <div className={styles.section}>
          <h3>Document Requirements</h3>
          <div className={styles.formField}>
            <Label>Add Required Documents</Label>
            <Select
              onValueChange={(v: string) => {
                const docs = watch("requiredDocs");
                if (!docs.includes(v)) {
                  setValue("requiredDocs", [...docs, v]);
                }
              }}
              value={undefined as unknown as string}
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

        {/* Audit Fields */}
        <div className={styles.section}>
          <h3>Audit Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>Created By</label>
              <input
                {...register("createdBy")}
                className={styles.input}
                readOnly
              />
            </div>
            <div className={styles.formField}>
              <label>Created Date</label>
              <input
                {...register("createdDate")}
                className={styles.input}
                readOnly
              />
            </div>
            <div className={styles.formField}>
              <label>Last Updated By</label>
              <input
                {...register("lastUpdatedBy")}
                className={styles.input}
                readOnly
              />
            </div>
            <div className={styles.formField}>
              <label>Last Updated Date</label>
              <input
                {...register("lastUpdatedDate")}
                className={styles.input}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          <GrUpdate
            size={22}
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          {isSubmitting ? "Updating..." : "Update Plan"}
        </Button>
      </form>
    </div>
  );
};

export default PlanUpdate;
