import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./drizzle/db";
import { users } from "./drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// TODO: Complete credentials provider setup

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString() ?? ""))
          .limit(1);

        if (!user[0]) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password.toString() ?? "",
          user[0].password ?? ""
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
        };
      },
    }),
  ],
});
