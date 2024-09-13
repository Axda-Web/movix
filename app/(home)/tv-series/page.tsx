import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq, desc, count } from "drizzle-orm";

import { MediaSection } from "@/components/media-section";
import { MediasPagination } from "@/components/medias-pagination";
export default async function TVSeriesPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 16;

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
      <MediaSection title="TV Series" isTrending={false} medias={tvSeries} />
      {totalPages > 1 ? <MediasPagination totalPages={totalPages} /> : null}
    </div>
  );
}
