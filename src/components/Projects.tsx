import { motion } from "framer-motion";
import { projects, services, type Service } from "../data/content";
import { Scene } from "./screens";
import { Reveal } from "./Reveal";
import "./sections.css";

export function Projects({ onOpen }: { onOpen: (s: Service) => void }) {
  return (
    <section className="section section-work" id="work">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">What we build, up close.</h2>
        </Reveal>

        <div className="work-track" aria-label="Selected work">
          {projects.map((p, i) => {
            const svc = services.find((s) => s.id === p.serviceId);
            return (
              <motion.article
                className="work-card"
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
                  <div className="work-tags">
                    {p.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button type="button" className="work-btn" onClick={() => svc && onOpen(svc)}>
                    View <span aria-hidden>→</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
