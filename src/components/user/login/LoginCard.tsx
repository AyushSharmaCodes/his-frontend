import React, { useEffect, useState } from "react";
import styles from "./LoginCard.module.css";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import { Label } from "../../ui/Label";
import { NavLink } from "react-router-dom";

interface LoginCardProps {
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

const LoginCard: React.FC<LoginCardProps> = ({ onSubmit, register, watch }) => {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const roleHint = (watch("username") as string) || "";
  const welcomeText =
    roleHint === "admin"
      ? "Welcome Admin"
      : roleHint === "user"
      ? "Welcome User"
      : "Welcome Back";

  useEffect(() => {
    if (!roleHint) {
      setShowPasswordSection(false);
    }
  }, [roleHint]);

  return (
    <div className={styles["right-content"]}>
      <h1 className={styles.welcome}>{welcomeText}</h1>
      <p className={styles.subtitle}>Please sign in to access the dashboard</p>

      <form
        className={styles.form}
        onSubmit={(e) => {
          if (!showPasswordSection) {
            e.preventDefault();
            setShowPasswordSection(true);
            return;
          }
          onSubmit(e);
        }}
      >
        <div className={styles["form-group"]}>
          <Label htmlFor="username">Username or Email</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            {...register("username", { required: true })}
          />
        </div>

        <section hidden={!showPasswordSection}>
          <div className={styles["form-group"]}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
        </section>

        <div className={styles.options}>
          <Checkbox
            label="Remember me"
            checked={false}
            onCheckedChange={() => {}}
            id="rememberMe"
          />
          <NavLink to={"/reset-password"} className={styles.forgotLink}>
            Forgot your password?
          </NavLink>
        </div>

        <Button type="submit">{showPasswordSection ? "Log in" : "Next"}</Button>
      </form>

      <p className={styles.support}>
        Having trouble? <a href="#">Contact Support</a>
      </p>
    </div>
  );
};

export default LoginCard;
