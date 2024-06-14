import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import google from "next-auth/providers/google";
import prisma from "../../lib/prisma";
import github from "next-auth/providers/github";



export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [google, github],
  callbacks: {
    session({ session, user }) {
      return session
    },
  },
  pages: {
    newUser: "/bienvenido"
  }
});
