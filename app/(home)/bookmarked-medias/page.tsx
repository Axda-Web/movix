import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

import { MediaSection } from "@/components/media-section";

// TODO: Add pagination

export default async function BookmarkedMediasPage() {
  const [bookmarkedMovies, bookmarkedSeries] = await Promise.all([
    db.query.medias.findMany({
      where: and(eq(medias.isBookmarked, true), eq(medias.category, "Movie")),
      with: {
        thumbnails: true,
      },
    }),
    db.query.medias.findMany({
      where: and(
        eq(medias.isBookmarked, true),
        eq(medias.category, "TV Series")
      ),
      with: {
        thumbnails: true,
      },
    }),
  ]);

  return (
    <div className={cn("px-4", "md:px-0")}>
      <MediaSection
        title="Bookmarked Movies"
        isTrending={false}
        medias={bookmarkedMovies}
      />
      <MediaSection
        title="Bookmarked TV Series"
        isTrending={false}
        medias={bookmarkedSeries}
      />
    </div>
  );
}
