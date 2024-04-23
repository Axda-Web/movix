import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ReactNode } from "react";

// TODO: replace text utils classes with custom classes

export function AuthButton({ children }: { children: ReactNode }) {
  return (
    <Button
      className={cn(
        "bg-accent text-white px-24 py-[14px] hover:bg-white hover:text-muted-foreground",
        "text-[15px] font-light tracking-normal"
      )}
    >
      {children}
    </Button>
  );
}
