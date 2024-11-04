"use client";

import { BottomNavigationMenu } from "../BottomNavigationMenu/BottomNavigationMenu";
import { DesktopMenu } from "../DesktopMenu/DesktopMenu";
import { FeedTabs } from "../Feed/FeedTabs/FeedTabs";
import { Header } from "../header";
import { Recommendations } from "../Recommendations/Recommendations";

export function ProtectedLayout({ children }) {
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen">
        <DesktopMenu />
        <div className="w-full max-w-[600px] grow">
          <FeedTabs />
          {children}
        </div>
        <Recommendations />
      </div>
      <BottomNavigationMenu />
    </>
  );
}
