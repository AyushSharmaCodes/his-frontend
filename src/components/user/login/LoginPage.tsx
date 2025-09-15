import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";

import logo from "../../../assets/HIS_Logo_white.png";

import LoginCard from "./LoginCard";
import { useForm } from "react-hook-form";

interface LoginData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<LoginData>();

  const navigate = useNavigate();

  const handleLogin = (data: LoginData) => {
    // TODO: Replace with actual authentication API call
    // For demo purposes only - DO NOT use hardcoded credentials in production
    console.warn("Demo authentication - replace with proper API authentication");
    
    // Simulate authentication validation
    if (data.username && data.password) {
      // This is demo logic - replace with actual API authentication
      if (data.username === "admin") {
        localStorage.setItem("role", "admin");
        navigate("/admin/dashboard");
      } else {
        localStorage.setItem("role", "user");
        navigate("/user/dashboard");
      }
    } else {
      alert("Please enter both username and password");
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
