import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            dateOfBirth: true,
            location: true,
            phoneNumber: true,
            address: true,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;

        return {
          ...userWithoutPassword,
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString() : null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
        token.email = user.email ?? null;
        token.name = user.name ?? null;
        token.dateOfBirth = user.dateOfBirth ?? null;
        token.location = user.location ?? null;
        token.phoneNumber = user.phoneNumber ?? null;
        token.address = user.address ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: String(token.id),
          email: token.email ?? null,
          name: token.name ?? null,
          dateOfBirth:
            typeof token.dateOfBirth === "string" ? token.dateOfBirth : null,
          location: typeof token.location === "string" ? token.location : null,
          phoneNumber:
            typeof token.phoneNumber === "string" ? token.phoneNumber : null,
          address: typeof token.address === "string" ? token.address : null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
