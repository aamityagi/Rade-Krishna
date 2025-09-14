"use client";

import { useState } from "react";

interface DashboardSidebarProps {
  onSelect?: (module: string) => void; // ✅ add this
}

export default function DashboardSidebar({ onSelect }: DashboardSidebarProps) {
  const [active, setActive] = useState("dashboard");

  const handleSelect = (module: string) => {
    setActive(module);
    if (onSelect) onSelect(module); // ✅ call parent callback if exists
  };

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <nav className="flex flex-col gap-4">
        <button
          onClick={() => handleSelect("dashboard")}
          className={`text-left p-2 rounded ${
            active === "dashboard" ? "bg-blue-100 font-bold" : ""
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleSelect("keyword-finder")}
          className={`text-left p-2 rounded ${
            active === "keyword-finder" ? "bg-blue-100 font-bold" : ""
          }`}
        >
          Keyword Finder
        </button>
        <button
          onClick={() => handleSelect("content-creator")}
          className={`text-left p-2 rounded ${
            active === "content-creator" ? "bg-blue-100 font-bold" : ""
          }`}
        >
          Content Creator
        </button>
        {/* add more buttons for other modules */}
      </nav>
    </aside>
  );
}
