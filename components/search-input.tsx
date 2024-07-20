import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput(props: SearchInputProps) {
  return (
    <>
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
          "block w-full bg-transparent px-4 py-6",
          "md:px-6 md:py-8 md:text-2xl"
        )}
      />
    </>
  );
}
