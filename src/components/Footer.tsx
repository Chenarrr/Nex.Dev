import { NexMark } from "./NexMark";
import "./sections.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-bottom">
        <a className="footer-brand" href="#top">
          <NexMark size={24} />
          <span>Nex</span>
        </a>
        <span className="mono">Ship faster. Build cleaner.</span>
        <span className="mono">© 2026 · nex.dev</span>
      </div>
    </footer>
  );
}
