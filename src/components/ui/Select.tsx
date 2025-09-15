import * as React from "react";
import { createContext, useContext } from "react";
import styles from "./Select.module.css";

interface SelectProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
}

interface SelectContextType {
  selectedValue: string | undefined;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ children, onValueChange, value }, _ref) => {
    const [selectedValue, setSelectedValue] = React.useState<
      string | undefined
    >(value?.toString());
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      // Sync internal state to external value; allow undefined to clear selection
      setSelectedValue(value === undefined ? undefined : value.toString());
    }, [value]);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleValueChange = (newValue: string) => {
      setSelectedValue(newValue);
      setIsOpen(false);
      onValueChange?.(newValue);
    };

    return (
      <SelectContext.Provider
        value={{
          selectedValue,
          onValueChange: handleValueChange,
          isOpen,
          setIsOpen,
        }}
      >
        <div
          ref={selectRef}
          className={styles.selectContainer}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {children}
        </div>
      </SelectContext.Provider>
    );
  }
);

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("SelectTrigger must be used within a Select provider");
  }

  const handleClick = () => {
    context.setIsOpen(!context.isOpen);
  };

  return (
    <button
      ref={ref}
      className={`${styles.selectTrigger} ${className || ""}`}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={styles.selectIcon}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );
});

export const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("SelectValue must be used within a Select provider");
  }
  return (
    <span className={styles.selectValue}>
      {context.selectedValue || placeholder}
    </span>
  );
};

export const SelectContent = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("SelectContent must be used within a Select provider");
  }
  return (
    <ul
      className={`${styles.selectContent} ${context.isOpen ? styles.open : ""}`}
      role="listbox"
      aria-activedescendant={context.selectedValue}
    >
      {children}
    </ul>
  );
};

export const SelectItem = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("SelectItem must be used within a Select provider");
  }
  const handleClick = () => {
    context.onValueChange(value);
    // Ensure dropdown closes after selection
    context.setIsOpen(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };
  return (
    <li
      className={styles.selectItem}
      role="option"
      aria-selected={context.selectedValue === value}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      id={value}
    >
      {children}
    </li>
  );
};
