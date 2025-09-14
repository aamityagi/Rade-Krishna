"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { Input, Button, Typography, Sheet } from "@mui/joy";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Read access_token from URL hash
  useEffect(() => {
    const hash = window.location.hash; // #access_token=...&type=recovery
    const params = new URLSearchParams(hash.replace("#", ""));
    const token = params.get("access_token");
    if (token) setAccessToken(token);
    else
      setError("Invalid or expired link. Please request a new password reset.");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!accessToken) {
      setError("Invalid or expired link. Please request a new password reset.");
      return;
    }

    setLoading(true);

    // Update password via Supabase
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      alert("Password updated successfully! Please login.");
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Sheet variant="outlined" className="p-8 w-full max-w-md rounded shadow">
        <Typography level="h5" className="mb-4 text-center font-bold">
          Set New Password
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
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
          <Button variant="outlined" onClick={() => router.push("/login")}>
            Back to Login
          </Button>
        </form>
      </Sheet>
    </div>
  );
}
