"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SmallLogo } from "../Logo/Logo";
import {
  ChartColumnBig,
  HomeIcon,
  Settings,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/", logo: HomeIcon },
  { name: "Manage Incomes", href: "/Manage/Income", logo: TrendingUp },
  { name: "Manage Expenses", href: "/Manage/Expenses", logo: TrendingDown },
  { name: "Manage Categories", href: "/Manage/Categories", logo: Settings },
  { name: "Analytics", href: "/Analytics", logo: ChartColumnBig },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className=" h-screen w-64 bg-slate-50 p-4 flex flex-col sticky top-0 left-0">
      <div className="mb-8 flex gap-8 items-center ">
        <SmallLogo />
      </div>
      <nav className="flex flex-col flex-grow gap-2">
        {navLinks.map((link) => {
          return (
            <Link href={link.href} key={link.name} className="block">
              <span
                className={`${
                  pathname === link.href
                    ? "bg-gray-200 font-semibold border-l-blue-500 border-4 border-r-0 border-y-0"
                    : "text-black"
                } py-2 px-4 rounded-l-none rounded-md hover:bg-slate-200 flex items-center gap-4`}
              >
                {link.logo && <link.logo />} {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="flex  my-10 items-center gap-2 py-2 px-4">
        <span className="text-gray-600 text-sm font-bold"> Logged in as :</span>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
