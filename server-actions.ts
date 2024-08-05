"use server";

import { z } from "zod";
import { actionClient } from "./safe-action";
import { medias } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { revalidatePath } from "next/cache";

const bookmarkSchema = z.object({
  isBookmarked: z.boolean(),
  mediaId: z.string(),
});

export const toggleBookmark = actionClient
  .schema(bookmarkSchema)
  .action(async ({ parsedInput: { isBookmarked, mediaId } }) => {
    try {
      await db
        .update(medias)
        .set({ isBookmarked })
        .where(eq(medias.id, mediaId));

      revalidatePath("/");

      return true;
    } catch (error) {
      console.error(error);
    }
  });
