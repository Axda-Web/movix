import { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface NavIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  dangerouslySetInnerHTML?: { __html: string };
  rest?: any;
}

export const NavIcon = ({
  className,
  dangerouslySetInnerHTML,
  ...rest
}: NavIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(
        "text-secondary w-4 h-4 hover:text-accent transition flex items-center justify-center",
        "md:w-5 md:h-5",
        className
      )}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  );
};
