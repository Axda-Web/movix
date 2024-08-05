"use client";

// import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toggleBookmark } from "@/server-actions";
import { useToast } from "@/components/ui/use-toast";

// TODO: Switch to shadcn Button component
// TODO: Add auth check inside server action
// TODO: Change server action return value

interface BookmarkBtnProps {
  isBookmarked: boolean;
  mediaId: string;
  mediaTitle: string;
}

export function BookmarkBtn({
  isBookmarked,
  mediaId,
  mediaTitle,
}: BookmarkBtnProps) {
  const { toast } = useToast();

  return (
    <button
      onClick={async () => {
        const actionResult = await toggleBookmark({
          isBookmarked: !isBookmarked,
          mediaId,
        });

        if (actionResult?.data) {
          toast({
            title: isBookmarked ? "Bookmark removed" : "Bookmark added",
            description: `${mediaTitle} has been ${isBookmarked ? "removed from" : "added to"} your bookmarks`,
            variant: "default",
          });
        } else {
          toast({
            title: "Something went wrong...",
            description: "There was something wrong with your request.",
          });
        }
      }}
      className={cn(
        "absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
      )}
    >
      {isBookmarked ? (
        <Image
          src="/icons/bookmark-full.svg"
          width={12}
          height={14}
          alt="bookmark icon"
        />
      ) : (
        <Image
          src="/icons/bookmark-empty.svg"
          width={12}
          height={14}
          alt="bookmark icon"
        />
      )}
    </button>
  );
}
