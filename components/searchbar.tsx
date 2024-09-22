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

// TODO: Make sure the searchbar is 100% width even if their are no results

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
        className={cn("w-full max-h-fit px-4", "md:px-0", "lg:mt-4 lg:mb-6")}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem
              className={cn("flex justify-start items-center space-y-0 flex-1")}
            >
              <FormControl className={cn("w-full")}>
                <SearchInput type="search" placeholder={placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
