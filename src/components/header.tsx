import { ModeToggle } from "./ui/darkmode";
import Link from "next/link";
import { UserBadge } from "./UserBadge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export const Header = () => {
  return (
    <div className="w-full max-w-[450px] mx-auto flex flex-row items-center justify-between mb-4">
      <div className="w-3/4 flex flex-row gap-5 ml-2 mt-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Places
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/events" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Events
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="mr-2 mt-2">
        <UserBadge />
      </div>
    </div>
  );
};
