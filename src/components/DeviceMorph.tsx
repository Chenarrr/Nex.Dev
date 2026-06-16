import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { morphStages } from "../data/content";
import { AndroidFrame, Cursor, DesktopFrame, Keyboard, LaptopFrame, Mouse, PhoneFrame } from "./Devices";
import { AndroidScreen, DashScreen, MobileScreen, WebScrollScreen, WebScreen } from "./screens";
import "./morph.css";

function baseScale(stage: number) {
  const mobile = window.innerWidth < 680;
  const tablet = window.innerWidth < 1080;
  if (stage === 0) return mobile ? 0.5 : tablet ? 0.62 : 0.78; // two phones
  if (stage === 1) return mobile ? 0.4 : tablet ? 0.58 : 0.72; // laptop
  return mobile ? 0.34 : tablet ? 0.5 : 0.66; // desktop + peripherals
}

export function DeviceMorph() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const microsRef = useRef<gsap.core.Timeline[]>([]);
  const [active, setActive] = useState(0);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll-pinned transitions between the three stage groups.
  useEffect(() => {
    if (reduced || !rootRef.current || !pinRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(".morph-group");
      if (groups.length < 3) return;

      // phones flip on Y; laptop opens/closes its lid; desktop flips on Y. Crisp, no blur.
      groups.forEach((g, i) => {
        gsap.set(g, {
          xPercent: -50,
          yPercent: -50,
          scale: baseScale(i),
          rotateY: i === 2 ? 90 : 0, // phones face, laptop faces (gated by opacity), desktop edge-on
          opacity: i === 0 ? 1 : 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      });
      gsap.set(".stage-web .laptop-lid", { rotateX: 84, transformOrigin: "50% 100%" });

      const tl = gsap.timeline();
      // 1 — phones flip out
      tl.to(groups[0], { rotateY: -90, duration: 0.5, ease: "power2.in" }, 0.2);
      // 2 — laptop appears, lid opens
      tl.set(groups[1], { opacity: 1 }, 0.46)
        .fromTo(
          ".stage-web .laptop-lid",
          { rotateX: 84 },
          { rotateX: 0, duration: 0.55, ease: "power3.out" },
          0.5,
        );
      // 3 — laptop lid closes, then hide
      tl.to(".stage-web .laptop-lid", { rotateX: 84, duration: 0.5, ease: "power2.in" }, 1.25)
        .set(groups[1], { opacity: 0 }, 1.8);
      // 4 — desktop flips in
      tl.fromTo(groups[2], { rotateY: 90, opacity: 1 }, { rotateY: 0, duration: 0.5, ease: "power2.out" }, 1.55);

      ScrollTrigger.create({
        trigger: rootRef.current,
        pin: pinRef.current,
        start: "top top",
        end: "+=320%",
        scrub: 0.35,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => groups.forEach((g, i) => gsap.set(g, { scale: baseScale(i) })),
        onUpdate: (self) => {
          const next = self.progress < 0.34 ? 0 : self.progress < 0.74 ? 1 : 2;
          setActive((cur) => (cur === next ? cur : next));
        },
      });

      // ---- per-stage micro animations (built once, paused) ----
      // phones gently float while active (the group flip already turns them in)
      const flip = gsap.timeline({ paused: true }).to(".stage-mobile .twin", {
        y: -10,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.25, yoyo: true, repeat: -1 },
      });

      const scroll = gsap
        .timeline({ paused: true, repeat: -1 })
        .to(".stage-web .scr-scroll", { yPercent: -50, duration: 6, ease: "none" })
        .set(".stage-web .scr-scroll", { yPercent: 0 });

      const keys = gsap.utils.toArray<HTMLElement>(".stage-desk .key");
      let keyIdx = 0;
      const desk = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5 });
      desk
        .set(".stage-desk .cursor", { x: 40, y: 40 })
        .to(".stage-desk .cursor", { x: 250, y: 90, duration: 1.1, ease: "power2.inOut" })
        .to(".stage-desk .cursor", { x: 150, y: 190, duration: 0.9, ease: "power2.inOut" }, ">0.2")
        .to(".stage-desk .cursor", { x: 320, y: 150, duration: 0.9, ease: "power2.inOut" }, ">0.2");
      if (keys.length) {
        desk.to(
          {},
          {
            duration: 0.16,
            repeat: 18,
            onRepeat: () => {
              keys.forEach((k) => k.classList.remove("lit"));
              keyIdx = (keyIdx * 7 + 3) % keys.length;
              keys[keyIdx]?.classList.add("lit");
            },
            onComplete: () => keys.forEach((k) => k.classList.remove("lit")),
          },
          0,
        );
      }

      microsRef.current = [flip, scroll, desk];
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  // Play the active stage's loop, pause the rest.
  useEffect(() => {
    if (reduced) return;
    microsRef.current.forEach((t, i) => {
      if (!t) return;
      if (i === active) {
        i === 0 ? t.restart() : t.play();
      } else {
        t.pause();
      }
    });
  }, [active, reduced]);

  if (reduced) {
    return (
      <section className="morph morph-static" id="platform" ref={rootRef}>
        <div className="grid-overlay" aria-hidden />
        <div className="container morph-static-inner">
          <div className="morph-top">
            <span>Built once</span>
            <span>Runs everywhere</span>
          </div>
          {morphStages.map((stage) => (
            <article className="morph-static-row" key={stage.no}>
              <div className="morph-static-visual">
                {stage.scene === "mobile" && (
                  <PhoneFrame>
                    <MobileScreen />
                  </PhoneFrame>
                )}
                {stage.scene === "web" && (
                  <LaptopFrame>
                    <WebScreen />
                  </LaptopFrame>
                )}
                {stage.scene === "dash" && (
                  <DesktopFrame>
                    <DashScreen />
                  </DesktopFrame>
                )}
              </div>
              <div>
                <span className="morph-kicker">{stage.kicker}</span>
                <h2>{stage.headline}</h2>
                <p>{stage.sub}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const stage = morphStages[active];

  return (
    <section className="morph" id="platform" ref={rootRef}>
      <div className="grid-overlay" aria-hidden />
      <div className="morph-pin" ref={pinRef}>
        <div className="container morph-shell">
          <div className="morph-top">
            <span>Built once</span>
            <span>Runs everywhere</span>
          </div>

          <div className="morph-count" aria-label="Platform stage">
            {morphStages.map((s, i) => (
              <span className={i === active ? "active" : ""} key={s.no}>
                {s.no}
              </span>
            ))}
          </div>

          <div className="morph-stage" aria-hidden>
            <div className="morph-group stage-mobile">
              <div className="twin twin-ios">
                <PhoneFrame>
                  <MobileScreen />
                </PhoneFrame>
                <span className="twin-os">iOS</span>
              </div>
              <div className="twin twin-android">
                <AndroidFrame>
                  <AndroidScreen />
                </AndroidFrame>
                <span className="twin-os">Android</span>
              </div>
            </div>

            <div className="morph-group stage-web">
              <LaptopFrame>
                <WebScrollScreen />
              </LaptopFrame>
            </div>

            <div className="morph-group stage-desk">
              <div className="desk-monitor">
                <DesktopFrame>
                  <>
                    <DashScreen />
                    <Cursor />
                  </>
                </DesktopFrame>
              </div>
              <div className="desk-input">
                <Keyboard />
                <Mouse />
              </div>
            </div>

            <div className="morph-shadow" />
          </div>

          <div className="morph-caption" aria-live="polite">
            <span className="morph-kicker">{stage.kicker}</span>
            <h2>{stage.headline}</h2>
            <p>{stage.sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
