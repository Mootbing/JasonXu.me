"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import PolaroidStack from "./PolaroidCard";
import type { PolaroidItem } from "./PolaroidCard";
import projects from "../data/Work.json";

function HighlightedText({ text }: { text: string }) {
  return text.split(/(==.*?==)/g).map((part, index) =>
    part.startsWith("==") ? <mark key={index}>{part.slice(2, -2)}</mark> : part
  );
}

function Project({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article
      className="portfolio-project"
      initial={reducedMotion ? false : { opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.25 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-label={project.title}
    >
      <div className="portfolio-project-copy">
        <p className="portfolio-date">{project.year}</p>
        <h3>{project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title} <span aria-hidden="true">↗</span></a> : project.title}</h3>
        <p className="portfolio-description"><HighlightedText text={project.description} /></p>
        {project.fullDescription ? (
          <details className="portfolio-details">
            <summary>More about this project</summary>
            <p><HighlightedText text={project.fullDescription} /></p>
          </details>
        ) : null}
        {project.badges?.length ? (
          <div className="portfolio-badges">
            {project.badges.map((badge, i) => {
              if ("text" in badge) return <span key={i}>{badge.text}</span>;
              // Preserve the original project badges at their natural proportions.
              // eslint-disable-next-line @next/next/no-img-element
              const badgeImage = <img src={badge.src} alt={badge.alt} width={badge.width} height={badge.height} loading="lazy" />;
              return badge.href ? <a key={i} href={badge.href} target="_blank" rel="noopener noreferrer">{badgeImage}</a> : <span key={i}>{badgeImage}</span>;
            })}
          </div>
        ) : null}
      </div>
      <div className="portfolio-project-photos">
        <PolaroidStack items={project.polaroids as PolaroidItem[]} side="right" index={index} year={project.year} title={project.title} />
      </div>
    </motion.article>
  );
}

export default function PortfolioPanel({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    const oldOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      dialog?.close();
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    // Mouse wheels move along the project strip; touch and trackpad horizontal
    // gestures retain their native scrolling and inertia.
    let snapTimer: ReturnType<typeof setTimeout> | undefined;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const target = event.target as HTMLElement;
      const copy = target.closest(".portfolio-project-copy");
      if (copy && copy.scrollHeight > copy.clientHeight) {
        const canScroll = event.deltaY > 0
          ? copy.scrollTop + copy.clientHeight < copy.scrollHeight - 1
          : copy.scrollTop > 0;
        if (canScroll) return;
      }
      const delta = event.deltaY * (event.deltaMode === 1 ? 24 : event.deltaMode === 2 ? rail.clientWidth : 1);
      if (delta) {
        event.preventDefault();
        rail.style.scrollSnapType = "none";
        rail.scrollLeft += delta;
        if (snapTimer) clearTimeout(snapTimer);
        snapTimer = setTimeout(() => {
          const nearest = Math.round(rail.scrollLeft / rail.clientWidth);
          rail.style.scrollSnapType = "";
          rail.scrollTo({ left: nearest * rail.clientWidth, behavior: "smooth" });
        }, 180);
      }
    };
    rail.addEventListener("wheel", wheel, { passive: false });
    return () => {
      rail.removeEventListener("wheel", wheel);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, []);

  const close = () => {
    if (closing) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      dialogRef.current?.close();
      onClose();
    }, reducedMotion ? 0 : 300);
  };

  const goTo = (index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: Math.max(0, Math.min(projects.length - 1, index)) * rail.clientWidth, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return (
    <dialog
      ref={dialogRef}
      id="portfolio-dialog"
      className={`portfolio-dialog${closing ? " is-closing" : ""}`}
      aria-labelledby="portfolio-heading"
      onCancel={(event) => {
        event.preventDefault();
        if (!document.body.classList.contains("polaroid-expanded")) close();
      }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <MotionConfig reducedMotion="user">
      <div className="portfolio-shell">
        <header className="portfolio-header">
          <div>
            <p className="portfolio-eyebrow">SELECTED WORK</p>
            <h2 id="portfolio-heading">Highlights & Projects</h2>
          </div>
          <button type="button" className="portfolio-close" onClick={close} aria-label="Close portfolio" autoFocus>×</button>
        </header>
        <div
          ref={railRef}
          className="portfolio-rail"
          role="region"
          aria-label="Projects — scroll horizontally"
          tabIndex={0}
          onScroll={() => {
            const rail = railRef.current;
            if (rail) setActive(Math.round(rail.scrollLeft / rail.clientWidth));
          }}
          onKeyDown={(event) => {
            if ((event.target as HTMLElement).closest("a, button, summary, input, textarea")) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(active + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
        >
          {projects.map((project, index) => <Project key={project.title} project={project} index={index} />)}
        </div>
        <footer className="portfolio-controls">
          <p>Scroll <span aria-hidden="true">→</span> <span className="portfolio-hint"> · Swipe & click the polaroids</span></p>
          <div className="portfolio-pagination">
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous project">←</button>
            <span aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === projects.length - 1} aria-label="Next project">→</button>
          </div>
        </footer>
      </div>
      </MotionConfig>
    </dialog>
  );
}
