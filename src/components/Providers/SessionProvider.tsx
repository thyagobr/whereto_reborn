"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children, session }) => {
  if (typeof window !== "undefined" && session?.user?.token)
    window.localStorage.setItem("token", session.user.token);
  console.log(session);

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
