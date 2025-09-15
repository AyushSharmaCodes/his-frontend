import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import Button from "../../ui/Button";
import { Label } from "../../ui/Label";
import styles from "./CaseWorkerCreate.module.css";
import { MdCancel } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import Checkbox from "../../ui/Checkbox";
import DatePickerWithClose from "../../utility/DatePickerWithClose";

type CaseWorkerFormValues = {
  username: string;
  fullName: string;
  contact: string;
  gender: string;
  dob: Date;
  joiningDate: Date;
  department: string;
  role: string;
  status: boolean;
};

const CaseWorkerCreate: React.FC = () => {
  const { register, handleSubmit, setValue, watch } =
    useForm<CaseWorkerFormValues>({
      defaultValues: {
        status: true,
      },
    });

  const onSubmit = (data: CaseWorkerFormValues) => {
    console.log("Case Worker Data:", data);
  };

  const dob = watch("dob");
  const joiningDate = watch("joiningDate");

  return (
    <div className={styles.form}>
      <hgroup className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create Case Worker Account</h2>
        <Button
          to="/admin/case-workers"
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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <Label htmlFor="username">Username (Email)</Label>
            <Input
              id="username"
              type="email"
              placeholder="Enter email"
              {...register("username", { required: true })}
            />
          </div>

          {/* Personal Info */}
          <div className={styles.formField}>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter full name"
              {...register("fullName", { required: true })}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formField}>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              type="tel"
              placeholder="Enter phone number"
              {...register("contact", { required: true })}
            />
          </div>

          <div className={styles.formField}>
            <Label htmlFor="gender">Gender</Label>
            <Select
              onValueChange={(v: string) => setValue("gender", v)}
              value={watch("gender") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                {["", "Male", "Female", "Other"].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formField}>
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className={styles.dateButton} type="button">
                  <FaRegCalendarAlt className={styles.icon} />
                  {dob ? format(dob, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <DatePickerWithClose
                  selected={dob}
                  onSelect={(date: Date | undefined) =>
                    setValue("dob", date as Date, {
                      shouldValidate: true,
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Job Info */}
          <div className={styles.formField}>
            <Label>Joining Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className={styles.dateButton} type="button">
                  <FaRegCalendarAlt className={styles.icon} />
                  {joiningDate ? format(joiningDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <DatePickerWithClose
                  selected={joiningDate}
                  onSelect={(date: Date | undefined) =>
                    setValue("joiningDate", date as Date, {
                      shouldValidate: true,
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formField}>
            <Label htmlFor="department">Department</Label>
            <Select
              onValueChange={(v: string) => setValue("department", v)}
              value={watch("department") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "",
                  "Eligibility & Enrollment",
                  "Data Collection",
                  "Benefit Issuance",
                  "Correspondence",
                  "General Support",
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={styles.formField}>
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(v: string) => setValue("role", v)}
              value={watch("role") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {["", "Senior Case Worker", "Junior Case Worker"].map(
                  (type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={styles.checkboxRow}>
          <Checkbox
            checked={watch("status")}
            onCheckedChange={(checked: boolean) => setValue("status", checked)}
            id="status"
          />
          <Label htmlFor="status">Active</Label>
        </div>

        <Button type="submit" className={styles.submitBtn}>
          Create Case Worker
        </Button>
      </form>
    </div>
  );
};

export default CaseWorkerCreate;
