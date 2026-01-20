import Header from "./components/Header";

const HERO_CONTENT = [
  "I build 24/7/365",
  "Was the kid taking calls in the bathrooms during high school",
  "Now studying & building @ the University of Pennsylvania",
  "At 16, my project was acquired by the United Nations",
] as const;

interface InlineLink {
  text: string;
  url: string;
}

interface ContentWithLink {
  prefix: string;
  link: InlineLink;
  suffix?: string;
}

const CONTENT_WITH_LINKS: ContentWithLink[] = [
  {
    prefix: "At 17, I received international acclaim building ",
    link: { text: "17.JasonXu.me", url: "https://17.jasonxu.me" },
  },
  {
    prefix: "At 19, I was #2 founding eng at ",
    link: { text: "Icon.com", url: "https://icon.com" },
    suffix: " ($10M+ ARR)",
  },
];

const CLOSING_LINE = "I'm 20 now and looking for my next challenge";
const EMAIL = "him@jasonxu.me";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{
        fontFamily: "var(--font-montserrat), sans-serif",
        fontWeight: 300,
        color: "#333",
      }}
    >
      <Header />

      <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-3xl">
          <p
            className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 300,
              color: "#333",
            }}
          >
            I chase dreams.
          </p>

          <div
            className="space-y-6 text-base md:text-lg"
            style={{ color: "#666", lineHeight: 1.7 }}
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

          <h2>
            <a
              href={`mailto:${EMAIL}`}
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl lg:text-3xl mt-6 leading-tight inline-block"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 300,
                color: "#333",
                textDecoration: "none",
                transformOrigin: "left center",
              }}
            >
              {EMAIL}
            </a>
          </h2>
        </div>
      </section>
    </div>
  );
}
