"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import DashboardSidebar from "../../components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) router.push("/login");
      else setAuthenticated(true);
      setLoading(false);
    };

    checkSession();

    // Corrected subscription handling
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push("/login");
    });

    return () => {
      if (data.subscription) data.subscription.unsubscribe();
    };
  }, [router]);

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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Checking session...
      </div>
    );
  if (!authenticated) return null;

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
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

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">{children}</main>

        {/* Footer */}
        <footer className="p-4 bg-white text-center text-sm text-gray-500">
          © 2025 Radha-Krishna. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
