import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { Blog } from "@/types";

export default async function Home() {
  const response = await blogService.getBlogs(
    {
      isFeatured: false,
      // search: "lorem",
    },
    {
      cache: "no-store",
      // revalidate: 10,
    },
  );

  const blogs = response.data.data.result;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto px-5 my-10">
      {blogs.map((blog: Blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
