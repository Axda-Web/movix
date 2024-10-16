import { cn } from "@/lib/utils";

import { MediaCard } from "./media-card";
import { TrendingMediasCarousel } from "./trending-medias-carousel";
import type { Media, Thumbnail } from "@/drizzle/schema";

type MediaType = Media & { thumbnails: Thumbnail[] };
interface MediaCardProps {
  title: string;
  isTrending: boolean;
  medias: MediaType[];
}

export function MediaSection({ title, isTrending, medias }: MediaCardProps) {
  return (
    <section className={cn("mb-6", "md:mb-10")}>
      <h2 className={cn("text-xl font-light mb-4", "md:text-3xl md:mb-6")}>
        {title}
      </h2>
      {isTrending ? (
        <TrendingMediasCarousel medias={medias} />
      ) : (
        <div
          className={cn(
            "grid grid-cols-2 gap-4",
            "md:grid-cols-3 md:gap-6",
            "xl:grid-cols-4 xl:gap-10"
          )}
        >
          {medias.map((media) => (
            <MediaCard key={media.id} isTrending={isTrending} media={media} />
          ))}
        </div>
      )}
    </section>
  );
}
