import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias, thumbnails } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import { SearchBar } from "@/components/searchbar";
import { MediaCard } from "@/components/media-card";

export default async function Home() {
  const [trendingMedias, recommendedMedias] = await Promise.all([
    db.query.medias.findMany({
      where: eq(medias.isTrending, true),
      with: {
        thumbnails: true,
      },
    }),
    db.query.medias.findMany({
      where: eq(medias.isTrending, false),
      with: {
        thumbnails: true,
      },
    }),
  ]);

  return (
    <main className={cn()}>
      <SearchBar />
      <div>
        <section className={cn("overflow-x-auto mb-6", "md:mb-10")}>
          <h2 className={cn("text-xl font-light mb-4", "md:text-3xl md:mb-6")}>
            Trending
          </h2>
          <div className={cn("flex gap-x-4")}>
            {trendingMedias.map((media) => (
              <MediaCard
                key={media.id}
                isTrending
                category={media.category}
                media={media}
              />
            ))}
          </div>
        </section>
        <section className={cn("mb-6", "md:mb-10")}>
          <h2 className={cn("text-xl font-light mb-4", "md:text-3xl md:mb-6")}>
            Recommended for you
          </h2>
          <div
            className={cn(
              "grid grid-cols-2 px-4 gap-4",
              "md:grid-cols-3 md:px-0 md:gap-6",
              "lg:grid-cols-4 lg:gap-10"
            )}
          >
            {recommendedMedias.map((media) => (
              <MediaCard
                key={media.id}
                isTrending={false}
                category="Movie"
                media={media}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
