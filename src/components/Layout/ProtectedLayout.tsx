"use client";

import { BottomNavigationMenu } from "../BottomNavigationMenu/BottomNavigationMenu";
import { DesktopMenu } from "../DesktopMenu/DesktopMenu";
import { Header } from "../header";
import { Recommendations } from "../Recommendations/Recommendations";

export function ProtectedLayout({ children }) {
  return (
    <>
      <Header />
      <div className="grid grid-flow-col">
        <DesktopMenu />
        {children}
        <Recommendations />
      </div>
      <BottomNavigationMenu />
    </>
  );
}
