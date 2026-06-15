import { motion } from "framer-motion";
import { why } from "../data/content";
import { Reveal } from "./Reveal";
import "./sections.css";

export function WhyNex() {
  return (
    <section className="section section--light why" id="why">
      <div className="container">
        <span className="eyebrow">Why Nex</span>
        <div className="why-list">
          {why.lines.map((w, i) => (
            <motion.h2
              key={w}
              className="why-line"
              initial={{ opacity: 0.1, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
            </motion.h2>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="why-sub">{why.sub}</p>
        </Reveal>
      </div>
    </section>
  );
}
