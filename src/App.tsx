import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { DeviceMorph } from "./components/DeviceMorph";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { WhyNex } from "./components/WhyNex";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ServiceModal } from "./components/ServiceModal";
import type { Service } from "./data/content";

export default function App() {
  const [openService, setOpenService] = useState<Service | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    const stopScrollSync = lenis.on("scroll", () => ScrollTrigger.update());
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      stopScrollSync();
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DeviceMorph />
        <Services onOpen={setOpenService} />
        <Projects onOpen={setOpenService} />
        <WhyNex />
        <Contact />
      </main>
      <Footer />
      <ServiceModal service={openService} onClose={() => setOpenService(null)} />
    </>
  );
}
