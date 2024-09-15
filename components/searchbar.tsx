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

interface SearchBarProps {
  placeholder: string;
}

export function SearchBar({ placeholder }: SearchBarProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
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
                  placeholder={placeholder}
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
