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
    <div className="max-w-7xl mx-auto p-5 flex justify-center my-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-red-400 font-bold text-3xl">Error</h1>
        <h1 className="text-xl font-bold">{error.message}</h1>
        <Button onClick={() => reset()} className="mt-5">
          Retry
        </Button>
      </div>
    </div>
  );
}
