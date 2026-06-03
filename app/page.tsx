"use client";

import Image from "next/image";

// Type Definitions
interface InlineLink {
  text: string;
  url: string;
  // Brand logo shown before the link text (and clickable as part of the link).
  // `size` sets the clip-box px (default 18), `radius` its corner rounding px
  // (default 5), `zoom` scales the image inside the box, `fit` chooses object-fit
  // cover (default) or contain, `dy` nudges it down (px, negative = up), and
  // `grayscale` renders it black & white, `invert` inverts its colors, and
  // `brightness` (e.g. 1.3) scales luminance — useful to whiten a near-black
  // background after inverting.
  icon?: {
    src: string;
    alt: string;
    zoom?: number;
    radius?: number;
    size?: number;
    fit?: "cover" | "contain" | "fill";
    dy?: number;
    grayscale?: boolean;
    invert?: boolean;
    brightness?: number;
    bg?: string;
  };
}

type HeroSegment =
  | { text: string }
  | { bold: string }
  | { lineBreak: true }
  | { link: InlineLink };

type HeroItem = HeroSegment[];

interface NavLink {
  href: string;
  label: string;
}

// Content Constants
const HERO_CONTENT: HeroItem[] = [
  [
    { text: "Investigating human-ai emotional " },
    {
      link: {
        text: "Resonance",
        url: "https://rsnc.ai",
        icon: { src: "/pally.svg", alt: "Pally" },
      },
    },
    { text: " in San Francisco, California." },
  ],
  [
    { text: "Previously I was..." },
  ],
  [
    { text: "- #2 Founding Engineer @ " },
    {
      link: {
        text: "Icon",
        url: "https://icon.com",
        icon: { src: "/icon.png", alt: "Icon", dy: 1 },
      },
    },
    { text: " ($12M ARR)" },
  ],
  [
    { text: "- Scout @ " },
    {
      link: {
        text: "Soma Capital",
        url: "https://somacap.com/",
        icon: { src: "/soma.png", alt: "Soma Capital", fit: "contain" },
      },
    },
    { text: " ($1B AUM)" },
  ],
  [
    { text: "- Founder in Residence @ " },
    {
      link: {
        text: "Photon",
        url: "https://photon.codes",
        icon: { src: "/photon.png", alt: "Photon" },
      },
    },
    { text: " (0.0042%)" },
  ],
  [
    { text: "- ML & PL @ " },
    {
      link: {
        text: "Penn Medicine",
        url: "https://www.pennmedicine.org/",
        icon: { src: "/penn.png", alt: "Penn Medicine", size: 20, dy: 1, grayscale: true },
      },
    },
    { text: " (Prof. Rajapakse)" },
  ],
  [
    { text: "- Content Strategist @ " },
    {
      link: {
        text: "Blackbox",
        url: "https://blackbox.ai",
        icon: { src: "/blackbox.png", alt: "Blackbox" },
      },
    },
    { text: " (1M+ views)" },
  ],
  [
    { text: "- SWE & PM @ " },
    {
      link: {
        text: "United Nations",
        url: "https://un.org",
        icon: { src: "/un.png", alt: "United Nations", size: 22, grayscale: true, brightness: 0.1, zoom: 1, fit: "contain" },
      },
    },
    { text: " (acq. @ 16)" },
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

  const getHeroItemClassName = (index: number) => {
    if (index === 0) return undefined;

    // The "Ex-" label (index 1) is spaced away from the intro; the experience
    // entries that follow it (index > 1) form a tight group beneath it.
    return index > 1 ? "mt-2" : "mt-6";
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
              <p key={index} className={getHeroItemClassName(index)}>
                {segments.map((segment, segmentIndex) =>
                  "link" in segment ? (
                    <a
                      key={segmentIndex}
                      href={segment.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-link"
                    >
                      {segment.link.icon && (
                        <span
                          className="inline-block align-middle mr-1 overflow-hidden"
                          style={{
                            width: `${segment.link.icon.size ?? 18}px`,
                            height: `${segment.link.icon.size ?? 18}px`,
                            borderRadius: `${segment.link.icon.radius ?? 5}px`,
                            marginTop: `${-4 + (segment.link.icon.dy ?? 0)}px`,
                            backgroundColor: segment.link.icon.bg,
                          }}
                        >
                          <Image
                            src={segment.link.icon.src}
                            alt={segment.link.icon.alt}
                            width={segment.link.icon.size ?? 18}
                            height={segment.link.icon.size ?? 18}
                            className={`h-full w-full ${
                              segment.link.icon.fit === "contain"
                                ? "object-contain"
                                : segment.link.icon.fit === "fill"
                                ? "object-fill"
                                : "object-cover"
                            }`}
                            style={{
                              ...(segment.link.icon.zoom
                                ? { transform: `scale(${segment.link.icon.zoom})` }
                                : {}),
                              filter:
                                [
                                  segment.link.icon.grayscale && "grayscale(1)",
                                  segment.link.icon.invert && "invert(1)",
                                  segment.link.icon.brightness &&
                                    `brightness(${segment.link.icon.brightness})`,
                                ]
                                  .filter(Boolean)
                                  .join(" ") || undefined,
                            }}
                          />
                        </span>
                      )}
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
