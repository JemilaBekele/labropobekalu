"use client";

import { usePathname } from "next/navigation";
import { cx } from "../lib/cx";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from 'react';
export const TopNavBar = () => {
  if (typeof window !== 'undefined') {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch((error) => {
          console.log('ServiceWorker registration failed: ', error);
        });
      });
    }
  }
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = '/service-worker-registration.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup script if needed
        document.body.removeChild(script);
      };
    }
  }, []);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <div className="flex items-center justify-center gap-1">
            <Image
              src={"assets/heart.svg"}
              width={16}
              height={16}
              alt="logo"
              className="h-8 w-full"
              priority
            />
            <h1 className="text-xl whitespace-nowrap font-bold text-primary">
              Ultra Health
            </h1>
          </div>
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {[
            ["/resume-parser", "Laboratory Report  Builder"],
            
          ].map(([href, text]) => (
            <Link
              key={text}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
              href={href}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
