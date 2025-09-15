"use client";

import { Button } from "@mui/joy";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl space-y-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Radha-Krishna <span className="text-blue-600">AI SaaS</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          All-in-one platform for Keyword Research, Content Creation, Ecommerce
          Insights, Website Builder, and Social Media Auto-Posting.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" color="primary">
              Get Started Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg">View Pricing</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl py-16">
        {[
          {
            title: "Keyword Finder",
            desc: "Discover high-traffic keywords for websites, ecommerce, and social media.",
          },
          {
            title: "Content Creator",
            desc: "AI-powered tools to generate blogs, captions, and social posts instantly.",
          },
          {
            title: "Ecommerce Keywords",
            desc: "Optimize for Amazon, Flipkart, and other marketplaces.",
          },
          {
            title: "Website Builder",
            desc: "Prebuilt UI templates to launch your blog or store in minutes.",
          },
          {
            title: "Auto-Posting",
            desc: "Schedule and automate social media posting across platforms.",
          },
          {
            title: "Free Tier Friendly",
            desc: "Optimized for Supabase + Vercel free tiers with scalable design.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Start Growing with Radha-Krishna AI
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Join early adopters using AI to scale their websites, ecommerce
          stores, and content strategies.
        </p>
        <Link href="/signup">
          <Button size="lg" className="mt-6" color="primary">
            Try Free Now
          </Button>
        </Link>
      </section>
    </main>
  );
}
