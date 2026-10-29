"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { cn } from "cn";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destination", label: "Destinations" },
  { href: "/add-destination", label: "Add Destination" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/admin", label: "Admin" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut();
    redirect("/login");
  };

  const { data: session } = useSession();
  const user = session?.user;
  // console.log(user);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white shadow-sm">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium underline-offset-4 transition-colors hover:text-[#00A5CC]",
                  isActive ? "text-[#00A5CC] underline" : "text-zinc-800",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/" className="justify-self-center">
          <Image
            src="/images/Wanderlast.png"
            loading="eager"
            alt="Wanderlast"
            width={280}
            height={40}
            className="h-5 w-auto md:h-6"
          />
        </Link>

        <div className="flex items-center justify-end gap-4 sm:gap-6">
          {user ? (
            <>
              <span className="hidden items-center gap-1.5 text-sm font-medium text-zinc-800 transition-colors  sm:flex">
                Welcome {user?.name}
              </span>
              <Popover>
                <PopoverTrigger
                  render={
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                      />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  }
                />
                <PopoverContent align="start">
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>
                      <p>{user?.email}</p>
                      <Link href="/profile" className="hover:text-[#00A5CC]">
                        Your profile
                      </Link>{" "}
                      <br />
                      <Button onClick={handleSignOut} variant={"destructive"}>
                        Sign Out
                      </Button>
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              {" "}
              <Link
                href="/login"
                className="hidden text-sm font-medium text-zinc-800 transition-colors hover:text-[#00A5CC] sm:inline"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold text-zinc-900 transition-colors hover:text-[#00A5CC]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
