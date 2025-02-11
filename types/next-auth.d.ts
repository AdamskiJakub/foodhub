import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      dateOfBirth?: string | null;
      location?: string | null;
      phoneNumber?: string | null;
      address?: string | null;
    };
  }

  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    dateOfBirth?: string | null;
    location?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
  }
}
