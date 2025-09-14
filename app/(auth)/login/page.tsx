"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, Button, Input, Sheet } from "@mui/joy";
import { supabase } from "../../../lib/supabaseClient";

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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Sheet variant="outlined" className="p-8 w-full max-w-md rounded shadow">
        <Typography level="h4" className="mb-4 text-center font-bold">
          Login
        </Typography>
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
          {error && <Typography color="danger">{error}</Typography>}
          <Button type="submit">Sign In</Button>
        </form>
      </Sheet>
    </div>
  );
}
