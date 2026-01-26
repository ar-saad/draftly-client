import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import Image from "next/image";
import { Blog } from "@/types";

export default async function Home() {
  const featuredBlogsPromise = blogService.getBlogs({
    isFeatured: true,
    limit: "3",
  });
  const blogsPromise = blogService.getBlogs({ limit: "3" }, { revalidate: 10 });

  const [featuredBlogs, blogs] = await Promise.all([
    featuredBlogsPromise,
    blogsPromise,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-5">
      <div className="mb-12 mt-8 flex flex-col justify-center">
        <div className="relative w-full h-96 mb-6">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=100"
            fill
            priority
            alt="Hero"
            className="object-cover rounded-md"
          />
        </div>
        <h1 className={"text-5xl font-bold text-center mb-4"}>
          Welcome to Our Blog
        </h1>
      </div>

      {featuredBlogs?.data?.data?.result &&
        featuredBlogs.data.data.result.length > 0 && (
          <div className="mb-12">
            <h2 className={"text-2xl font-bold mb-6"}>Featured Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredBlogs.data.data.result.map((blog: Blog) => (
                <div
                  key={blog.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=100"
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2">{blog.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{blog.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      <div>
        <h2 className="text-2xl font-bold mb-6">All Blogs</h2>
        <div className="grid grid-cols-3 gap-5">
          {blogs?.error?.message ? (
            <p className="text-red-500">{blogs?.error?.message}</p>
          ) : null}
          {blogs?.data?.data.result?.map((blog: Blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
