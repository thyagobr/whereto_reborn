"use client";

import Link from "next/link";
import { BottomNavigationMenu } from "../BottomNavigationMenu/BottomNavigationMenu";
import { DesktopMenu } from "../DesktopMenu/DesktopMenu";
import { FeedTabs } from "../Feed/FeedTabs/FeedTabs";
import { Header } from "../header";
import { Recommendations } from "../Recommendations/Recommendations";
import { Beer } from "lucide-react";

export function ProtectedLayout({ children }) {
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen">
        <DesktopMenu />
        <div className="w-full max-w-[600px] grow">
          <div className="flex px-3 py-2 rounded-t">
            <Link href="/" className="flex items-center font-bold">
              <Beer className="leading-[0px]" />
              <div className="flex flex-col pt-2">
                <span className="leading-[0px]">Where</span>
                <span className="text-sm self-end">To?</span>
              </div>
            </Link>
            <span className="text-sm italic text-muted ml-8">
              Find your next hangout spot!
            </span>
          </div>
          <FeedTabs />
          {children}
        </div>
        <Recommendations />
      </div>
      <BottomNavigationMenu />
    </>
  );
}
