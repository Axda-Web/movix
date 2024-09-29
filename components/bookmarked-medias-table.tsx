import { cn } from "@/lib/utils";
import { BOOKMARKED_MEDIA_TABLE_HEADER } from "@/app/(account)/account/constant";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import type { Media, Thumbnail } from "@/drizzle/schema";

type MediaType = Media & { thumbnails: Thumbnail[] };

interface BookmarkedMediasTableProps {
  data: MediaType[];
}

export function BookmarkedMediasTable({ data }: BookmarkedMediasTableProps) {
  return (
    <div className={cn("mt-8")}>
      <h2 className={cn("text-lg mb-4 font-light", "md:text-xl")}>
        Bookmarked medias
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            {BOOKMARKED_MEDIA_TABLE_HEADER.map((header) => (
              <TableHead
                key={header}
                className={cn("text-white font-bold w-36", {
                  "w-12": header === "Rating",
                })}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((media) => (
            <TableRow key={media.id}>
              <TableCell className={cn("flex justify-center")}>
                <Image
                  src={media.thumbnails[0].url}
                  alt={media.title}
                  width={100}
                  height={62}
                />
              </TableCell>
              <TableCell className={cn("w-44")}>{media.title}</TableCell>
              <TableCell>{media.year}</TableCell>
              <TableCell>{media.category}</TableCell>
              <TableCell>{media.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
