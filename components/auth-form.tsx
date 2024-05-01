"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                <Input placeholder="Email address" {...field} />
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
                <Input placeholder="Password" {...field} />
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
                  <Input placeholder="Repeat password" {...field} />
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
    </Form>
  );
}
