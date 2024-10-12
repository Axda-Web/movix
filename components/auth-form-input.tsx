import * as React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface AuthFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const AuthFormInput = React.forwardRef<
  HTMLInputElement,
  AuthFormInputProps
>((props, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      className={cn(
        "block w-full bg-transparent border-b border-b-secondary p-4 text-[15px] font-light tracking-normal caret-accent",
        "active:border-b-white"
      )}
    />
  );
});

AuthFormInput.displayName = "AuthFormInput";
