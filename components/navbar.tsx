import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { NAV_ITEMS } from "@/constants/nav";

// TODO: Mangage hover & active states for svg nav items
// TODO: Remove x padding on mobile
// TODO: Add dynamic profile image

export const NavBar = () => {
  return (
    <section
      className={cn(
        "flex justify-between items-center px-4 py-5 bg-muted",
        "md:p-6 rounded-lg",
        "lg:flex-col lg:h-[calc(100vh-64px)] lg:p-8 lg:rounded-2xl lg:relative"
      )}
    >
      <div>
        <Image
          className={cn("w-6 h-5", "md:w-8 md:h-6")}
          src="/icons/movix.svg"
          width={32}
          height={25}
          alt="movix"
        />
      </div>
      <nav>
        <ul
          className={cn(
            "flex gap-x-6",
            "md:gap-x-8",
            "lg:flex-col lg:gap-x-0 lg:gap-y-10 lg:absolute lg:top-36 lg:left-1/2 lg:-translate-x-1/2"
          )}
        >
          {NAV_ITEMS.map(({ label, href, icon }) => (
            <li key={label}>
              <Link href={href}>
                <Image
                  className={cn(
                    "fill-current text-white w-4 h-4",
                    "md:w-5 md:h-5"
                  )}
                  src={icon}
                  width={20}
                  height={20}
                  alt={label}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Image
          src="/icons/profile-pic.svg"
          className={cn("w-6 h-6", "md:w-8 md:h-8", "lg:w-10 lg:h-10")}
          width={40}
          height={40}
          alt="user profile pic"
        />
      </div>
    </section>
  );
};
