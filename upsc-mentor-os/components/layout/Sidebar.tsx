"use client";

import { Logo } from "@/components/common/Logo";
import { Navigation } from "./Navigation";

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="border-b p-6">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Navigation />
      </div>
    </aside>
  );
}