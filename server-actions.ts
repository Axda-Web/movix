"use server";

import { z } from "zod";
import { actionClient } from "./safe-action";
import { medias, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import bcrypt from "bcryptjs";

// Bookmark action

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

// Sign in with GitHub action
export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/account" });
}

export async function signOutFromGitHub() {
  await signOut();
}

// Sign in with Google action
export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutFromGoogle() {
  await signOut();
}

// Register user action

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerUser = actionClient
  .schema(registerUserSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db
        .insert(users)
        .values({
          name: "Axda",
          email,
          emailVerified: new Date(),
          password: hashedPassword,
          image: "",
        })
        .returning();

      if (newUser[0]) {
        // Sign in the user after successful registration
        await signIn("credentials", {
          email,
          password,
          redirectTo: "/account",
        });

        return { success: true, user: newUser[0] };
      } else {
        return { success: false, error: "Failed to create user" };
      }
    } catch (error) {
      console.error("Failed to register user:", error);
      return { success: false, error: "Failed to register user" };
    }
  });

// Login user action

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginUser = actionClient
  .schema(loginUserSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    await signIn("credentials", { email, password, redirectTo: "/account" });
  });
