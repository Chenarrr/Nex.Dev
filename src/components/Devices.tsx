import type { ReactNode } from "react";
import "./devices.css";

/* ---------- iPhone ---------- */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev phone phone-ios">
      <div className="phone-island" />
      <div className="dev-screen">{children}</div>
      <div className="phone-home" />
    </div>
  );
}

/* ---------- Android ---------- */
export function AndroidFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev phone phone-android">
      <div className="android-cam" />
      <div className="dev-screen">{children}</div>
      <div className="android-nav">
        <span />
        <span className="dot" />
        <span />
      </div>
    </div>
  );
}

/* ---------- Laptop ---------- */
export function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev laptop">
      <div className="laptop-lid">
        <div className="laptop-cam" />
        <div className="dev-screen">{children}</div>
      </div>
      <div className="laptop-base">
        <div className="laptop-notch" />
      </div>
    </div>
  );
}

/* ---------- Desktop monitor ---------- */
export function DesktopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev desktop">
      <div className="desktop-monitor">
        <div className="dev-screen">{children}</div>
      </div>
      <div className="desktop-neck" />
      <div className="desktop-foot" />
    </div>
  );
}

/* ---------- Peripherals (desktop scene) ---------- */
const KEYS = [10, 10, 9, 7];

export function Keyboard() {
  return (
    <div className="keyboard" aria-hidden>
      {KEYS.map((count, row) => (
        <div className="kb-row" key={row}>
          {row === 3 ? (
            <>
              <span className="key" />
              <span className="key" />
              <span className="key space" />
              <span className="key" />
              <span className="key" />
            </>
          ) : (
            Array.from({ length: count }).map((_, k) => (
              <span className="key" key={k} />
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export function Mouse() {
  return (
    <div className="mouse" aria-hidden>
      <span className="mouse-wheel" />
    </div>
  );
}

export function Cursor() {
  return (
    <svg className="cursor" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M5 3l14 7-6 1.6L9.6 18 5 3z"
        fill="#fff"
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
