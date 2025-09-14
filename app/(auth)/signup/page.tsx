"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Typography,
  Sheet,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/joy";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  // Step 1: Basic Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2: Purpose & Intent
  const [purpose, setPurpose] = useState("business");
  const [ecommercePlatform, setEcommercePlatform] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [intent, setIntent] = useState("business");

  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Supabase Auth Signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // Supabase DB insert for extra info
    const { error: dbError } = await supabase.from("profiles").insert([
      {
        id: authData.user?.id,
        full_name: fullName,
        mobile,
        purpose,
        ecommerce_platform: ecommercePlatform,
        company_url: companyUrl,
        intent,
      },
    ]);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    router.push("/dashboard");
  };

  const handleSocialLogin = async (
    provider: "google" | "github" | "facebook"
  ) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) console.error(error.message);
  };

  return (
    <div className="flex min-h-screen">
      {/* -------- LEFT BANNER -------- */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 to-purple-600 items-center justify-center">
        <img
          src="/signup-banner.png"
          alt="Banner"
          className="object-cover h-full w-full"
        />
      </div>

      {/* -------- RIGHT SIGNUP FORM -------- */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <Sheet
          variant="outlined"
          className="w-full max-w-md p-8 rounded-lg shadow-lg"
        >
          {/* Logo & Welcome */}
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.svg" alt="Logo" className="h-14 w-14 mb-2" />
            <Typography fontWeight="bold">Create Your Account</Typography>
            <Typography textColor="neutral.500">
              Sign up to get started
            </Typography>
          </div>

          {/* Signup Form */}
          <div className="flex flex-col gap-4">
            {/* Step 1 */}
            <Input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Mobile Number"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Step 2 */}
            <Typography fontWeight="lg">Purpose</Typography>
            <RadioGroup
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              orientation="horizontal"
              className="gap-2"
            >
              <Radio value="business" label="Business" />
              <Radio value="solo" label="Solo" />
              <Radio value="social_media" label="Social Media" />
              <Radio value="ecommerce" label="Ecommerce" />
            </RadioGroup>

            {purpose === "ecommerce" && (
              <Input
                placeholder="Ecommerce Platform (Amazon, Flipkart, etc.)"
                value={ecommercePlatform}
                onChange={(e) => setEcommercePlatform(e.target.value)}
              />
            )}

            <Input
              placeholder="Company / Social Media URL"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
            />

            <Typography fontWeight="lg">Intent</Typography>
            <RadioGroup
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              orientation="horizontal"
              className="gap-2"
            >
              <Radio value="business" label="Business" />
              <Radio value="social_media" label="Social Media" />
              <Radio value="ecommerce" label="Ecommerce" />
              <Radio value="other" label="Other" />
            </RadioGroup>

            {error && <Typography color="danger">{error}</Typography>}
            <Button onClick={handleSignup} className="w-full">
              Sign Up
            </Button>

            <div className="flex justify-between text-sm mt-2">
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Social Signup */}
          <div className="mt-6 flex justify-center gap-4">
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={() => handleSocialLogin("google")}
              className="rounded-full"
            >
              <FaGoogle />
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={() => handleSocialLogin("github")}
              className="rounded-full"
            >
              <FaGithub />
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={() => handleSocialLogin("facebook")}
              className="rounded-full"
            >
              <FaFacebook />
            </IconButton>
          </div>
        </Sheet>
      </div>
    </div>
  );
}
