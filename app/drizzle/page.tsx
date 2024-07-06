import db from "@/drizzle/db";
import { medias, thumbnails } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

type Props = {};

const DrizzlePage = async (props: Props) => {
  try {
    const newMedia = await db
      .insert(medias)
      .values({
        title: "Mission: Saturn",
        year: 2017,
        category: "Movie",
        rating: "PG",
        isBookmarked: true,
        isTrending: false,
      })
      .returning({ insertedId: medias.id });
    const newThumbnails = await db
      .insert(thumbnails)
      .values([
        // {
        //   mediaId: newMedia[0].insertedId,
        //   type: "trending",
        //   size: "small",
        //   url: "./assets/thumbnails/the-great-lands/trending/small.jpg",
        // },
        // {
        //   mediaId: newMedia[0].insertedId,
        //   type: "trending",
        //   size: "large",
        //   url: "./assets/thumbnails/the-great-lands/trending/large.jpg",
        // },
        {
          mediaId: newMedia[0].insertedId,
          type: "regular",
          size: "small",
          url: "./assets/thumbnails/mission-saturn/regular/small.jpg",
        },
        {
          mediaId: newMedia[0].insertedId,
          type: "regular",
          size: "medium",
          url: "./assets/thumbnails/mission-saturn/regular/medium.jpg",
        },
        {
          mediaId: newMedia[0].insertedId,
          type: "regular",
          size: "large",
          url: "./assets/thumbnails/mission-saturn/regular/large.jpg",
        },
      ])
      .returning();
    console.log("newThumbnails ***************", newThumbnails);
  } catch (e) {
    console.error(e);
  }

  return <div>DrizzlePage</div>;
};

export default DrizzlePage;
