import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { morphStages, type DeviceKind, type SceneKind } from "../data/content";
import { DesktopFrame, LaptopFrame, PhoneFrame } from "./Devices";
import { Scene } from "./screens";
import "./morph.css";

function SceneFrame({ device, scene }: { device: DeviceKind; scene: SceneKind }) {
  const screen = <Scene kind={scene} />;
  if (device === "phone") return <PhoneFrame>{screen}</PhoneFrame>;
  if (device === "laptop") return <LaptopFrame>{screen}</LaptopFrame>;
  return <DesktopFrame>{screen}</DesktopFrame>;
}

function scaleForDevice(el: HTMLElement) {
  const mobile = window.innerWidth < 680;
  if (el.classList.contains("phone")) return mobile ? 0.44 : 0.72;
  if (el.classList.contains("laptop")) return mobile ? 0.34 : 0.68;
  return mobile ? 0.3 : 0.58;
}

export function DeviceMorph() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced || !rootRef.current || !pinRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const devs = gsap.utils.toArray<HTMLElement>(".morph-stage .dev");
      if (devs.length < 3) return;

      gsap.set(devs, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        rotateY: 82,
        rotateX: 4,
        z: -120,
        scale: (_, el) => scaleForDevice(el as HTMLElement),
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
        filter: "none",
      });

      gsap.set(devs[0], { opacity: 1, rotateY: 0, rotateX: 0, z: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.to(devs[0], { opacity: 0, rotateY: -84, rotateX: -4, z: -140, duration: 0.28 }, 0.2)
        .fromTo(
          devs[1],
          { opacity: 0, rotateY: 84, rotateX: 4, z: -140 },
          { opacity: 1, rotateY: 0, rotateX: 0, z: 0, duration: 0.34 },
          0.29,
        )
        .to(devs[1], { opacity: 0, rotateY: -84, rotateX: -4, z: -140, duration: 0.28 }, 0.62)
        .fromTo(
          devs[2],
          { opacity: 0, rotateY: 84, rotateX: 4, z: -140 },
          { opacity: 1, rotateY: 0, rotateX: 0, z: 0, duration: 0.34 },
          0.71,
        );

      ScrollTrigger.create({
        trigger: rootRef.current,
        pin: pinRef.current,
        start: "top top",
        end: "+=260%",
        scrub: 0.75,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = self.progress < 0.34 ? 0 : self.progress < 0.68 ? 1 : 2;
          setActive((current) => (current === next ? current : next));
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

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
            <article className="morph-static-row" key={stage.device}>
              <div className="morph-static-visual">
                <SceneFrame device={stage.device} scene={stage.scene} />
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

  const activeStage = morphStages[active];

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
            {morphStages.map((stage, i) => (
              <span className={i === active ? "active" : ""} key={stage.no}>
                {stage.no}
              </span>
            ))}
          </div>

          <div className="morph-stage" aria-hidden>
            {morphStages.map((stage) => (
              <SceneFrame key={stage.device} device={stage.device} scene={stage.scene} />
            ))}
            <div className="morph-shadow" />
          </div>

          <div className="morph-caption" aria-live="polite">
            <span className="morph-kicker">{activeStage.kicker}</span>
            <h2>{activeStage.headline}</h2>
            <p>{activeStage.sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
