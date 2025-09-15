"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  Button,
  Input,
  Sheet,
  IconButton,
  Divider,
} from "@mui/joy";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github" | "facebook"
  ) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // ✅ must match Supabase redirect
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
      setError(error.message);
    } else {
      console.log("OAuth redirect started:", data?.url);
      // Supabase will handle redirect, no need to push here
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* -------- LEFT BANNER -------- */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 to-purple-600 items-center justify-center">
        <Image
          src="/login-banner.png"
          alt="Banner"
          width={320} // specify width in pixels
          height={180} // specify height in pixels
          className="object-cover rounded-l-lg"
        />
      </div>

      {/* -------- RIGHT LOGIN FORM -------- */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <Sheet className="w-full max-w-md p-8 rounded-lg shadow-lg">
          {/* Logo & Welcome */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={56} // 14 * 4px = 56px
              height={56} // 14 * 4px = 56px
              className="mb-2"
            />
            <Typography fontWeight="bold">Welcome Back!</Typography>
            <Typography textColor="neutral.500">
              Sign in to your account
            </Typography>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography level="body-sm" color="danger">
                {error}
              </Typography>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          {/* Links */}
          <div className="flex justify-between text-sm mt-2">
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <IconButton
              color="neutral"
              onClick={() => handleSocialLogin("google")}
            >
              <FaGoogle />
            </IconButton>
            <IconButton
              color="neutral"
              onClick={() => handleSocialLogin("github")}
            >
              <FaGithub />
            </IconButton>
            <IconButton
              color="neutral"
              onClick={() => handleSocialLogin("facebook")}
            >
              <FaFacebook />
            </IconButton>
          </div>
        </Sheet>
      </div>
    </div>
  );
}
