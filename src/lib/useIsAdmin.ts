import { useSession } from "next-auth/react";

export const useIsAdmin = (): boolean => {
  const { data: session } = useSession();
  const role = (session?.user as { data?: { role?: string } })?.data?.role?.toLowerCase();
  return role === "admin";
};
