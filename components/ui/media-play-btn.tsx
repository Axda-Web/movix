import { cn } from "@/lib/utils";
import { Button } from "./button";
import Image from "next/image";

export function MediaPlayBtn() {
  return (
    <Button
      className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 items-center gap-x-4 transition-all px-3 pr-5 py-6 text-white bg-white/40 rounded-full hover:bg-white/50 text-lg"
      )}
    >
      <Image src="/icons/play.svg" width={30} height={30} alt="play icon" />
      Play
    </Button>
  );
}
