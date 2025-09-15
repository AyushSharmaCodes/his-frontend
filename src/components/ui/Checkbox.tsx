import React from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onCheckedChange,
  id,
}) => {
  return (
    <label htmlFor={id} className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        id={id}
      />
      {label}
    </label>
  );
};

export default Checkbox;
