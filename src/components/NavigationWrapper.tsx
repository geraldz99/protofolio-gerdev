"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/admin") || pathname.startsWith("/login");

  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
