"use client";
import { useState } from "react";
import { Typography, Button, Input, Sheet } from "@mui/joy";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Check if user exists
    const { data: userExist, error: checkError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      setError(checkError.message);
      return;
    }

    if (!userExist) {
      // Email not exist → redirect to signup
      router.push("/signup");
      return;
    }

    // Send reset password email
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/reset-password` }
    );

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Password reset link sent! Check your email.");
      setTimeout(() => router.push("/login"), 3000); // redirect after 3s
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Banner */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 to-purple-600 items-center justify-center">
        <Image
          src="/forgot-banner.png"
          alt="Banner"
          className="object-cover h-full w-full rounded-l-lg"
        />
      </div>

      {/* Right Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <Sheet className="w-full max-w-md p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <Image src="/logo.svg" alt="Logo" className="h-14 w-14 mb-2" />
            <Typography fontWeight="bold">Forgot Password</Typography>
            <Typography textColor="neutral.500">
              Enter your email to reset your password
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <Typography color="danger">{error}</Typography>}
            {message && <Typography color="success">{message}</Typography>}

            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </Sheet>
      </div>
    </div>
  );
}
