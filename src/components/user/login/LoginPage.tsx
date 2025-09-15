import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";

import logo from "../../../assets/HIS_Logo_white.png";

import LoginCard from "./LoginCard";
import { useForm } from "react-hook-form";

const LoginPage: React.FC = () => {
  const { register, handleSubmit, watch } = useForm();

  const navigate = useNavigate();

  const handleLogin = (data: any) => {
    if (data.username === "admin" && data.password === "admin") {
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } else if (data.username === "user" && data.password === "user") {
      localStorage.setItem("role", "user");
      navigate("/user/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      {/* Left section for desktop */}
      <section className={styles.leftPanel}>
        <div className={styles["left-content"]}>
          <div className={styles["his-logo"]}>
            <img src={logo} alt="HIS_LOGO" />
            <h2>Health Insurance System</h2>
          </div>
          <p className={styles["left-footer"]}>
            © 2024 State Government. All rights reserved.
          </p>
        </div>
      </section>

      {/* Right section */}
      <section className={styles.rightPanel}>
        <LoginCard
          onSubmit={handleSubmit(handleLogin)}
          register={register}
          watch={watch}
        />
      </section>
    </div>
  );
};

export default LoginPage;
