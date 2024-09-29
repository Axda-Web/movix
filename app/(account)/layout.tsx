import type { Metadata } from "next";
import { Outfit as FontOutfit } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { auth } from "@/auth";

import { NavBar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

const fontOutfit = FontOutfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen font-sans antialiased w-full mx-auto max-w-screen-2xl",
          "md:px-6 md:py-6",
          "lg:py-8",
          fontOutfit.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={cn(
              "flex flex-col",
              "lg:flex-row lg:space-x-9 lg:max-w-[1440px]"
            )}
          >
            <NavBar avatarUrl={session?.user ? session?.user?.image : null} />
            <main className={cn("lg:pl-24")}>{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
