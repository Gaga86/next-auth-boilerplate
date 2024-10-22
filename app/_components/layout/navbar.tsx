"use client";

import useScroll from "@/app/_lib/hooks/use-scroll";

export default function NavBar({ children }: { children: React.ReactNode }) {
  const scrolled = useScroll(50);

  return (
    <div
      className={`fixed top-0 w-full flex justify-center ${scrolled
        ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
        : "bg-white/0"
        } z-30 transition-all`}
    >
      {children}
    </div>
  );
}
