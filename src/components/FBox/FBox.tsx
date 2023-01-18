import { ReactNode } from "react";
import styles from "./FBox.module.css";

type FBoxProps = {
  children?: ReactNode;
  className?: string;
  padding?: string;
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "center" | "flex-start" | "flex-end";
  maxWidth?: boolean;
  maxHeight?: boolean;
  onClick?: () => void;
};

const FBox = ({
  children,
  className,
  padding,
  alignItems,
  justifyContent,
  maxWidth,
  maxHeight,
  onClick,
}: FBoxProps) => {
  return (
    <div
      style={{
        padding: padding,
        alignItems: alignItems,
        justifyContent: justifyContent,
        width: maxWidth ? "100%" : "",
        height: maxHeight ? "100%" : "",
      }}
      className={`${styles.container} ${className ? className : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FBox;
