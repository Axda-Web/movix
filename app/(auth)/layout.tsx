import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn("min-h-screen w-full flex justify-center items-center")}
    >
      {children}
    </section>
  );
}
