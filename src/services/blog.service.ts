import { env } from "@/env";
import { Blog } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

//* No Dynamic and No { cache: no-store } : SSG -> Static Page
//* { cache: no-store } : SSR -> Dynamic Page
//* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
}

interface BlogServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const blogService = {
  getBlogs: async function (
    params?: GetBlogsParams,
    options?: BlogServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/blogs`);

      if (params) {
        // console.log(Object.entries(params));
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["blogs"] };

      const res = await fetch(url.toString(), config);

      const blogs = await res.json();

      return { data: blogs, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong." } };
    }
  },

  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`);
      const blog = await res.json();
      return { data: blog, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong." } };
    }
  },

  createBlog: async (blogData: Partial<Blog>) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong." } };
    }
  },
};
