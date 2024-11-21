import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "$/lib/utils/password"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "$/lib/prisma";
import { hash, compare } from "bcrypt";

export const { auth, handlers } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    // Credentials({
    //   id: "credentials",
    //   name: "Credentials",

    //   authorize: async (credentials) => {
    //     // logic to salt and hash password
    //     const pwdHashedSaled = saltAndHashPassword(credentials?.password ?? "");

    //     // logic to verify if the user exists
    //     const user = await getUserFromDb(
    //       credentials?.email ?? "",
    //       await pwdHashedSaled
    //     );

    //     // logic to verify if the user is active
    //     if (!user) {
    //       // No user found, so this is their first attempt to login
    //       // Optionally, this is also the place you could do a user registration
    //       throw new Error("Invalid credentials.");
    //     }

    //     // return user object with their profile data
    //     return user;
    //   },
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    // }),
  ],
});

const prisma = new PrismaClient();

async function getUserFromDb(email: string, pwHash: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: pwHash,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
}

async function saltAndHashPassword(password: string) {
  try {
    const salt = await hash(password, 10);
    const pwdtemp = await hash(salt, 10);
    return pwdtemp;
  } catch (error) {
    console.error("Error hashing password:", error);
    return "";
  }
}

export default auth;