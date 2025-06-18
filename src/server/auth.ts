// src/server/auth.ts

import NextAuth, { type NextAuthOptions, getServerSession } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './db';

// Define authOptions once
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // so ctx.session.user.id works in tRPC
      }
      return session;
    },
  },
};

// Export the NextAuth handler (used in pages/api/auth/[...nextauth].ts)
export default NextAuth(authOptions);

import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const getServerAuthSession = async (ctx: CreateNextContextOptions) => {
  return await getServerSession(ctx.req, ctx.res, authOptions);
};