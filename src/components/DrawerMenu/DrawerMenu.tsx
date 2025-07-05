"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Home, LogOut, MapPin, Ticket, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserBadge } from "../UserBadge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/logout";

export const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session } = useSession() as any;

  const navigate = (url: string) => {
    router.push(url);
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <AlignJustify className="m-1" color="#8c9eb2" />
      </SheetTrigger>
      <SheetContent
        side="left"
        aria-describedby="Menu"
        className="flex flex-col"
      >
        <SheetHeader>
          <UserBadge />
          <SheetTitle className="text-left">
            {session?.user?.data?.name}
          </SheetTitle>
          <p className="w-fit mt-1 font-light text-slate-600 text-xs">
            {session?.user?.data?.email}
          </p>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 mt-1">
          <Separator />
          <div className="w-full">
            <Button
              onClick={() => navigate("/")}
              className="w-full justify-start gap-3 pl-0"
              variant="ghost"
            >
              <Home color="#64748b" />
              <p className="font-bold text-lg text-slate-500">Home</p>
            </Button>
          </div>
          <div className="w-full">
            <Button
              onClick={() => navigate("/")}
              className="w-full justify-start gap-3 pl-0"
              variant="ghost"
            >
              <MapPin color="#64748b" />
              <p className="font-bold text-lg text-slate-500">Places</p>
            </Button>
          </div>
          <div className="w-full">
            <Button
              onClick={() => navigate("/events")}
              className="w-full justify-start gap-3 pl-0"
              variant="ghost"
            >
              <Ticket color="#64748b" />
              <p className="font-bold text-lg text-slate-500">Events</p>
            </Button>
          </div>
          <div className="w-full">
            <Button
              onClick={() => navigate("/crews")}
              className="w-full justify-start gap-3 pl-0"
              variant="ghost"
            >
              <Users color="#64748b" />
              <p className="font-bold text-lg text-slate-500">Crews</p>
            </Button>
          </div>
          <div className="w-full">
            <Button
              onClick={logout}
              className="w-full justify-start gap-3 pl-0 mt-2"
              variant="ghost"
            >
              <p className="font-bold text-sm text-slate-500">Log Out</p>
              <LogOut color="#64748b" size={15} />
            </Button>
          </div>
        </div>
        <SheetDescription className="mt-auto text-muted">
          <span className="text-sm italic text-muted">
            Made with 💜 by the WhereTo team
          </span>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
