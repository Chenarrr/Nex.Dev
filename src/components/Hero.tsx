import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hero } from "../data/content";
import { HeroCanvas } from "./HeroCanvas";
import "./hero.css";

const ease = [0.16, 1, 0.3, 1] as const;
const WORDS = ["apps", "websites", "systems", "everything"];

// typewriter that cycles through WORDS
function useTyped() {
  const [text, setText] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText("apps");
      return;
    }
    let word = 0;
    let char = 0;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      const current = WORDS[word];
      char += deleting ? -1 : 1;
      setText(current.slice(0, char));
      let delay = deleting ? 45 : 90;
      if (!deleting && char === current.length) {
        delay = 1400;
        deleting = true;
      } else if (deleting && char === 0) {
        deleting = false;
        word = (word + 1) % WORDS.length;
        delay = 320;
      }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, []);
  return text;
}

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.85, delay: 0.15 + i * 0.12, ease },
  }),
};

export function Hero() {
  const typed = useTyped();

  return (
    <section className="hero" id="top">
      <HeroCanvas />
      <div className="hero-veil" aria-hidden />

      <div className="hero-inner container">
        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="hero-dot" /> {hero.badge}
        </motion.div>

        <div className="hero-stage">
          <motion.div
            className="hero-brand"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            aria-label="Nex"
          >
            <span className="hero-slash" />
            <span className="hero-node" />
            <span className="hero-word">Nex</span>
          </motion.div>

          <div className="hero-copy">
            <motion.div
              className="hero-typed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="hero-prompt">nex build</span>
              <span className="hero-typed-word">{typed}</span>
              <span className="hero-caret" />
            </motion.div>

            <h1 className="hero-h1">
              <span className="hero-line">
                <motion.span variants={line} custom={0} initial="hidden" animate="show">
                  {hero.h1a}
                </motion.span>
              </span>
              <span className="hero-line">
                <motion.span variants={line} custom={1} initial="hidden" animate="show">
                  {hero.h1b}
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
            >
              {hero.sub}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease }}
            >
              <a href="#contact" className="btn-primary">
                Tell us what you're building <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
