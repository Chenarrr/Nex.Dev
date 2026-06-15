import { useEffect, useState } from "react";
import { NexMark } from "./NexMark";
import { ThemeToggle } from "./ThemeToggle";
import "./nav.css";

export function Nav() {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const probe = window.scrollY + 88;
      const darkSections = document.querySelectorAll<HTMLElement>(".morph, .section-work, .footer");
      setOverDark(
        Array.from(darkSections).some((section) => {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          return probe >= top && probe < bottom;
        }),
      );
    };
    const requestCheck = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", requestCheck, { passive: true });
    window.addEventListener("resize", requestCheck);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestCheck);
      window.removeEventListener("resize", requestCheck);
    };
  }, []);

  return (
    <header className={`nav${overDark ? " nav-over-dark" : ""}`}>
      <div className="nav-inner container">
        <a className="nav-brand" href="#top">
          <NexMark size={26} />
          <span>Nex</span>
        </a>
        <nav className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#why">About</a>
          <a href="#contact" className="nav-cta">
            Start a project
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
