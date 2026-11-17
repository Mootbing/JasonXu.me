"use client";

import { useEffect, useRef, useState } from "react";

export default function PortfolioPanel({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin &&
          event.source === frameRef.current?.contentWindow &&
          event.data?.type === "close-portfolio") {
        dialogRef.current?.close();
        onClose();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onClose]);

  const close = () => {
    if (closing) return;
    setClosing(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = setTimeout(() => {
      dialogRef.current?.close();
      onClose();
    }, reducedMotion ? 0 : 300);
  };

  return (
    <dialog
      ref={dialogRef}
      id="portfolio-dialog"
      className={`portfolio-dialog${closing ? " is-closing" : ""}`}
      aria-label="Portfolio"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div className="portfolio-shell">
        <iframe ref={frameRef} className="portfolio-frame" src="/portfolio-view" title="Portfolio projects" />
        <button type="button" className="portfolio-close" onClick={close} aria-label="Close portfolio" autoFocus>×</button>
      </div>
    </dialog>
  );
}
