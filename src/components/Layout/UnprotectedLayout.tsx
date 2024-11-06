"use client";

import Link from "next/link";
import { FeedTabs } from "../Feed/FeedTabs/FeedTabs";
import { usePathname } from "next/navigation";
import { Beer, LogIn } from "lucide-react";

export function UnprotectedLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  return (
    <div className="flex justify-center min-h-screen">
      <div className="hidden md:flex border-slate-800 border-r-[1px]" />
      <div className="max-w-[450px] w-full grow">
        <div className="flex justify-between px-3 py-2 rounded-t">
          <Link href="/" className="flex items-center font-bold">
            <Beer className="leading-[0px]" />
            <div className="flex flex-col pt-2">
              <span className="leading-[0px]">Where</span>
              <span className="text-sm self-end">To?</span>
            </div>
          </Link>
          <Link href="/login">
            <div
              className="flex items-center gap-1 data-[enabled=true]:border-primary data-[enabled=true]:border-b-2 text-sm"
              data-enabled={isLoginPage}
            >
              Login
              <LogIn size={16} />
            </div>
          </Link>
        </div>
        <FeedTabs />
        <div className="grid grid-flow-col border-slate-800 border-t-[1px]">
          {children}
        </div>
      </div>
      <div className="hidden md:flex border-slate-800 border-l-[1px]" />
    </div>
  );
}
