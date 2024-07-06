import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./drizzle/db";

// TODO: Set up credentials auth

export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHub,
    // Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // credentials: {
    //   username: { label: "Username", type: "text", placeholder: "jsmith" },
    //   password: { label: "Password", type: "password" },
    // },
    // authorize: async (credentials) => {
    //   let user = null;

    // logic to salt and hash password
    // const pwHash = saltAndHashPassword(credentials.password);

    // logic to verify if user exists
    // user = await getUserFromDb(credentials.email, pwHash);

    // if (!user) {
    // No user found, so this is their first attempt to login
    // meaning this is also the place you could do registration
    // throw new Error("User not found.");
    // }

    // return user object with the their profile data
    // return user;
    // },
    // }),
  ],
});
