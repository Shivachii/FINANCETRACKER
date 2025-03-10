import { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" flex  w-full">
      <Navbar />
      <main className="flex-1  container mx-auto px-4 py-5 ">{children}</main>
    </div>
  );
}
