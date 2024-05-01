import { AuthForm } from "@/components/auth-form";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// TODO: replace text utils classes with custom classes

export default function LoginPage(props: any) {
  return (
    <div className={cn("flex flex-col items-center gap-y-20")}>
      <Image src="/icons/movix.svg" width={32} height={26} alt="movix" />
      <article
        className={cn(
          "w-full max-w-[400px] bg-muted p-6 rounded-[20px]",
          "sm:p-8"
        )}
      >
        <h1 className={cn("text-[32px] font-light tracking-[-.5px] mb-4")}>
          Sign Up
        </h1>
        <AuthForm isSignUp />
        <div
          className={cn(
            "text-center text-[15px] font-light tracking-normal mt-6 mb-2"
          )}
        >
          Already have an account?{" "}
          <Link className={cn("text-accent-foreground")} href="/login">
            Login
          </Link>
        </div>
      </article>
    </div>
  );
}
