import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq, desc, count } from "drizzle-orm";

import { MediaSection } from "@/components/media-section";
import { MediasPagination } from "@/components/medias-pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 12;

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
        {totalPages > 1 ? <MediasPagination totalPages={totalPages} /> : null}
      </div>
    </div>
  );
}
