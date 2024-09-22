import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq, desc, count, ilike, and } from "drizzle-orm";
import type { Metadata } from "next";
import type { Media, Thumbnail } from "@/drizzle/schema";
import { searchParamsCache } from "@/searchParams";

import { MediaSection } from "@/components/media-section";
import { MediasPagination } from "@/components/medias-pagination";
import { SearchResults } from "@/components/ui/search-results";

type MediaType = Media & { thumbnails: Thumbnail[] };

export const metadata: Metadata = {
  title: "Movix | TV Series",
  description: "Browse our collection of TV series",
};

export default async function TVSeriesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, query } = searchParamsCache.parse(searchParams);
  const currentPage = page || 1;
  const itemsPerPage = 16;

  let tvSeriesSearchResults: MediaType[] = [];
  let tvSeriesSearchCount = [{ count: 0 }];
  let isSearchQueryPending = true;

  if (query?.length > 0) {
    [tvSeriesSearchResults, tvSeriesSearchCount] = await Promise.all([
      db.query.medias.findMany({
        where: and(
          eq(medias.category, "TV Series"),
          ilike(medias.title, `%${query}%`)
        ),
        with: {
          thumbnails: true,
        },
        offset: (currentPage - 1) * itemsPerPage,
      }),
      db
        .select({ count: count() })
        .from(medias)
        .where(
          and(
            eq(medias.category, "TV Series"),
            ilike(medias.title, `%${query}%`)
          )
        ),
    ]);
    isSearchQueryPending = false;
  }

  const [tvSeries, tvSeriesCount] = await Promise.all([
    await db.query.medias.findMany({
      where: eq(medias.category, "TV Series"),
      with: {
        thumbnails: true,
      },
      orderBy: [desc(medias.createdAt), desc(medias.id)],
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    }),
    db
      .select({ count: count() })
      .from(medias)
      .where(eq(medias.category, "TV Series")),
  ]);

  const totalPages = Math.ceil(
    (tvSeriesCount ? tvSeriesCount[0].count : 1) / itemsPerPage
  );

  return (
    <div className={cn("px-4", "md:px-0")}>
      {query?.length > 0 ? (
        <SearchResults
          queryTerm={query}
          medias={tvSeriesSearchResults}
          totalResults={tvSeriesSearchCount[0].count}
          isSearchQueryPending={isSearchQueryPending}
        />
      ) : (
        <>
          <MediaSection
            title="TV Series"
            isTrending={false}
            medias={tvSeries}
          />
          {totalPages > 1 ? <MediasPagination totalPages={totalPages} /> : null}
        </>
      )}
    </div>
  );
}
