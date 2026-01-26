import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Blog } from "@/types";
import { PaginationControlsProps } from "@/types/pagination.type";

export default function BlogHistoryTable({
  blogs,
  meta,
}: {
  blogs: Blog[];
  meta: PaginationControlsProps;
}) {
  const { limit: pageSize, page: currentPage, count, totalPages } = meta;
  return (
    <div className="border rounded-md p-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="w-25">Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No blog posts found
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog, index) => (
              <TableRow key={blog.id}>
                <TableCell className="w-10">
                  {(currentPage - 1) * pageSize + index + 1}
                </TableCell>
                <TableCell>
                  <div className="max-w-120">
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {blog.content}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {blog.tags && blog.tags.length > 0 ? (
                      blog.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No tags
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{blog.views}</TableCell>
                <TableCell>{blog._count?.comments ?? 0}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
