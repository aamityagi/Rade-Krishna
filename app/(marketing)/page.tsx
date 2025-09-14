"use client";

import { Button, Card, CardContent, Typography, Sheet } from "@mui/joy";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ---------- HEADER ---------- */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Radha-Krishna Logo" className="h-10 w-10" />
          <nav className="hidden md:flex gap-6">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About
            </a>
            <a href="#modules" className="hover:text-blue-600">
              Application
            </a>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </nav>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outlined">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="solid">Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* ---------- HERO SECTION ---------- */}
      <section
        id="home"
        className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-400 to-purple-500 text-white py-32 px-4"
      >
        <Typography
          level="h1"
          fontSize="4xl"
          fontWeight="bold"
          className="mb-4"
        >
          Welcome to Radha-Krishna SaaS
        </Typography>
        <Typography fontSize="lg" className="mb-6 max-w-xl">
          The all-in-one platform for Keywords, Content, Ecommerce, Website
          Builder, and Social Media automation.
        </Typography>
        <Button variant="solid" size="lg">
          Get Started
        </Button>
      </section>

      {/* ---------- APPLICATION / MODULES ---------- */}
      <section id="modules" className="py-20 bg-gray-50 px-4">
        <Typography
          level="h2"
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          className="mb-12"
        >
          Our Applications
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Keyword Finder",
            "Content Creator",
            "Ecommerce Keyword Finder",
            "Website Builder",
            "Social Media Auto-Posting",
          ].map((module) => (
            <Card
              key={module}
              variant="outlined"
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent>
                <Typography level="h3" fontWeight="bold" className="mb-2">
                  {module}
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- ABOUT SECTION ---------- */}
      <section id="about" className="py-20 px-4 bg-white">
        <Typography
          level="h2"
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          className="mb-6"
        >
          About Radha-Krishna
        </Typography>
        <Typography
          textAlign="center"
          className="max-w-3xl mx-auto text-gray-700"
        >
          Radha-Krishna is a scalable SaaS platform built with Next.js, Tailwind
          CSS, MUI, and Supabase. It helps businesses, solopreneurs, and social
          media creators to streamline content creation, keyword research, and
          website building, all from a single dashboard.
        </Typography>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer
        id="contact"
        className="bg-gray-900 text-white py-10 px-4 mt-auto"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <Typography fontWeight="bold">Radha-Krishna SaaS</Typography>
            <Typography>© 2025 All rights reserved.</Typography>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-400">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
