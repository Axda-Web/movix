import { cn } from "@/lib/utils";
import Image from "next/image";

export const DotSeparator = () => (
  <span className={cn("w-[3px] h-[3px] bg-gray-300 rounded-full")} />
);

interface MediaCategoryProps {
  category: "Movie" | "TV Series";
}

export function MediaCategory({ category }: MediaCategoryProps) {
  const categoryIcon =
    category === "Movie"
      ? "/icons/category-movie.svg"
      : "/icons/category-tv.svg";

  return (
    <span className={cn("flex items-center gap-x-2 text-xs font-light")}>
      <Image
        src={categoryIcon}
        alt="media category icon"
        width={12}
        height={12}
      />
      {category}
    </span>
  );
}
