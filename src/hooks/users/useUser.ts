import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();

  const user = session?.user?.data;

  return { user, status };
};
