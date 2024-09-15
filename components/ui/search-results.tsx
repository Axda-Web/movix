import type { Media, Thumbnail } from "@/drizzle/schema";

import { MediaSection } from "../media-section";

type MediaType = Media & { thumbnails: Thumbnail[] };

interface SearchResultsProps {
  queryTerm: string;
  medias: MediaType[];
  totalResults: number;
}

export function SearchResults({
  queryTerm,
  medias,
  totalResults,
}: SearchResultsProps) {
  return (
    <MediaSection
      title={`Found ${totalResults} results for ‘${queryTerm}’`}
      isTrending={false}
      medias={medias}
    />
  );
}
