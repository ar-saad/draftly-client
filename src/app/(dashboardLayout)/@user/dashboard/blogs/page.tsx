import BlogHistoryTable from "@/components/modules/userDashboard/blogHistoryTable/BlogHistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";

export default async function UserDashboardBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const response = await blogService.getBlogs({ page });
  const blogs = response.data.data.result;
  const pagination = response.data.data.pagination || {
    limit: 10,
    page: 1,
    count: 0,
    totalPages: 1,
  };

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-6">Blog Creation History</h1>
      <BlogHistoryTable blogs={blogs} meta={pagination} />
      <PaginationControls meta={pagination} />
    </div>
  );
}
