"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavIcon } from "./nav-icon";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CircleUserRound } from "lucide-react";

import { NAV_ITEMS } from "@/constants/nav";
import { TooltipWrapper } from "./tooltip-wrapper";

interface NavBarProps {
  avatarUrl?: string | null;
}

export const NavBar = ({ avatarUrl }: NavBarProps) => {
  const pathname = usePathname();
  return (
    <section
      className={cn(
        "flex justify-between items-center px-4 py-5 bg-muted",
        "md:p-6 rounded-lg",
        "lg:flex-col lg:h-[calc(100vh-64px)] lg:p-8 lg:rounded-2xl lg:fixed"
      )}
    >
      <Link href="/">
        <Image
          className={cn("w-6 h-5", "md:w-8 md:h-6")}
          src="/icons/movix.svg"
          width={32}
          height={25}
          alt="movix"
        />
      </Link>
      <nav>
        <ul
          className={cn(
            "flex gap-x-6",
            "md:gap-x-8",
            "lg:flex-col lg:gap-x-0 lg:gap-y-10 lg:absolute lg:top-36 lg:left-1/2 lg:-translate-x-1/2"
          )}
        >
          {NAV_ITEMS.map(({ label, href, iconPath }) => (
            <li key={label}>
              <Link href={href}>
                <NavIcon
                  className={cn({
                    "text-white": pathname === href,
                    "w-[17px] ml-px": label === "Bookmarked medias",
                  })}
                  dangerouslySetInnerHTML={{ __html: iconPath }}
                  aria-label={label}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {avatarUrl ? (
        <Link href="/account">
          <TooltipWrapper content="Account">
            <Avatar
              className={cn("w-6 h-6", "md:w-8 md:h-8", "lg:w-10 lg:h-10")}
            >
              <AvatarImage src={avatarUrl} alt="user profile pic" />
              <AvatarFallback>
                <CircleUserRound
                  className={cn(
                    "w-6 h-6 stroke-1 stroke-secondary",
                    "md:w-8 md:h-8",
                    "lg:w-10 lg:h-10"
                  )}
                />
              </AvatarFallback>
            </Avatar>
          </TooltipWrapper>
        </Link>
      ) : (
        <Link href="/login">
          <TooltipWrapper content="Login">
            <CircleUserRound
              className={cn(
                "w-6 h-6 stroke-1 stroke-secondary",
                "md:w-8 md:h-8",
                "lg:w-10 lg:h-10"
              )}
            />
          </TooltipWrapper>
        </Link>
      )}
    </section>
  );
};
