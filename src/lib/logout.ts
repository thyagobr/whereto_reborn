export const logout = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("token");
  }
  // Dynamically import to avoid SSR issues
  import("next-auth/react").then(({ signOut }) => signOut());
}; 
