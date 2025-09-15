import React from "react";
import { useForm } from "react-hook-form";
import styles from "./ForgotPassword.module.css";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { NavLink } from "react-router-dom";

import logo from "../../../assets/HIS_Logo_Color.png";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const onSubmit = (data: ForgotPasswordForm) => {
    console.log("Reset link requested for:", data.email);
    // API call would go here
  };

  console.log(watch("email"));

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src={logo} alt="HIS Logo" />
          HIS
        </div>

        {/* Title & Instructions */}
        <h2 className={styles.title}>Forgot Your Password?</h2>
        <p className={styles.subtitle}>
          Enter your registered email address to receive a password reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label className={styles.label} htmlFor="email">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}

          <Button type="submit" className={styles.button}>
            Send Reset Link
          </Button>
        </form>

        {/* Back link */}
        <div className={styles.backLink}>
          <NavLink to={"/"} className={styles.backLink}>
            Back to Login Page
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
