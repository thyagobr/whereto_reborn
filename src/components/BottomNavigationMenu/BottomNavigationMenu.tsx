"use client";
import { Home, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export const BottomNavigationMenu = () => {
  const pathname = usePathname();

  const isIconActive = (url: string) => {
    return pathname === url ? "#fff" : "#8c9eb2";
  };

  return (
    <>
      <div className="mt-[65px] md:hidden" />
      <NavigationMenu>
        <NavigationMenuList className="md:hidden border-slate-800 border-t-[1px] shadow-lg flex justify-between items-center px-6 w-full h-[60px] fixed bottom-0 bg-card">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <Home color={isIconActive("/")} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <MapPin color={isIconActive("/")} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/events" legacyBehavior passHref>
              <NavigationMenuLink>
                <Ticket color={isIconActive("/events")} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
