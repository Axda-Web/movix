import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signOutFromGitHub } from "@/server-actions";
import db from "@/drizzle/db";
import { medias } from "@/drizzle/schema";
import { eq, count } from "drizzle-orm";
import type { Metadata } from "next";
import { searchParamsCache } from "@/searchParams";
import { MediasPagination } from "@/components/medias-pagination";
import { Profile } from "@/components/profile";
import { BookmarkedMediasTable } from "@/components/bookmarked-medias-table";

export const metadata: Metadata = {
  title: "Movix | Account",
  description: "Manage your account",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await auth();
  const { page } = searchParamsCache.parse(searchParams);
  const currentPage = page || 1;
  const itemsPerPage = 4;

  const [bookmarkedMedias, bookmarkedMediasCount] = await Promise.all([
    db.query.medias.findMany({
      where: eq(medias.isBookmarked, true),
      with: {
        thumbnails: true,
      },
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage,
    }),
    db
      .select({ count: count() })
      .from(medias)
      .where(eq(medias.isBookmarked, true)),
  ]);

  const totalPages = Math.ceil(bookmarkedMediasCount[0].count / itemsPerPage);

  return (
    <section className={cn("text-whiten px-4 mt-8", "lg:mt-0")}>
      <div className={cn("flex justify-between items-center mb-4", "md:mb-6")}>
        <h1 className={cn("text-xl font-light", "md:text-3xl")}>My account</h1>
        <form
          className={cn("absolute right-4", "md:right-8")}
          action={signOutFromGitHub}
        >
          <Button
            className={cn(
              "text-white hover:text-muted-foreground hover:bg-white transition"
            )}
            variant="outline"
            type="submit"
          >
            Sign out
          </Button>
        </form>
      </div>
      <Profile
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
      />
      <BookmarkedMediasTable data={bookmarkedMedias} />
      <div className={cn("mt-6", "md:mt-8")}>
        <MediasPagination totalPages={totalPages} />
      </div>
    </section>
  );
}
