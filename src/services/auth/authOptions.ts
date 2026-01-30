import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: AuthOptions = {
  jwt: {
    maxAge: 1 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!apiUrl) {
          console.error("[auth] NEXT_PUBLIC_API_URL is not set");
          return null;
        }
        if (!credentials?.email || !credentials?.password) {
          console.error("[auth] Missing email or password in credentials");
          return null;
        }
        try {
          const url = `${apiUrl.replace(/\/$/, "")}/auth/login`;
          const body = { email: credentials.email, password: credentials.password };
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          });

          if (res.ok) {
            const user = await res.json();
            return user;
          }

          const text = await res.text();
          console.error("[auth] Backend login failed:", res.status, res.statusText);
          console.error("[auth] Response body:", text);
          if (res.status === 400) {
            console.error("[auth] Request body sent:", { email: credentials.email, password: "[redacted]" });
          }
          if (res.status === 401 || res.status === 403) {
            return null;
          }
          return null;
        } catch (error) {
          console.error("[auth] Backend login request error:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any;
      return session;
    }
  }
};
