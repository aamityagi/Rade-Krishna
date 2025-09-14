import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Info */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="font-bold text-blue-600">Radha-Krishna</span>
        </div>

        {/* Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/(marketing)/pricing" className="hover:text-blue-600">
            Pricing
          </Link>
          <Link href="/(marketing)/about" className="hover:text-blue-600">
            About
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Radha-Krishna. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
