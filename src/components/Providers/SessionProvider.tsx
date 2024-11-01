"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children, session }) => {
  if (typeof window !== "undefined" && session?.user?.data?.token) {
    window.localStorage.setItem("token", session.user.data.token);
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
