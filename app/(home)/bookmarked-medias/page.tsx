import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import { MediaSection } from "@/components/media-section";

export default async function BookmarkedMediasPage() {
  const bookmarkedMedias = await db.query.medias.findMany({
    where: eq(medias.isBookmarked, true),
    with: {
      thumbnails: true,
    },
  });

  return (
    <div className={cn("px-4", "md:px-0")}>
      <MediaSection
        title="Bookmarked Medias"
        isTrending={false}
        medias={bookmarkedMedias}
      />
    </div>
  );
}
