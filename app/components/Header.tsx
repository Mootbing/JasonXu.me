"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/cow.svg"
              alt="Cow icon"
              width={48}
              height={48}
              style={{ filter: 'invert(1) brightness(0.7)' }}
            />
            <p className="text-2xl md:text-3xl"
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontWeight: 300,
                  color: '#333'
                }}
                onClick={() => window.location.href = '/'}>
              Jason Xu
            </p>
          </div>

          <nav className="flex gap-6 md:gap-8 items-center text-sm" style={{ color: '#000' }}>
            <a href="https://resume.jasonxu.me" rel="noopener noreferrer" className="nav-link">
              Resume
            </a>
            <a href="https://contact.jasonxu.me" rel="noopener noreferrer" className="nav-link">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
