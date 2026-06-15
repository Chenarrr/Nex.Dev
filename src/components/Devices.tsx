import type { ReactNode } from "react";
import "./devices.css";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev phone">
      <div className="phone-notch" />
      <div className="dev-screen">{children}</div>
    </div>
  );
}

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
