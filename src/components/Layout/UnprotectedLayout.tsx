"use client";

import { DesktopMenu } from "../DesktopMenu/DesktopMenu";
import { Header } from "../header";
import { Recommendations } from "../Recommendations/Recommendations";
import Link from "next/link";

export function UnprotectedLayout({ children }) {
  return (
    <div className="max-w-[450px] mx-auto">
      <div className="flex justify-between px-3 py-2 rounded-t">
        <Link href="/">
          whereto
        </Link>
        <Link href="/login">
          login
        </Link>
      </div>
      <div className="grid grid-flow-col">
        {children}
      </div>
    </div>
  );
}
