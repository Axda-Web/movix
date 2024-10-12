"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthFormInput } from "./auth-form-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  signInWithGitHub,
  signInWithGoogle,
  loginUser,
} from "@/server-actions";
import { Github, Chrome } from "lucide-react";
import { registerUser } from "@/server-actions";
import { useRouter } from "next/navigation";
import type { User } from "@/drizzle/schema";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({
    message: "Can't be empty",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  repeatPassword: z.optional(
    z.string().min(8, {
      message: "Password must be at least 8 characters.",
    })
  ),
});

type AuthFormProps = {
  isSignUp?: boolean;
};

export function AuthForm({ isSignUp }: AuthFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSignUp) {
      const result = (await registerUser(values)) as {
        success: boolean;
        user?: User;
        error?: string;
      };

      if (result?.success) {
        console.log("User registered successfully");
        router.push("/account");
      } else {
        console.log("Failed to register user");
      }
    } else {
      await loginUser(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthFormInput placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthFormInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isSignUp ? (
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthFormInput placeholder="Repeat password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        <Button
          className={cn(
            "bg-accent text-white px-24 py-[14px] hover:bg-white hover:text-muted-foreground",
            "text-[15px] font-light tracking-normal w-full"
          )}
          type="submit"
        >
          {isSignUp ? "Create Account" : "Login to your account"}
        </Button>
      </form>
      <div className={cn("flex items-center justify-center gap-3 my-6")}>
        <Separator className={cn("w-1/5")} />
        <span>Or</span>
        <Separator className={cn("w-1/5")} />
      </div>
      {!isSignUp ? (
        <>
          <form action={signInWithGitHub}>
            <Button
              className={cn(
                "w-full text-white flex items-center gap-2 border border-white mt-3 py-[14px] bg-muted transition hover:border-none hover:bg-white hover:text-muted-foreground"
              )}
              type="submit"
            >
              <Github className={cn("w-4 h-4")} />
              Signin with GitHub
            </Button>
          </form>
          <form action={signInWithGoogle}>
            <Button
              className={cn(
                "w-full text-white flex items-center gap-2 border border-white mt-3 py-[14px] bg-muted transition hover:border-none hover:bg-white hover:text-muted-foreground"
              )}
              type="submit"
            >
              <Chrome className={cn("w-4 h-4")} />
              Signin with Google
            </Button>
          </form>
        </>
      ) : null}
    </Form>
  );
}
