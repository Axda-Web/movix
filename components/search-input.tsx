import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useQueryState } from "nuqs";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// TODO: Check throttle behaviour in detail

export function SearchInput(props: SearchInputProps) {
  const [_, setQuery] = useQueryState("query", {
    defaultValue: "",
    parse: (value) => value.trim().toLowerCase(),
    shallow: false,
    throttleMs: 2000,
  });

  return (
    <div
      className={cn(
        "flex items-center gap-x-4 flex-1",
        "md:gap-x-6",
        "lg:gap-x-7"
      )}
    >
      <Image
        className={cn("w-5 h-5", "md:w-6 md:h-6")}
        src="/icons/search.svg"
        alt="Search"
        width={24}
        height={24}
      />
      <Input
        {...props}
        className={cn(
          "block w-full bg-transparent py-6 caret-accent focus:outline-none focus-visible:outline-2",
          "md:py-8 md:text-2xl",
          "lg:py-3 lg:focus:border-b lg:border-secondary"
        )}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
