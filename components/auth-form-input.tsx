import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface AuthFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function AuthFormInput(props: AuthFormInputProps) {
  return (
    <Input
      {...props}
      className={cn(
        "block w-full bg-transparent border-b border-b-secondary p-4 text-[15px] font-light tracking-normal caret-accent",
        "active:border-b-white"
      )}
    />
  );
}
