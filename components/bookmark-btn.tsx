"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toggleBookmark } from "@/server-actions";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";

// TODO: Add auth check inside server action
// TODO: Change server action return value
// TODO: Prevent media listing order changes when bookmarking

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
  const [isDBRequestLoading, setIsDBRequestLoading] = useState(false);
  const { toast } = useToast();

  return (
    <Button
      disabled={isDBRequestLoading}
      size="icon"
      onClick={async () => {
        setIsDBRequestLoading(true);
        const actionResult = await toggleBookmark({
          isBookmarked: !isBookmarked,
          mediaId,
        });

        setIsDBRequestLoading(false);

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
        "absolute top-2 right-2 bg-black bg-opacity-50 rounded-full"
      )}
    >
      {isDBRequestLoading ? (
        <LoaderCircle className="w-4 h-4 text-white animate-spin" />
      ) : isBookmarked ? (
        <Image
          className="text-white"
          src="/icons/bookmark-full.svg"
          width={12}
          height={14}
          alt="bookmark icon"
        />
      ) : (
        <Image
          className="text-white"
          src="/icons/bookmark-empty.svg"
          width={12}
          height={14}
          alt="bookmark icon"
        />
      )}
    </Button>
  );
}
