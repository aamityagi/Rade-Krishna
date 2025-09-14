import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Radha-Krishna</div>
      <nav className="flex-1">
        <Link
          href="/dashboard/keyword-finder"
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Keyword Finder
        </Link>
        <Link
          href="/dashboard/ecommerce"
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Ecommerce
        </Link>
        <Link
          href="/dashboard/content-creator"
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Content Creator
        </Link>
        <Link
          href="/dashboard/website-builder"
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Website Builder
        </Link>
        <Link
          href="/dashboard/settings"
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
