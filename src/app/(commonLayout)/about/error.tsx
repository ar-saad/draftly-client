"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    //* We can pass this error to a logger
    console.error(error);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">{error.message}</h1>
      <Button onClick={() => reset()} className="mt-5">
        Retry
      </Button>
    </div>
  );
}
