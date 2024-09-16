import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq, desc, count, ilike, and } from "drizzle-orm";
import type { Media, Thumbnail } from "@/drizzle/schema";
type MediaType = Media & { thumbnails: Thumbnail[] };
import type { Metadata } from "next";

import { MediaSection } from "@/components/media-section";
import { MediasPagination } from "@/components/medias-pagination";
import { SearchResults } from "@/components/ui/search-results";
import { searchParamsCache } from "@/searchParams";

export const metadata: Metadata = {
  title: "Movix | Home",
  description: "Movix is a movie and TV show streaming platform",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, query } = searchParamsCache.parse(searchParams);
  const currentPage = page || 1;
  const itemsPerPage = 12;

  let mediaSearchResults: MediaType[] = [];
  let mediaSearchCount = [{ count: 0 }];

  if (query) {
    [mediaSearchResults, mediaSearchCount] = await Promise.all([
      db.query.medias.findMany({
        where: ilike(medias.title, `%${query}%`),
        with: {
          thumbnails: true,
        },
      }),
      db
        .select({ count: count() })
        .from(medias)
        .where(ilike(medias.title, `%${query}%`)),
    ]);
  }

  const [trendingMedias, recommendedMedias, mediaCount] = await Promise.all([
    db.query.medias.findMany({
      where: eq(medias.isTrending, true),
      with: {
        thumbnails: true,
      },
      orderBy: [desc(medias.createdAt), desc(medias.title)],
    }),
    db.query.medias.findMany({
      where: eq(medias.isTrending, false),
      with: {
        thumbnails: true,
      },
      orderBy: [desc(medias.createdAt), desc(medias.title)],
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    }),
    db
      .select({ count: count() })
      .from(medias)
      .where(eq(medias.isTrending, false)),
  ]);

  const totalPages = Math.ceil(
    (mediaCount ? mediaCount[0].count : 1) / itemsPerPage
  );

  return (
    <div className={cn("px-4", "md:px-0")}>
      {query ? (
        <SearchResults
          queryTerm={query}
          medias={mediaSearchResults}
          totalResults={mediaSearchCount[0].count}
        />
      ) : (
        <>
          <MediaSection
            title="Trending"
            isTrending={true}
            medias={trendingMedias}
          />
          <div id="recommended-section">
            <MediaSection
              title="Recommended for you"
              isTrending={false}
              medias={recommendedMedias}
            />
            {totalPages > 1 ? (
              <MediasPagination totalPages={totalPages} />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
