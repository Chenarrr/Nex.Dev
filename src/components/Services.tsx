import { motion } from "framer-motion";
import { services, type Service } from "../data/content";
import { Scene } from "./screens";
import { Reveal } from "./Reveal";
import "./sections.css";

export function Services({ onOpen }: { onOpen: (s: Service) => void }) {
  return (
    <section className="section section--light" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What we do</span>
          <h2 className="section-title">One team for every layer of your product.</h2>
        </Reveal>

        <div className="svc-grid">
          {services.map((s, i) => (
            <motion.article
              className="svc-card"
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="svc-media">
                <div className={`svc-scene svc-scene-${s.scene}`}>
                  <Scene kind={s.scene} />
                </div>
              </div>
              <div className="svc-body">
                <span className="svc-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.tagline}</p>
                <div className="svc-tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <button type="button" className="svc-btn" onClick={() => onOpen(s)}>
                  Read more <span aria-hidden>→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
