import * as React from "react";
import styles from "./Label.module.css";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`${styles.label} ${className || ""}`}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";
