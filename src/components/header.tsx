import { ModeToggle } from "./ui/darkmode";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-full max-w-[450px] mx-auto flex flex-row items-center justify-between mb-4">
      <div className="w-3/4 flex flex-row gap-5">
        <Link href="/events" className="border-b-2 border-primary-foreground">Events</Link>
        <Link href="/" className="border-b-2 border-primary-foreground">Places</Link>
      </div>
      <ModeToggle />
    </div>
  );
};
