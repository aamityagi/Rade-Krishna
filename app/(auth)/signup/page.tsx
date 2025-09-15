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
  Option,
  Select,
} from "@mui/joy";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

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
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleSignup = async () => {
    setError("");
    const errors: { [key: string]: string } = {};

    // ✅ Field-level validation
    if (!fullName.trim()) errors.fullName = "Full Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!mobile.trim()) errors.mobile = "Mobile Number is required";
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords don't match";
    if (!purpose) errors.purpose = "Please select a Purpose";
    if (purpose === "ecommerce" && !ecommercePlatform.trim())
      errors.ecommercePlatform = "Please enter your Ecommerce Platform";
    if (!intent) errors.intent = "Please select an Intent";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    try {
      // ✅ Check if user already exists by email or mobile
      const { data: existingUser, error: checkError } = await supabase
        .from("profiles")
        .select("id")
        .or(`email.eq.${email},mobile.eq.${mobile}`)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // ignore "no rows found" error
        setError(checkError.message);
        return;
      }

      if (existingUser) {
        // user exists → redirect to forgot password
        router.push("/forgot-password");
        return;
      }

      // ✅ Supabase Auth Signup
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // ✅ Supabase DB insert for extra info
      const { error: dbError } = await supabase.from("profiles").insert([
        {
          id: authData.user?.id,
          full_name: fullName,
          email,
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

      // New user → signup success → redirect to login
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
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
        <Image
          src="/signup-banner.png"
          alt="Banner"
          className="object-cover h-full w-full"
        />
      </div>

      {/* -------- RIGHT SIGNUP FORM -------- */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <Sheet className="w-full max-w-md p-8 rounded-lg shadow-lg">
          {/* Logo & Welcome */}
          <div className="flex flex-col items-center mb-6">
            <Image src="/logo.svg" alt="Logo" className="h-14 w-14 mb-2" />
            <Typography fontWeight="bold">Create Your Account</Typography>
            <Typography textColor="neutral.500">
              Sign up to get started
            </Typography>
          </div>

          {/* Signup Form */}
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={Boolean(fieldErrors.fullName)}
              />
              {fieldErrors.fullName && (
                <Typography color="danger">{fieldErrors.fullName}</Typography>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email && (
                <Typography color="danger">{fieldErrors.email}</Typography>
              )}
            </div>

            {/* Mobile */}
            <div>
              <Input
                placeholder="Mobile Number"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                error={Boolean(fieldErrors.mobile)}
              />
              {fieldErrors.mobile && (
                <Typography color="danger">{fieldErrors.mobile}</Typography>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(fieldErrors.password)}
              />
              {fieldErrors.password && (
                <Typography color="danger">{fieldErrors.password}</Typography>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={Boolean(fieldErrors.confirmPassword)}
              />
              {fieldErrors.confirmPassword && (
                <Typography color="danger">
                  {fieldErrors.confirmPassword}
                </Typography>
              )}
            </div>

            {/* Purpose */}
            <Typography fontWeight="lg">Purpose</Typography>
            <Select
              value={purpose}
              onChange={(e, newValue) => setPurpose(newValue || "business")}
              sx={{
                borderColor: fieldErrors.purpose ? "red" : undefined,
                "&:hover": {
                  borderColor: fieldErrors.purpose ? "red" : undefined,
                },
              }}
            >
              <Option value="business">Business</Option>
              <Option value="solo">Solo</Option>
              <Option value="social_media">Social Media</Option>
              <Option value="ecommerce">Ecommerce</Option>
            </Select>
            {fieldErrors.purpose && (
              <Typography color="danger">{fieldErrors.purpose}</Typography>
            )}

            {/* Ecommerce Platform */}
            {purpose === "ecommerce" && (
              <div>
                <Input
                  placeholder="Ecommerce Platform (Amazon, Flipkart, etc.)"
                  value={ecommercePlatform}
                  onChange={(e) => setEcommercePlatform(e.target.value)}
                  error={Boolean(fieldErrors.ecommercePlatform)}
                />
                {fieldErrors.ecommercePlatform && (
                  <Typography color="danger">
                    {fieldErrors.ecommercePlatform}
                  </Typography>
                )}
              </div>
            )}

            {/* Company URL */}
            <Input
              placeholder="Company / Social Media URL"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
            />

            {/* Intent */}
            <Typography fontWeight="lg">Intent</Typography>
            <Select
              value={intent}
              onChange={(e, newValue) => setIntent(newValue || "business")}
              sx={{
                borderColor: fieldErrors.intent ? "red" : undefined,
                "&:hover": {
                  borderColor: fieldErrors.intent ? "red" : undefined,
                },
              }}
            >
              <Option value="business">Business</Option>
              <Option value="social_media">Social Media</Option>
              <Option value="ecommerce">Ecommerce</Option>
              <Option value="other">Other</Option>
            </Select>
            {fieldErrors.intent && (
              <Typography color="danger">{fieldErrors.intent}</Typography>
            )}

            {/* Global error */}
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
              color="neutral"
              onClick={() => handleSocialLogin("google")}
              className="rounded-full"
            >
              <FaGoogle />
            </IconButton>
            <IconButton
              color="neutral"
              onClick={() => handleSocialLogin("github")}
              className="rounded-full"
            >
              <FaGithub />
            </IconButton>
            <IconButton
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
