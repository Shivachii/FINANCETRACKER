"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SmallLogo } from "../Logo/Logo";
import {
  ChartColumnBig,
  HomeIcon,
  Menu,
  Settings,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

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
    <>
      <div className="md:hidden">
        <SmallNavbar />
      </div>
      <div className="hidden h-screen w-64 bg-slate-50 p-4 md:flex flex-col sticky top-0 left-0">
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
          <span className="text-gray-600 text-sm font-bold">
            {" "}
            Logged in as :
          </span>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </>
  );
}

function SmallNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 768);
    checkScreenSize(); // Check on mount
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden   p-2 fixed top-4 right-2 z-50 bg-gray-100 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
      {/* Sidebar */}
      <div
        className={`h-screen w-56 md:w-64 bg-slate-50 p-4 flex flex-col fixed top-0 left-0 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-56"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-8 flex gap-8 items-center">
          <SmallLogo />
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col flex-grow gap-2">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              onClick={() => setIsOpen(!isOpen)}
              className="block"
            >
              <span
                className={`flex items-center gap-4 py-2 px-4 rounded-md hover:bg-slate-200 ${
                  pathname === link.href
                    ? "bg-gray-200 font-semibold border-l-blue-500 border-4 border-r-0 border-y-0"
                    : "text-black"
                }`}
              >
                <link.logo size={20} /> {isOpen || isDesktop ? link.name : ""}
              </span>
            </Link>
          ))}
        </nav>
        {/* User Section */}
        <div className="flex my-10 items-center gap-2 py-2 px-4">
          <span className="text-gray-600 text-sm font-bold">Logged in as:</span>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Overlay (Closes Sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50  md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
