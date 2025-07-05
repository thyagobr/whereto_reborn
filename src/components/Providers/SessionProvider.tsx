"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children, session }) => {
  if (typeof window !== "undefined" && session?.user?.data?.token) {
    window.localStorage.setItem("token", session.user.data.token);
  }

  // Ensure token is removed if user logs out or session expires
  if (typeof window !== "undefined" && !session?.user?.data?.token) {
    window.localStorage.removeItem("token");
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
