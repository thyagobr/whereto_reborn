import { useSession } from "next-auth/react";

export const useIsAuthenticated = (): boolean => {
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = (session?.user as any)?.data?.token;
  return Boolean(token);
}; 
