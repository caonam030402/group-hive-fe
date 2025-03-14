import { Button as HerouiButton, type ButtonProps } from "@heroui/button";
import React, { forwardRef } from "react";

interface IProps extends Omit<ButtonProps, "size"> {
  children?: React.ReactNode;
  size?: ButtonProps["size"] | "xxs";
}

const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ children, size, className, ...props }, ref) => {
    const xxsClasses = size === "xxs" ? "h-6 w-6 min-w-2 p-0" : "";

    return (
      <HerouiButton
        ref={ref}
        size={size === "xxs" ? "sm" : size}
        className={`${xxsClasses} ${className || ""}`}
        {...props}
      >
        {children}
      </HerouiButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
