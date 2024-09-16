import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq, desc, count } from "drizzle-orm";
import type { Metadata } from "next";

import { MediaSection } from "@/components/media-section";
import { MediasPagination } from "@/components/medias-pagination";

export const metadata: Metadata = {
  title: "Movix | Movies",
  description: "Browse our collection of movies",
};

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 16;

  const [movies, movieCount] = await Promise.all([
    await db.query.medias.findMany({
      where: eq(medias.category, "Movie"),
      with: {
        thumbnails: true,
      },
      orderBy: desc(medias.createdAt),
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    }),
    db
      .select({ count: count() })
      .from(medias)
      .where(eq(medias.category, "Movie")),
  ]);

  const totalPages = Math.ceil(
    (movieCount ? movieCount[0].count : 1) / itemsPerPage
  );

  return (
    <div className={cn("px-4", "md:px-0")}>
      <MediaSection title="Movies" isTrending={false} medias={movies} />
      {totalPages > 1 ? <MediasPagination totalPages={totalPages} /> : null}
    </div>
  );
}
