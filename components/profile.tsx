import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CircleUserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { USER_PROFILE_TABLE_HEADER } from "@/app/(account)/account/constant";

interface ProfileProps {
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
}

export function Profile({ userName, userEmail, userImage }: ProfileProps) {
  return (
    <Table className={cn("max-w-md")}>
      <TableHeader>
        <TableRow>
          {USER_PROFILE_TABLE_HEADER.map((header) => (
            <TableHead
              key={header}
              className={cn("text-white font-bold w-36", {
                "text-center": header === "Picture",
              })}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{userName}</TableCell>
          <TableCell>{userEmail}</TableCell>
          <TableCell className={cn("flex justify-center")}>
            <Avatar>
              <AvatarImage src={userImage ?? ""} alt="Profile picture" />
              <AvatarFallback>
                <CircleUserRound
                  className={cn(
                    "w-6 h-6 stroke-1",
                    "md:w-8 md:h-8",
                    "lg:w-10 lg:h-10"
                  )}
                />
              </AvatarFallback>
            </Avatar>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
