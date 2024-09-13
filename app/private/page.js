"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

function AlertSample() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  );
}

export default function Private() {
  const router = useRouter();
  const { isLoggedIn, stateLoading } = useAuthStore();
  const [count, setCount] = useState(0);

  const handleBack = () => {
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const handleInit = () => {
    if (stateLoading === "none") {
      setCount((number) => number + 1);
      return;
    }
  };

  useEffect(() => {
    handleInit();
    return () => {};
  }, [stateLoading]);

  useEffect(() => {
    if (count > 0 && stateLoading === "none" && !isLoggedIn) {
      router.push("/");
    }
  }, [count]);

  return (
    <main className="flex flex-col min-h-screen p-10">
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <AlertSample />
        <Button variant="outline" onClick={handleBack}>
          Back to Home
        </Button>
      </div>
    </main>
  );
}
