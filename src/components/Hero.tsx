import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { hero } from "../data/content";
import { LaptopFrame, PhoneFrame } from "./Devices";
import { WebScreen, MobileScreen } from "./screens";
import "./hero.css";

const ease = [0.16, 1, 0.3, 1] as const;

const copyParent = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const sceneV = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } } };
const piece = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
};
const chip = {
  hidden: { opacity: 0, y: 14, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
};

// Plays a looping video inside a device screen; falls back to the mock UI
// until a real clip exists at `src`.
function MediaScreen({ src, children, fit = "cover" }: { src: string; children: ReactNode; fit?: "cover" | "contain" }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="media-screen">
      {children}
      <video
        className={`media-vid media-vid-${fit}`}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ opacity: ok ? 1 : 0 }}
        onLoadedData={() => setOk(true)}
        onError={() => setOk(false)}
      />
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
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
        </motion.div>

        <motion.div className="hero-scene" variants={sceneV} initial="hidden" animate="show" aria-hidden>
          <motion.div className="hero-laptop" variants={piece}>
            <LaptopFrame>
              <MediaScreen src="/media/hero-web.mp4">
                <WebScreen />
              </MediaScreen>
            </LaptopFrame>
          </motion.div>

          <motion.div className="hero-phone" variants={piece}>
            <PhoneFrame>
              <MediaScreen src="/media/hero-app.mp4">
                <MobileScreen />
              </MediaScreen>
            </PhoneFrame>
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
