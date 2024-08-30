import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

import { MediaSection } from "@/components/media-section";

// TODO: Switch from horizontal scroll to shadcn carousel
// TODO: Add pagination or infinite scroll to the recommended for you section
// TODO: Fix media card width problem on desktop

export default async function Home() {
  const [trendingMedias, recommendedMedias] = await Promise.all([
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
    }),
  ]);

  return (
    <div className={cn("px-4", "md:px-0")}>
      <MediaSection
        title="Trending"
        isTrending={true}
        medias={trendingMedias}
      />
      <MediaSection
        title="Recommended for you"
        isTrending={false}
        medias={recommendedMedias}
      />
    </div>
  );
}
