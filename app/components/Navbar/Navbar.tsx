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
import { ThemeToggle } from "../Buttons/themeToggle";

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

      <div className="hidden h-screen w-64 bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4 md:flex flex-col sticky top-0 left-0">
        <div className="mb-8 flex gap-8 items-center">
          <SmallLogo />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col flex-grow gap-2">
          {navLinks.map((link) => {
            return (
              <Link href={link.href} key={link.name} className="block">
                <span
                  className={`flex items-center gap-4 py-2 px-4 rounded-l-none rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 ${
                    pathname === link.href
                      ? "bg-gray-200 dark:bg-gray-700 font-semibold border-l-blue-500 border-4 border-r-0 border-y-0"
                      : "text-black dark:text-white"
                  }`}
                >
                  {link.logo && <link.logo />} {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle Button */}
        <div className="flex items-center p-2 gap-1">
          <ThemeToggle />
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Change Theme
          </span>
        </div>

        {/* User Section */}
        <div className="flex my-10 items-center gap-2 py-2 px-4">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-bold">
            Logged in as:
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 fixed top-4 right-2 z-50 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Menu size={24} className="text-black dark:text-white" />
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen w-60 md:w-64 bg-gray-100 dark:bg-gray-900 p-4 flex flex-col fixed top-0 left-0 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-60"
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
                className={`flex items-center gap-4 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 ${
                  pathname === link.href
                    ? "bg-gray-200 dark:bg-gray-700 font-semibold border-l-blue-500 border-4 border-r-0 border-y-0"
                    : "text-black dark:text-white"
                }`}
              >
                <link.logo size={20} /> {isOpen || isDesktop ? link.name : ""}
              </span>
            </Link>
          ))}
        </nav>

        {/* Theme Toggle Button */}
        <div className="flex items-center p-2 gap-1">
          <ThemeToggle />
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Change Theme
          </span>
        </div>

        {/* User Section */}
        <div className="flex my-10 items-center gap-2 py-2 px-4">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-bold">
            Logged in as:
          </span>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Overlay (Closes Sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
