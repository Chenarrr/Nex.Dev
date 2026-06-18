import { motion } from "framer-motion";
import { whatWeDo } from "../data/content";
import { Reveal } from "./Reveal";
import "./sections.css";

export function Services() {
  return (
    <section className="section section--light" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What we do</span>
          <h2 className="section-title">Six layers. One team.</h2>
        </Reveal>

        <div className="wd-grid">
          {whatWeDo.map((w, i) => (
            <motion.div
              className="wd-tile"
              key={w.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>{w.title}</h3>
              <p>{w.line}</p>
              <div className="wd-tools">
                {w.tools.map((tool) => (
                  <img
                    key={tool.slug}
                    className="tech-ic"
                    src={`https://cdn.simpleicons.org/${tool.slug}/8a8a93`}
                    alt={tool.name}
                    title={tool.name}
                    loading="lazy"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
