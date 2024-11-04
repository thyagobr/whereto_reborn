import { LogOut, MapPin, Ticket } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserBadge } from "../UserBadge";
import Link from "next/link";

export const DesktopMenu = () => {
  const logout = () => {
    window.localStorage.removeItem("token");
    signOut();
  };

  return (
    <div className="md:flex justify-end hidden border-slate-800 border-r-[1px]">
      <div className="flex flex-col gap-1 lg:items-start items-end w-full max-w-[220px] pt-6 mx-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <UserBadge />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => logout()}
            >
              Log out <LogOut size={20} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mt-4" />
        <Link href={"/"}>
          <Button
            className="flex lg:justify-start justify-end gap-3 font-bold text-lg lg:w-full w-fit px-3 py-6"
            variant="ghost"
          >
            <MapPin size={30} />
            <span className="lg:flex hidden">Places</span>
          </Button>
        </Link>
        <Link href={"/events"}>
          <Button
            className="flex lg:justify-start justify-end gap-3 font-bold text-lg lg:w-full w-fit px-3 py-6"
            variant="ghost"
          >
            <Ticket size={30} />
            <span className="lg:flex hidden">Events</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
