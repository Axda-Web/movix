import { AuthButton } from "../components/auth-button";
import { ModeToggle } from "@/components/toggle-mode";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className={cn("flex justify-between")}>
      <AuthButton>Sign in</AuthButton>
      <ModeToggle />
    </main>
  );
}
