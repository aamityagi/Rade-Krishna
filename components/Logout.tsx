import { supabase } from "../lib/supabaseClient";
import { Button } from "@mui/joy";

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <Button color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
}
