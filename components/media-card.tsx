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

interface MediaCardProps {
  isTrending: boolean;
  media: Media & { thumbnails: Thumbnail[] };
}

// TODO: Fix image size + Grid
// TODO: Add bookmark feature
// TODO: Add trending slider
// TODO: Add active and hover states

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
    <Card className={cn("bg-transparent border-none relative flex-shrink-0")}>
      <CardContent className={cn("p-0 relative w-fit")}>
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
            />
            <div
              className={cn(
                "absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
              )}
            >
              <Image
                src="/icons/bookmark-empty.svg"
                width={12}
                height={14}
                alt="bookmark icon"
              />
            </div>
          </>
        ) : (
          <>
            <Image
              src={serializedThumbnails.regular.large}
              width={280}
              height={174}
              className={cn(
                "hidden rounded-lg",
                "lg:block lg:w-[280px] lg:h-[174px]"
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
                "lg:hidden"
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
            <div
              className={cn(
                "absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
              )}
            >
              <Image
                src="/icons/bookmark-empty.svg"
                width={12}
                height={14}
                alt="bookmark icon"
              />
            </div>
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
