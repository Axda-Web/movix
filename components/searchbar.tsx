"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SearchInput } from "./search-input";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  search: z.string().trim().max(50),
});

// TODO: Implement onChange form submission
// TODO: Add debouncer

export function SearchBar() {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full max-h-fit px-4", "md:px-6", "lg:px-0")}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem
              className={cn("flex justify-start items-center space-y-0")}
            >
              <FormControl>
                <SearchInput
                  type="search"
                  placeholder="Search for movies or TV series"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    console.log(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
