import { ReactNode } from "react";
import Logo from "../components/Logo/Logo";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 m-8 flex flex-col gap-2 justify-center items-center">
      <Logo />
      {children}
    </div>
  );
}
