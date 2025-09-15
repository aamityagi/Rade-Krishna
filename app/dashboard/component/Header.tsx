"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function Header() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold">Radha-Krishna</h1>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 rounded-full border p-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>Profile</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border shadow rounded">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Upgrade Plan
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
