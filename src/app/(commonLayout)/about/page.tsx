"use client";

import { getBlogs } from "@/actions/blog.actions";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [data, setData] = useState();
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();

      setData(data);
      setError(error);
    })();
  }, []);

  console.log(data);
  console.log(error);

  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">About us page</h1>
    </div>
  );
}
