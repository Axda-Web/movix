"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

// TODO: Implement pagination ellipsis

interface MediasPaginationProps {
  totalPages: number;
}

export function MediasPagination({ totalPages }: MediasPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}#recommended-section`;
  };

  return (
    <Pagination className="mb-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn("hover:text-white hover:bg-background transition", {
              "text-secondary hover:text-secondary cursor-not-allowed":
                currentPage <= 1,
            })}
            href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
            aria-disabled={currentPage <= 1}
            disabled={currentPage <= 1}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className={cn("hover:text-white hover:bg-background transition")}
              href={createPageURL(i + 1)}
              isActive={currentPage === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={cn("hover:text-white hover:bg-background transition", {
              "text-secondary hover:text-secondary cursor-not-allowed":
                currentPage >= totalPages,
            })}
            href={
              currentPage < totalPages ? createPageURL(currentPage + 1) : "#"
            }
            aria-disabled={currentPage >= totalPages}
            disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
