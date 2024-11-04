"use client";

import Link from "next/link";
import { FeedTabs } from "../Feed/FeedTabs/FeedTabs";

export function UnprotectedLayout({ children }) {
  return (
    <div className="max-w-[450px] mx-auto">
      <div className="flex justify-between px-3 py-2 rounded-t">
        <Link href="/">whereto</Link>
        <Link href="/login">login</Link>
      </div>
      <FeedTabs />
      <div className="grid grid-flow-col">{children}</div>
    </div>
  );
}
