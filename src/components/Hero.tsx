import { motion } from "framer-motion";
import { hero } from "../data/content";
import { LaptopFrame, PhoneFrame } from "./Devices";
import { WebScreen, MobileScreen } from "./screens";
import "./hero.css";

const ease = [0.16, 1, 0.3, 1] as const;

const copyParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const scene = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.45 } },
};
const piece = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
};
const chip = {
  hidden: { opacity: 0, y: 14, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
};

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="grid-overlay" aria-hidden />

      <div className="hero-inner container">
        <motion.div className="hero-copy" variants={copyParent} initial="hidden" animate="show">
          <motion.span className="hero-eyebrow" variants={rise}>
            <span className="hero-eyebrow-dot" /> {hero.badge}
          </motion.span>
          <h1 className="hero-h1">
            <motion.span variants={rise}>{hero.h1a}</motion.span>
            <motion.span variants={rise} className="dim">
              {hero.h1b}
            </motion.span>
          </h1>
          <motion.p className="hero-sub" variants={rise}>
            {hero.sub}
          </motion.p>
          <motion.div className="hero-actions" variants={rise}>
            <a href="#contact" className="btn-primary">
              Tell us what you're building <span aria-hidden>→</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-scene" variants={scene} initial="hidden" animate="show" aria-hidden>
          <motion.div className="hero-laptop" variants={piece}>
            <LaptopFrame>
              <WebScreen />
            </LaptopFrame>
          </motion.div>

          <motion.div className="hero-phone" variants={piece}>
            <PhoneFrame>
              <MobileScreen />
            </PhoneFrame>
          </motion.div>

          <motion.div className="hero-chip chip-stat" variants={chip}>
            <span className="chip-k">Revenue</span>
            <b>48,250</b>
            <em>▲ 12%</em>
          </motion.div>

          <motion.div className="hero-chip chip-note" variants={chip}>
            <span className="chip-pulse" />
            New order · #1042
          </motion.div>

          <motion.div className="hero-chip chip-rate" variants={chip}>
            <b>4.9</b>
            <span className="chip-k">★ App Store</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
