import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { MediaCategory, DotSeparator } from "./media-category";
import type { Media, Thumbnail } from "@/drizzle/schema";
import { BookmarkBtn } from "./bookmark-btn";
import { MediaPlayBtn } from "./ui/media-play-btn";
import Link from "next/link";

interface MediaCardProps {
  isTrending: boolean;
  media: Media & { thumbnails: Thumbnail[] };
}

export function MediaCard({ isTrending, media }: MediaCardProps) {
  const serializedThumbnails = media.thumbnails.reduce(
    (acc, curr) => {
      if (!acc[curr.type]) {
        acc[curr.type] = {};
      }
      acc[curr.type][curr.size] = curr.url;
      return acc;
    },
    {} as Record<string, Record<string, string>>
  );

  return (
    <Card
      className={cn("bg-transparent border-none relative flex-shrink-0 w-fit")}
    >
      <CardContent className={cn("p-0 relative w-fit group cursor-pointer")}>
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent rounded-lg"
          )}
        />
        {isTrending ? (
          <>
            <Image
              src={serializedThumbnails.trending.large}
              width={470}
              height={230}
              className={cn(
                "hidden rounded-lg",
                "md:block md:w-[470px] md:h-[230px]"
              )}
              alt="trending media thumbnail"
              priority
            />
            <Image
              src={serializedThumbnails.trending.small}
              width={240}
              height={140}
              className={cn(
                "block rounded-lg w-[240px] h-[140px]",
                "md:hidden"
              )}
              alt="trending media thumbnail"
              priority
            />
            <BookmarkBtn
              isBookmarked={media.isBookmarked}
              mediaId={media.id}
              mediaTitle={media.title}
            />
            <MediaPlayBtn />
          </>
        ) : (
          <>
            <Image
              src={serializedThumbnails.regular.large}
              width={280}
              height={174}
              className={cn(
                "hidden rounded-lg",
                "xl:block xl:w-[280px] xl:h-[174px]"
              )}
              alt="trending media thumbnail"
            />
            <Image
              src={serializedThumbnails.regular.medium}
              width={220}
              height={140}
              className={cn(
                "hidden rounded-lg",
                "md:block md:w-[220px] md:h-[140px]",
                "xl:hidden"
              )}
              alt="trending media thumbnail"
            />
            <Image
              src={serializedThumbnails.regular.small}
              width={164}
              height={110}
              className={cn(
                "block rounded-lg w-[164px] h-[110px]",
                "md:hidden"
              )}
              alt="trending media thumbnail"
            />
            <BookmarkBtn
              isBookmarked={media.isBookmarked}
              mediaId={media.id}
              mediaTitle={media.title}
            />
            <MediaPlayBtn />
          </>
        )}
      </CardContent>
      <CardFooter
        className={cn("flex flex-col mt-2 pb-2", {
          "md:absolute md:bottom-2 md:left-6 md:pb-0 md:mt-0": isTrending,
        })}
      >
        <CardDescription
          className={cn(
            "flex gap-x-2 items-center text-gray-300 text-[11px] font-light",
            "md:text-[13px]"
          )}
        >
          <span>{media.year}</span>
          <DotSeparator />
          <MediaCategory category={media.category} />
          <DotSeparator />
          <span>{media.rating}</span>
        </CardDescription>
        <CardTitle
          className={cn("text-sm font-medium text-foreground", "md:text-lg")}
        >
          {media.title}
        </CardTitle>
      </CardFooter>
    </Card>
  );
}
