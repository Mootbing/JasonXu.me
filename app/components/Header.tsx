"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "https://resume.jasonxu.me", label: "Resume" },
  { href: "https://contact.jasonxu.me", label: "Contact" },
] as const;

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/cow.svg"
              alt="Cow icon"
              width={48}
              height={48}
              className="invert brightness-75"
              priority
            />
            <h1
              className="text-2xl md:text-3xl"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 300,
                color: "#333",
              }}
            >
              Jason Xu
            </h1>
          </Link>

          <nav className="flex gap-6 md:gap-8 items-center text-sm text-black">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} rel="noopener noreferrer" className="nav-link">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
