import { Button as HerouiButton, type ButtonProps } from "@heroui/button";
import React, { forwardRef } from "react";

interface IProps extends ButtonProps {
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ children, ...props }, ref) => {
    return (
      <HerouiButton ref={ref} {...props}>
        {children}
      </HerouiButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
