import { cn } from "@/lib/utils";

import { MediaCard } from "./media-card";
import type { Media, Thumbnail } from "@/drizzle/schema";

type MediaType = Media & { thumbnails: Thumbnail[] };
interface MediaCardProps {
  title: string;
  isTrending: boolean;
  medias: MediaType[];
}

export function MediaSection({ title, isTrending, medias }: MediaCardProps) {
  const sectionStyling = isTrending
    ? cn("flex gap-x-4 overflow-x-auto hide-scrollbar", "md:gap-x-10")
    : cn(
        "grid grid-cols-2 gap-4",
        "md:grid-cols-3 md:gap-6",
        "lg:grid-cols-4 lg:gap-10"
      );
  return (
    <section className={cn("mb-6", "md:mb-10")}>
      <h2 className={cn("text-xl font-light mb-4", "md:text-3xl md:mb-6")}>
        {title}
      </h2>
      <div className={sectionStyling}>
        {medias.map((media) => (
          <MediaCard key={media.id} isTrending={isTrending} media={media} />
        ))}
      </div>
    </section>
  );
}
