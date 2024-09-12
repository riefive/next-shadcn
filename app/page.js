"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/use-auth";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoggedIn, setup, login, logout } = useAuthStore();
  const [username, setUsername] = useState("123456789");

  const handleLogin = () => {
    if (!username) {
      toast({
        title: "Error",
        description: "Username is empty",
      })
      return;
    }
    setup(username);
    setTimeout(() => {
      setUsername("");
      login();
    }, 500);
  };

  const handleLogout = () => {
    setUsername("");
    setTimeout(() => {
      logout();
    }, 500);
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <main className="flex flex-col min-h-screen p-10">
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="flex-none">
          <Input type="username" placeholder="Username ..." className="w-[250px]" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="flex-none">
          <div className="flex flex-wrap gap-2">
            {!isLoggedIn ? (
              <Button className="w-[150px]" onClick={handleLogin}>
                Login
              </Button>
            ) : (
              <Button className="w-[150px]" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
