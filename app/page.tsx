"use client";

import Image from "next/image";
import { useState } from "react";

// Type Definitions
interface InlineLink {
  text: string;
  url: string;
}

interface ContentWithLink {
  prefix: string;
  link: InlineLink;
  suffix?: string;
}

interface NavLink {
  href: string;
  label: string;
}

// Content Constants
const HERO_CONTENT = [
  "I build 24/7/365",
  "In high school, I was caught skipping class to take calls in the bathroom",
  "I am now building whilst studying at the University of Pennsylvania",
  "At 16, my project was acquired by the United Nations"
] as const;

const CONTENT_WITH_LINKS: ContentWithLink[] = [
  {
    prefix: "At 17, I received international acclaim building ",
    link: { text: "17.JasonXu.me", url: "https://17.jasonxu.me" },
  },
  {
    prefix: "At 19, I became the #2 founding engineer at ",
    link: { text: "Icon.com", url: "https://icon.com" },
    suffix: " ($12M+ ARR)",
  },
];

const CLOSING_LINE = "I am 20 now and looking for my next challenge";
const EMAIL = "him@jasonxu.me";

const FOOTER_LINKS: readonly NavLink[] = [
  { href: "https://resume.jasonxu.me", label: "Resume" },
  { href: "https://contact.jasonxu.me", label: "Contact" },
  { href: "https://github.com/mootbing", label: "GitHub" },
  { href: "https://linkedin.com/in/xj1", label: "LinkedIn" },
] as const;

const STORY_LINKS: readonly NavLink[] = [
  { href: "https://17.jasonxu.me", label: "My Life @ 17" },
  { href: "https://hs.jasonxu.me", label: "HS Portfolio" },
] as const;

// Style Constants
const STYLES = {
  montserrat: {
    fontFamily: "var(--font-montserrat), sans-serif",
    fontWeight: 300,
  },
  playfair: {
    fontFamily: "var(--font-playfair), serif",
    fontWeight: 300,
  },
  colors: {
    primary: "#333",
    secondary: "#666",
    separator: "#ccc",
  },
} as const;

export default function Home() {
  const [headingText, setHeadingText] = useState("I chase dreams.");

  const toggleHeading = () => {
    setHeadingText((prev) =>
      prev === "I chase dreams." ? "I build realities." : "I chase dreams."
    );
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        ...STYLES.montserrat,
        color: STYLES.colors.primary,
      }}
    >
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-3xl mt-6 mb-6">
          {/* Name Header */}
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/cow.svg"
              alt="Cow icon"
              width={48}
              height={48}
              className="invert brightness-75"
            />
            <p
              className="text-base md:text-lg"
              style={{
                ...STYLES.montserrat,
                color: STYLES.colors.secondary,
                letterSpacing: "0.1em",
              }}
            >
              JASON XU
            </p>
          </div>

          {/* Hero Heading */}
          <h1
            onClick={toggleHeading}
            className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight cursor-pointer"
            style={{
              ...STYLES.playfair,
              color: STYLES.colors.primary,
            }}
          >
            {headingText}
          </h1>

          {/* Content Section */}
          <div
            className="space-y-6 text-base md:text-lg"
            style={{ color: STYLES.colors.secondary, lineHeight: 1.7 }}
          >
            {HERO_CONTENT.map((text) => (
              <p key={text}>{text}</p>
            ))}

            {CONTENT_WITH_LINKS.map(({ prefix, link, suffix }) => (
              <p key={link.url}>
                {prefix}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-link"
                >
                  {link.text}
                </a>
                {suffix}
              </p>
            ))}

            <p>{CLOSING_LINE}</p>
          </div>

          {/* Email Contact */}
          <h2>
            <a
              href={`mailto:${EMAIL}`}
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl mt-6 leading-tight inline-block"
              style={{
                ...STYLES.playfair,
                color: STYLES.colors.primary,
                textDecoration: "none",
                transformOrigin: "left center",
              }}
            >
              {EMAIL}
            </a>
          </h2>

          {/* Navigation Links */}
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8 mt-8 text-sm"
            style={{ color: STYLES.colors.secondary }}
          >
            {FOOTER_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                {label}
              </a>
            ))}
            {STORY_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
