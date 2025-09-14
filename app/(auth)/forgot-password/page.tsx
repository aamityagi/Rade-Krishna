"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { Typography, Button, Input, Sheet } from "@mui/joy";
import { supabase } from "../../../lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for password reset link.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Sheet variant="outlined" className="p-8 w-full max-w-md rounded shadow">
        <Typography level="h4" className="mb-4 text-center font-bold">
          Forgot Password
        </Typography>
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
          <Button type="submit">Send Reset Link</Button>
        </form>
      </Sheet>
    </div>
  );
}
