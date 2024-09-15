"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";

interface MediasPaginationProps {
  totalPages: number;
}

// TODO: Add pagination ellipsis

export function MediasPagination({ totalPages }: MediasPaginationProps) {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => parseInt(value, 10),
    shallow: false,
  });
  const pathname = usePathname();

  const currentPage = page;

  const createPageURL = (pageNumber: number | string) => {
    return `${pathname}?page=${pageNumber}#recommended-section`;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
            onClick={(e) => {
              if (currentPage > 1) {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }
            }}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className={cn("hover:text-white hover:bg-background transition")}
              href={createPageURL(i + 1)}
              isActive={currentPage === i + 1}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i + 1);
              }}
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
            onClick={(e) => {
              if (currentPage < totalPages) {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
