import React from "react";
import styles from "./Button.module.css";
import { NavLink } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  to?: string; // For navigation
  variant?: "primary" | "secondary" | "danger" | "outline";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  icon,
  style,
  className,
  to,
  variant = "primary",
  disabled,
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${
    className || ""
  }`;

  if (to) {
    return (
      <NavLink to={to} className={buttonClasses} style={{ ...style }}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      style={{ ...style }}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
