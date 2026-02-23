"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function page() {
  const { data } = authClient.useSession();
  return (
    <div className="flex h-screen items-center flex-col justify-center">
      <b>{data?.user.email || "No one"}</b>&nbsp; is logged in
      <div>
        {data && <Button onClick={() => authClient.signOut()}> Logout </Button>}
      </div>
    </div>
  );
}
