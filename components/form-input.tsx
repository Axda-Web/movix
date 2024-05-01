import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type FormInputProps = {
  placeholder?: string;
};

export function FormInput({ placeholder }: FormInputProps) {
  return <Input className={cn("")} placeholder={placeholder} />;
}
