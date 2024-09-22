import { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface BookmarkIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  rest?: any;
}

export const BookmarkIcon = ({ className, ...rest }: BookmarkIconProps) => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(
        "text-secondary w-3 h-3.5 hover:text-accent transition flex items-center justify-center",
        className
      )}
    >
      <path d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z" />
    </svg>
  );
};
