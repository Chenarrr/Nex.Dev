import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Service } from "../data/content";
import { Scene } from "./screens";
import { PhoneFrame, LaptopFrame, DesktopFrame } from "./Devices";
import "./modal.css";

const ease = [0.16, 1, 0.3, 1] as const;

type LenisLike = { stop: () => void; start: () => void };

function SceneFrame({ kind }: { kind: Service["scene"] }) {
  const inner = <Scene kind={kind} />;
  if (kind === "mobile") return <PhoneFrame>{inner}</PhoneFrame>;
  if (kind === "web") return <LaptopFrame>{inner}</LaptopFrame>;
  return <DesktopFrame>{inner}</DesktopFrame>;
}

export function ServiceModal({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey, true);

    // Lock the page: stop Lenis (it ignores body overflow) + hard-lock body.
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey, true);
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="modal-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={service.title}
        >
          <motion.div
            className="modal-panel"
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close">
              ✕
            </button>

            <div className="modal-grid">
              <div className="modal-left">
                <span className="modal-eyebrow">Service {service.no}</span>
                <h2 className="modal-title">{service.title}</h2>
                <p className="modal-tagline">{service.description[0]}</p>

                <ul className="modal-caps">
                  {service.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>

                <p className="modal-outcome">{service.outcome}</p>

                <a href="#contact" className="modal-cta" onClick={onClose}>
                  Start a project <span aria-hidden>→</span>
                </a>
              </div>

              <div className="modal-right">
                <div className="modal-scene">
                  <SceneFrame kind={service.scene} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
