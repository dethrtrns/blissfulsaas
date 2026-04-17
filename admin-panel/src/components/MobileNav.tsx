"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileCheck, 
  UserCircle 
} from "lucide-react";

export default function MobileNav({ currentUserId }: { currentUserId: string }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const NAV_ITEMS = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Providers", icon: ShieldCheck, href: "/dashboard/therapists" },
    { label: "Apps", icon: FileCheck, href: "#", disabled: true },
    { label: "Account", icon: UserCircle, href: "/dashboard/account" },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-surface/80 backdrop-blur-3xl border border-primary/5 px-6 py-3 rounded-[2.5rem] z-50 lg:hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-primary/5 transition-all duration-500 hover:shadow-primary/5">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const isDisabled = item.disabled;

          return (
            <Link 
              key={item.label}
              href={isDisabled ? "#" : item.href}
              className={`flex flex-col items-center gap-1.5 transition-all duration-500 relative ${
                isDisabled ? 'opacity-20 cursor-not-allowed' :
                isActive ? 'text-primary scale-110' : 'text-primary/30 hover:text-primary/60'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all duration-500 ${
                isActive && !isDisabled ? 'bg-primary/10' : 'hover:bg-primary/5'
              }`}>
                <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
