import React from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfilePage.module.css";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import { Label } from "@/components/ui/Label";

import profile from "./../../../assets/user_profile.jpg";

type ProfileFormValues = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
};

const ProfilePage: React.FC = () => {
  const { register, handleSubmit, setValue, watch } =
    useForm<ProfileFormValues>({
      defaultValues: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zip: "62701",
        notifications: {
          email: true,
          sms: true,
          push: true,
        },
      },
    });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile data:", data);
  };

  return (
    <div className={styles.container}>
      <hgroup className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Case Worker Profile</h1>
      </hgroup>

      <section className={styles.profile}>
        {/* Profile Overview */}
        <div className={styles.section}>
          <div className={styles.profileOverview}>
            <img src={profile} alt="Profile" className={styles.avatar} />
            <h2 className={styles.name}>{watch("fullName")}</h2>
            <Button type="button">Change Profile Photo</Button>
          </div>
        </div>

        {/* Personal Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGrid}>
              <div>
                <Label>Full Name</Label>
                <Input {...register("fullName")} />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input type="email" {...register("email")} />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input {...register("phone")} />
              </div>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </div>

        {/* Address Details */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Address Details</h3>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formField}>
                <Label>Street Address</Label>
                <Input {...register("street")} />
              </div>
              <div className={styles.formField}>
                <Label>City</Label>
                <Input {...register("city")} />
              </div>
              <div className={styles.formField}>
                <Label>State</Label>
                <Input {...register("state")} />
              </div>
              <div className={styles.formField}>
                <Label>Zip Code</Label>
                <Input {...register("zip")} />
              </div>
            </div>
            <Button type="submit">Update Address</Button>
          </form>
        </div>

        {/* Security Settings */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Security Settings</h3>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGrid}>
              <div>
                <Label>Current Password</Label>
                <Input type="password" {...register("currentPassword")} />
              </div>
              <div>
                <Label>New Password</Label>
                <Input type="password" {...register("newPassword")} />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" {...register("confirmPassword")} />
              </div>
            </div>
            <Button type="submit">Change Password</Button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Notification Preferences</h3>
          <div className={styles.checkboxGroup}>
            <div className={styles.checkboxRow}>
              <Checkbox
                id="emailNotifications"
                checked={watch("notifications.email")}
                onCheckedChange={(checked: boolean) =>
                  setValue("notifications.email", checked)
                }
              />
              <Label htmlFor="emailNotifications">
                Receive email notifications
              </Label>
            </div>
            <div className={styles.checkboxRow}>
              <Checkbox
                id="smsNotifications"
                checked={watch("notifications.sms")}
                onCheckedChange={(checked: boolean) =>
                  setValue("notifications.sms", checked)
                }
              />
              <Label htmlFor="smsNotifications">
                Receive SMS notifications
              </Label>
            </div>
            <div className={styles.checkboxRow}>
              <Checkbox
                id="pushNotifications"
                checked={watch("notifications.push")}
                onCheckedChange={(checked: boolean) =>
                  setValue("notifications.push", checked)
                }
              />
              <Label htmlFor="pushNotifications">
                Receive push notifications
              </Label>
            </div>
          </div>
          <Button type="button">Save Preferences</Button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
