"use server";

import { blogService } from "@/services/blog.service";
import { Blog } from "@/types";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogs();
};

export const createBlog = async (blogData: Partial<Blog>) => {
  const res = await blogService.createBlog(blogData);
  updateTag("blogs");
  return res;
};
