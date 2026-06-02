"use client";

import Image from "next/image";

// Type Definitions
interface InlineLink {
  text: string;
  url: string;
}

type HeroSegment = { text: string } | { bold: string } | { lineBreak: true } | { link: InlineLink };

type HeroItem = HeroSegment[];

interface NavLink {
  href: string;
  label: string;
}

// Content Constants
const HERO_CONTENT: HeroItem[] = [
  [
    { text: "Currently investigating human-ai emotional " },
    { link: { text: "Resonance", url: "https://rsnc.ai" } },
    { text: " in San Francisco, California." },
  ],
  [
    { text: "prev." },
  ],
  [
    { text: "- #2 Founding Engineer @ " },
    { link: { text: "Icon", url: "https://icon.com" } },
    { text: " ($12M ARR)" },
  ],
  [
    { text: "- Scout @ " },
    { link: { text: "Soma Capital", url: "https://somacap.com/" } },
    { text: " ($1B AUM)" },
  ],
  [
    { text: "- ML & PL @ " },
    { link: { text: "Penn Medicine", url: "https://www.pennmedicine.org/" } },
  ],
  [
    { text: "- Content Strategist @ " },
    { link: { text: "Blackbox", url: "https://blackbox.ai" } },
    { text: " (1M+ views)" },
  ],
  [
    { text: "- SWE & PM @ " },
    { link: { text: "United Nations", url: "https://un.org" } },
    { text: " (acq.)" },
  ],
];

const EMAIL = "him@jasonxu.me";

const FOOTER_LINKS: readonly NavLink[] = [
  // { href: "https://resume.jasonxu.me", label: "Resume" },
  { href: "https://portfolio.jasonxu.me", label: "Portfolio" },
  { href: "https://contact.jasonxu.me", label: "Contact" },
] as const;

const STORY_LINKS: readonly NavLink[] = [
  { href: "https://17.jasonxu.me", label: "Lore" },
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
    light: {
      background: "#ffffff",
      primary: "#333333",
      secondary: "#666666",
    },
    dark: {
      background: "#000000",
      primary: "#cccccc",
      secondary: "#999999",
    },
  },
} as const;

export default function Home() {
  const colors = STYLES.colors.light;
  const isTextSegment = (segment: HeroSegment): segment is { text: string } =>
    "text" in segment;

  const isBulletItem = (segments: HeroItem) =>
    segments.length > 0 &&
    isTextSegment(segments[0]) &&
    segments[0].text.startsWith("- ");

  const getHeroItemClassName = (segments: HeroItem, index: number) => {
    if (index === 0) return undefined;

    const previousSegments = HERO_CONTENT[index - 1];
    const previousFirstSegment = previousSegments[0];

    if (
      isBulletItem(segments) &&
      (isBulletItem(previousSegments) ||
        (isTextSegment(previousFirstSegment) && previousFirstSegment.text === "prev."))
    ) {
      return "mt-2";
    }

    return "mt-6";
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        ...STYLES.montserrat,
        backgroundColor: colors.background,
        color: colors.primary,
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
              className="transition-all duration-300 invert brightness-75"
            />
            <p
              className="text-base md:text-lg transition-colors duration-300"
              style={{
                ...STYLES.montserrat,
                color: colors.secondary,
                letterSpacing: "0.1em",
              }}
            >
              JASON XU
            </p>
          </div>

          {/* Hero Heading */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight transition-colors duration-300"
            style={{
              ...STYLES.playfair,
              color: colors.primary,
            }}
          >
            <span>I chase dreams.</span>
          </h1>

          {/* Content Section */}
          <div
            className="text-base md:text-lg transition-colors duration-300"
            style={{ color: colors.secondary, lineHeight: 1.7 }}
          >
            {HERO_CONTENT.map((segments, index) => (
              <p key={index} className={getHeroItemClassName(segments, index)}>
                {segments.map((segment, segmentIndex) =>
                  "link" in segment ? (
                    <a
                      key={segmentIndex}
                      href={segment.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-link"
                    >
                      {segment.link.text}
                    </a>
                  ) : "bold" in segment ? (
                    <strong key={segmentIndex}>{segment.bold}</strong>
                  ) : "lineBreak" in segment ? (
                    <br key={segmentIndex} />
                  ) : (
                    <span key={segmentIndex}>{segment.text}</span>
                  )
                )}
                {index === 0 && (
                  <span className="animate-blink" style={{ color: colors.secondary }}> ░</span>
                )}
              </p>
            ))}
          </div>

          {/* Email Contact */}
          <h2>
            <a
              href="https://email.jasonxu.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl mt-6 leading-tight inline-block transition-colors duration-300"
              style={{
                ...STYLES.playfair,
                color: colors.primary,
                textDecoration: "none",
                transformOrigin: "left center",
              }}
            >
              {EMAIL}
            </a>
          </h2>

          {/* Navigation Links */}
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8 mt-8 text-sm transition-colors duration-300"
            style={{ color: colors.secondary }}
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
