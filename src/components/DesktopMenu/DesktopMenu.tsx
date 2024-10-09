import { Home, MapPin, Search, Ticket } from "lucide-react";
import { Button } from "../ui/button";
import { UserBadge } from "../UserBadge";

export const DesktopMenu = () => {
  return (
    <div className="md:flex justify-end hidden w-full h-full border-slate-800 border-r-[1px]">
      <div className="flex flex-col gap-1 lg:items-start items-end w-full max-w-[220px] pt-6 mx-3">
        <UserBadge />
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
