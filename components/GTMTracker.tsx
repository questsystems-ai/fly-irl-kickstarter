// components/GTMTracker.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gtmTrackPageView } from "@/lib/gtm";

export default function GTMTracker() {
  const pathname = usePathname();

  useEffect(() => {
    gtmTrackPageView(pathname);
  }, [pathname]);

  return null;
}
