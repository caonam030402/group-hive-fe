import { Button as HerouiButton, type ButtonProps } from "@heroui/button";
import React from "react";

interface IProps extends ButtonProps {
  children?: React.ReactNode;
}

export default function Button({ children, ...props }: IProps) {
  return <HerouiButton {...props}>{children}</HerouiButton>;
}
