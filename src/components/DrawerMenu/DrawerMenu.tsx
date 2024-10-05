import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { UserBadge } from "../UserBadge";

export const DrawerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="m-1" color="#8c9eb2" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <UserBadge />
          </SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
