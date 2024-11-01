import { Home, LogOut, MapPin, Search, Ticket } from "lucide-react";
import { Button } from "../ui/button";
import { UserBadge } from "../UserBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

export const DesktopMenu = () => {
  const logout = () => {
    window.localStorage.removeItem("token");
    signOut();
  }

  return (
    <div className="md:flex justify-end hidden w-full h-full border-slate-800 border-r-[1px]">
      <div className="flex flex-col gap-1 lg:items-start items-end w-full max-w-[220px] pt-6 mx-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <UserBadge />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center justify-between" onClick={() => logout()}>
              Log out <LogOut size={20} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mt-4" />
        <Button
          className="flex lg:justify-start justify-end gap-3 font-bold text-lg lg:w-full w-fit px-3 py-6"
          variant="ghost"
        >
          <Home size={30} />
          <span className="lg:flex hidden">Home</span>
        </Button>
        <Button
          className="flex lg:justify-start justify-end gap-3 font-bold text-lg lg:w-full w-fit px-3 py-6"
          variant="ghost"
        >
          <Search size={30} />
          <span className="lg:flex hidden">Search</span>
        </Button>
        <Button
          className="flex lg:justify-start justify-end gap-3 font-bold text-lg lg:w-full w-fit px-3 py-6"
          variant="ghost"
        >
          <MapPin size={30} />
          <span className="lg:flex hidden">Places</span>
        </Button>
        <Button
          className="flex lg:justify-start justify-end gap-3 font-bold text-lg lg:w-full w-fit px-3 py-6"
          variant="ghost"
        >
          <Ticket size={30} />
          <span className="lg:flex hidden">Events</span>
        </Button>
      </div>
    </div>
  );
};
