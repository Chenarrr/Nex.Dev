import { useRef } from "react";
import { motion } from "framer-motion";
import { projects, services, type Service } from "../data/content";
import { Scene } from "./screens";
import { Reveal } from "./Reveal";
import "./sections.css";

export function Projects({ onOpen }: { onOpen: (s: Service) => void }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // drag-to-scroll for the horizontal carousel
  function onPointerDown(e: React.PointerEvent) {
    const el = trackRef.current;
    if (!el) return;
    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    let moved = false;
    el.setPointerCapture(e.pointerId);
    el.classList.add("dragging");
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const up = () => {
      el.classList.remove("dragging");
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      if (moved) el.dataset.dragged = "1";
      else delete el.dataset.dragged;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
  }

  return (
    <section className="section section-work" id="work">
      <div className="container">
        <Reveal className="section-head work-head">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="section-title">What we build, up close.</h2>
          </div>
          <span className="work-hint mono">Drag to explore →</span>
        </Reveal>
      </div>

      <div className="work-track" ref={trackRef} onPointerDown={onPointerDown} aria-label="Selected work">
        {projects.map((p, i) => {
          const svc = services.find((s) => s.id === p.serviceId);
          return (
            <motion.article
              className="work-card"
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="work-media">
                <div className={`work-scene work-scene-${p.scene}`}>
                  <Scene kind={p.scene} />
                </div>
              </div>
              <div className="work-text">
                <span className="work-no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.sub}</p>
                <button
                  type="button"
                  className="work-btn"
                  onClick={(e) => {
                    if ((e.currentTarget.closest(".work-track") as HTMLElement)?.dataset.dragged) return;
                    svc && onOpen(svc);
                  }}
                >
                  View <span aria-hidden>→</span>
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
