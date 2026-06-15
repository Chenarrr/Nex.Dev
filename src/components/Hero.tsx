import { motion } from "framer-motion";
import { hero } from "../data/content";
import "./hero.css";

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.08 + i * 0.08, ease },
  }),
};

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="grid-overlay" aria-hidden />
      <div className="hero-inner container">
        <motion.div className="hero-meta" variants={rise} custom={0} initial="hidden" animate="show">
          <span>{hero.badge}</span>
        </motion.div>

        <div className="hero-stage">
          <motion.div className="hero-brand" variants={rise} custom={1} initial="hidden" animate="show" aria-label="Nex">
            <span className="hero-slash" />
            <span className="hero-node" />
            <span className="hero-brand-word">Nex</span>
          </motion.div>

          <div className="hero-copy">
            <h1 className="hero-h1">
              <span className="hero-line">
                <motion.span variants={rise} custom={2} initial="hidden" animate="show">
                  {hero.h1a}
                </motion.span>
              </span>
              <span className="hero-line">
                <motion.span variants={rise} custom={3} initial="hidden" animate="show">
                  {hero.h1b}
                </motion.span>
              </span>
            </h1>

            <motion.p className="hero-sub" variants={rise} custom={4} initial="hidden" animate="show">
              {hero.sub}
            </motion.p>

            <motion.div className="hero-actions" variants={rise} custom={5} initial="hidden" animate="show">
              <a href="#contact" className="btn-primary">
                Tell us what you're building <span aria-hidden>→</span>
              </a>
              <a href="#work" className="btn-ghost">
                See the work <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div className="hero-capabilities" variants={rise} custom={6} initial="hidden" animate="show">
          <span>Apps</span>
          <span>Web</span>
          <span>Systems</span>
          <span>Reliability</span>
        </motion.div>
      </div>
    </section>
  );
}
