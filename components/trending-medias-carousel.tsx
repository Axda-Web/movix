import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Media, Thumbnail } from "@/drizzle/schema";
import { MediaCard } from "./media-card";

type MediaType = Media & { thumbnails: Thumbnail[] };

interface TrendingMediasCarouselProps {
  medias: MediaType[];
}

// TODO: Manage carousel cards size responsivness

export function TrendingMediasCarousel({
  medias,
}: TrendingMediasCarouselProps) {
  return (
    <Carousel>
      <CarouselContent className={cn("")}>
        {medias.map((media) => (
          <CarouselItem key={media.id}>
            <MediaCard isTrending media={media} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className={cn("flex justify-between items-center mt-2", "md:mt-4")}>
        <div className={cn("flex gap-x-2")}>
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <CarouselDots />
      </div>
    </Carousel>
  );
}
