import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function MoviesLoading() {
  return (
    <div
      className={cn(
        "min-h-screen w-full mx-auto max-w-[1272px] px-4",
        "md:px-6 md:py-6",
        "lg:py-8"
      )}
    >
      <div className={cn("mb-6 mt-16", "md:mb-10 md:mt-24")}>
        <Skeleton className={cn("w-[150px] h-[30px] mb-8", "md:w-[300px]")} />
        <div
          className={cn(
            "grid max-w-full grid-cols-2 gap-4",
            "md:grid-cols-3 md:gap-6",
            "lg:grid-cols-4 lg:gap-10"
          )}
        >
          {Array.from({ length: 16 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                "rounded-lg w-[164px] h-[110px]",
                "md:w-[220px] md:h-[140px]",
                "lg:w-[280px] lg:h-[174px]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
