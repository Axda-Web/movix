import { cn } from "@/lib/utils";
import db from "@/drizzle/db";
import { medias, thumbnails } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

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

  return <main className={cn("flex justify-between")}></main>;
}
