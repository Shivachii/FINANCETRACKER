import { PiggyBank } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <PiggyBank className="stroke h-11 w-11 stroke-cyan-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text leading-tight -tracking-tighter text-transparent text-3xl font-bold">
        Finance Tracker App
      </p>
    </Link>
  );
}

export function SmallLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <PiggyBank className="stroke h-8 w-8 stroke-cyan-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text leading-tight -tracking-tighter text-transparent text-lg font-bold">
        FinanceTracker
      </p>
    </Link>
  );
}
