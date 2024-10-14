import { ProtectedLayout } from "./ProtectedLayout";
import { UnprotectedLayout } from "./UnprotectedLayout";

export const LayoutSelector = ({ children, session }) => {
  if (session?.user?.token)
    return <ProtectedLayout>{children}</ProtectedLayout>;

  return <UnprotectedLayout>{children}</UnprotectedLayout>;
};
