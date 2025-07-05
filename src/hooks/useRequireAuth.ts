import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIsAuthenticated } from "@/lib/useIsAuthenticated";

export const useRequireAuth = (): boolean => {
  const isAuth = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);

  return isAuth;
}; 
