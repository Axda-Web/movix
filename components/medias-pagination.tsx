"use client";

import { useEffect } from "react";
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

export function MediasPagination({ totalPages }: MediasPaginationProps) {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => parseInt(value, 10),
    shallow: false,
  });
  const pathname = usePathname();

  useEffect(() => {
    const recommendedSection = document.getElementById("recommended-section");
    if (recommendedSection && page) {
      recommendedSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const currentPage = page;

  const createPageURL = (pageNumber: number | string) => {
    return `${pathname}?page=${pageNumber}`;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = <PaginationEllipsis />;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={cn("hover:text-white hover:bg-background transition")}
              href={createPageURL(i)}
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pageNumbers.push(<PaginationItem key={i}>{ellipsis}</PaginationItem>);
      }
    }

    return pageNumbers;
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
        {renderPageNumbers()}
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
