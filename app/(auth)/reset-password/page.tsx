"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography, Button, Input, Sheet } from "@mui/joy";
import { supabase } from "../../../lib/supabaseClient";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        // token handled automatically by Supabase
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      alert("Password updated. Please login.");
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Sheet variant="outlined" className="p-8 w-full max-w-md rounded shadow">
        <Typography level="h4" className="mb-4 text-center font-bold">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <Typography color="danger">{error}</Typography>}
          {message && <Typography color="success">{message}</Typography>}
          <Button type="submit">Update Password</Button>
        </form>
      </Sheet>
    </div>
  );
}
