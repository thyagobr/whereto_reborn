"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

export function FeedTabs() {
  const pathname = usePathname();

  const isIconActive = (url: string) => {
    return pathname === url;
  };

  return (
    <NavigationMenu className="flex mx-auto max-w-[600px] w-full justify-start">
      <NavigationMenuList>
        <NavigationMenuItem
          data-active={isIconActive("/")}
          className="data-[active=true]:border-primary data-[active=true]:border-b-[2px]"
        >
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Places
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          data-active={isIconActive("/events")}
          className="data-[active=true]:border-primary data-[active=true]:border-b-[2px]"
        >
          <Link href="/events" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Events
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          data-active={isIconActive("/travels")}
          className="data-[active=true]:border-primary data-[active=true]:border-b-[2px]"
        >
          <Link href="/travels" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Travels
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
