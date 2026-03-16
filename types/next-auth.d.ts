import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      dateOfBirth?: string | null;
      location?: string | null;
      phoneNumber?: string | null;
    };
  }

  interface User {
    id: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    dateOfBirth?: string | null;
    location?: string | null;
    phoneNumber?: string | null;
  }

  interface JWT {
    id: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    dateOfBirth?: string | null;
    location?: string | null;
    phoneNumber?: string | null;
  }
}
