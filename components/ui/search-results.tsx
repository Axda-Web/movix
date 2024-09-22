import type { Media, Thumbnail } from "@/drizzle/schema";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

import { MediaSection } from "../media-section";

type MediaType = Media & { thumbnails: Thumbnail[] };

interface SearchResultsProps {
  queryTerm: string;
  medias: MediaType[];
  totalResults: number;
  isSearchQueryPending: boolean;
}

export function SearchResults({
  queryTerm,
  medias,
  totalResults,
  isSearchQueryPending,
}: SearchResultsProps) {
  if (medias.length === 0 && isSearchQueryPending) {
    return (
      <div
        className={cn(
          "min-h-screen w-full mx-auto max-w-[1272px] px-4",
          "md:px-6 md:py-4"
        )}
      >
        <div className={cn("mb-6", "md:mb-24")}>
          <Skeleton className={cn("w-[150px] h-[30px] mb-8", "md:w-[300px]")} />
          <div
            className={cn(
              "grid max-w-full grid-cols-2 gap-4",
              "md:grid-cols-3 md:gap-6",
              "lg:grid-cols-4 lg:gap-10"
            )}
          >
            {Array.from({ length: 12 }).map((_, index) => (
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

  return (
    <MediaSection
      title={`Found ${totalResults} results for ‘${queryTerm}’`}
      isTrending={false}
      medias={medias}
    />
  );
}
