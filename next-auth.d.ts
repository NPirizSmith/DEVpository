import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      isNewUser: boolean;
      id: string;
      name?: string | null | undefined;
      image?: string | null | undefined;
      preferences: string[] | undefined;
    };
  }
}