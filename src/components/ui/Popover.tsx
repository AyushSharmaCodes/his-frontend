import * as React from "react";
import { createContext, useContext } from "react";
import styles from "./Popover.module.css";

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: () => void;
  close: () => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a Popover provider");
  }
  return context;
};

export const Popover = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <PopoverContext.Provider
      value={{ isOpen, setIsOpen, onClose: handleClose, close: handleClose }}
    >
      <div ref={popoverRef} className={styles.popover}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("PopoverTrigger must be used within a Popover provider");
  }

  const handleClick = () => {
    context.setIsOpen(!context.isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    } as any);
  }

  return <div onClick={handleClick}>{children}</div>;
};

export const PopoverContent = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("PopoverContent must be used within a Popover provider");
  }

  return (
    <div
      className={`${styles.popoverContent} ${
        context.isOpen ? styles.open : ""
      }`}
    >
      {children}
    </div>
  );
};
