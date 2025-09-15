import React from "react";
import { useForm } from "react-hook-form";
import styles from "./CitizenOnboarding.module.css";

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
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import DatePickerWithClose from "../../utility/DatePickerWithClose";
import { useNavigate } from "react-router-dom";

type OnboardingForm = {
  firstName: string;
  lastName: string;
  ssn: string;
  dob: Date;
  gender: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  healthPlan: string;
};

const CitizenOnboarding: React.FC = () => {
  const { register, handleSubmit, watch, setValue } = useForm<OnboardingForm>();
  const navigate = useNavigate();

  const onSubmit = (data: OnboardingForm) => {
    console.log("Onboarding data:", data);
    navigate("/user/applications/validate");
  };

  const dob = watch("dob");

  return (
    <div className={styles.container}>
      <hgroup className={styles.formHeader}>
        <div>
          <h1 className={styles.title}>Citizen Onboarding</h1>
          <p className={styles.subtitle}>
            Please fill out the form below to apply for health insurance
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
        {/* Personal Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <div className={styles.grid}>
            <div>
              <Label>First Name *</Label>
              <Input placeholder="John" {...register("firstName")} />
            </div>
            <div>
              <Label>Last Name *</Label>
              <Input placeholder="Doe" {...register("lastName")} />
            </div>
            <div>
              <Label>SSN / Aadhar Equivalent</Label>
              <Input placeholder="XXX-XX-XXXX" {...register("ssn")} />
            </div>
          </div>
          <div className={styles.grid}>
            <div>
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
            <div>
              <Label>Gender</Label>
              <Select
                onValueChange={(v: string) => setValue("gender", v)}
                value={watch("gender") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {["", "Male", "Female", "Others"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact Information</h3>
          <div className={styles.grid}>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="john.doe@example.com"
                {...register("email")}
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="(123) 456-7890"
                {...register("phone")}
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Address Information</h3>
          <div className={styles.grid}>
            <div>
              <Label>Address Line 1</Label>
              <Input placeholder="123 Main St" {...register("address1")} />
            </div>
            <div>
              <Label>Address Line 2 (Optional)</Label>
              <Input
                placeholder="Apt, Suite, Bldg (optional)"
                {...register("address2")}
              />
            </div>
          </div>
          <div className={styles.grid}>
            <div>
              <Label>City</Label>
              <Input placeholder="city" {...register("city")} />
            </div>
            <div>
              <Label>State</Label>
              <Select
                onValueChange={(v: string) => setValue("state", v)}
                value={watch("state") || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {["California", "New Jersey", "Illinois"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Zip Code</Label>
              <Input placeholder="12345" {...register("zip")} />
            </div>
          </div>
        </div>

        {/* Health Plan Selection */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Health Plan Selection</h3>
          <div>
            <Label>Choose Your Plan</Label>
            <Select
              onValueChange={(v: string) => setValue("healthPlan", v)}
              value={watch("healthPlan") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Plan to register" />
              </SelectTrigger>
              <SelectContent>
                {["SNAP", "CCAP", "Medicaid"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className={styles.submitBtn}>
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default CitizenOnboarding;
