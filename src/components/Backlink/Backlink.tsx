import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const Backlink = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant="link" className="p-0 ml-1">
      <ArrowLeft size={20} />
    </Button>
  );
};
