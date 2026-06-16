// Believable product mock UIs inside the device frames. Volt accent only.
import "./screens.css";

export function MobileScreen() {
  return (
    <div className="scr scr-mobile">
      <div className="scr-status">
        <span>9:41</span>
        <span className="scr-status-r">
          <i className="sig" />
          <i className="bat" />
        </span>
      </div>
      <div className="scr-mhead">
        <div>
          <div className="scr-hello">Good morning</div>
          <div className="scr-name">Karwan</div>
        </div>
        <div className="scr-avatar">K</div>
      </div>
      <div className="scr-feature">
        <span className="scr-feature-tag">Today only</span>
        <div className="scr-feature-title">Flat white</div>
        <div className="scr-feature-row">
          <span className="scr-price">2,500 IQD</span>
          <span className="scr-plus">+</span>
        </div>
      </div>
      <div className="scr-cats">
        <span className="on">Coffee</span>
        <span>Tea</span>
        <span>Bakery</span>
      </div>
      <div className="scr-prod">
        <span className="scr-prod-ic" />
        <span className="scr-prod-lines">
          <b>Cappuccino</b>
          <i>Double shot</i>
        </span>
        <span className="scr-prod-price">3,000</span>
      </div>
      <div className="scr-prod">
        <span className="scr-prod-ic alt" />
        <span className="scr-prod-lines">
          <b>Croissant</b>
          <i>Butter</i>
        </span>
        <span className="scr-prod-price">2,000</span>
      </div>
      <div className="scr-order">Order · 5,000 IQD</div>
    </div>
  );
}

// Android — Material You styling (distinct from the iOS ordering app)
export function AndroidScreen() {
  return (
    <div className="scr scr-android">
      <div className="scr-status scr-status-android">
        <span>9:41</span>
        <span className="scr-status-r">
          <i className="sig" />
          <i className="bat" />
        </span>
      </div>
      <div className="scr-abar">
        <span className="scr-abar-menu">
          <i />
          <i />
          <i />
        </span>
        <span className="scr-abar-title">Deliveries</span>
      </div>
      <div className="scr-track">
        <span className="scr-track-tag">On the way</span>
        <div className="scr-track-eta">12 min</div>
        <div className="scr-track-line">
          <span className="dot done" />
          <span className="bar done" />
          <span className="dot done" />
          <span className="bar" />
          <span className="dot" />
        </div>
      </div>
      <div className="scr-mlist">
        <div className="scr-mrow">
          <span className="scr-mrow-ic" />
          <span className="scr-prod-lines">
            <b>Order #2049</b>
            <i>Out for delivery</i>
          </span>
        </div>
        <div className="scr-mrow">
          <span className="scr-mrow-ic" />
          <span className="scr-prod-lines">
            <b>Order #2048</b>
            <i>Delivered</i>
          </span>
        </div>
      </div>
      <div className="scr-fab">+</div>
      <div className="scr-bottomnav">
        <span className="on">
          <i />
          Home
        </span>
        <span>
          <i />
          Orders
        </span>
        <span>
          <i />
          Map
        </span>
        <span>
          <i />
          You
        </span>
      </div>
    </div>
  );
}

export function WebScreen() {
  return (
    <div className="scr scr-web">
      <div className="scr-nav">
        <span className="scr-logo">Lumen</span>
        <span className="scr-nav-links">
          <i>Product</i>
          <i>Pricing</i>
          <i>Docs</i>
          <b>Get started</b>
        </span>
      </div>
      <div className="scr-web-hero">
        <div className="scr-web-copy">
          <span className="scr-web-eyebrow">New · v2 is live</span>
          <h4>Ship in days, not months.</h4>
          <p>The platform teams trust to launch fast and stay fast.</p>
          <span className="scr-web-cta">Start free →</span>
        </div>
        <div className="scr-web-art">
          <span className="scr-web-orb" />
          <span className="scr-web-bar b1" />
          <span className="scr-web-bar b2" />
          <span className="scr-web-bar b3" />
        </div>
      </div>
      <div className="scr-cards3">
        <div className="scr-c">
          <span className="scr-c-ic" />
          <b>Fast</b>
          <i>Sub-second loads</i>
        </div>
        <div className="scr-c">
          <span className="scr-c-ic" />
          <b>Secure</b>
          <i>Encrypted by default</i>
        </div>
        <div className="scr-c">
          <span className="scr-c-ic" />
          <b>Scalable</b>
          <i>Grows with you</i>
        </div>
      </div>
    </div>
  );
}

export function DashScreen() {
  const bars = [42, 58, 49, 66, 71, 55, 78, 63, 84, 70, 92, 80];
  return (
    <div className="scr scr-dash">
      <aside className="scr-side">
        <div className="scr-side-brand">
          <span className="scr-side-dot" /> Nex OS
        </div>
        <span className="scr-nav-i">Overview</span>
        <span className="scr-nav-i on">Sales</span>
        <span className="scr-nav-i">Inventory</span>
        <span className="scr-nav-i">Staff</span>
        <span className="scr-nav-i">Reports</span>
      </aside>
      <main className="scr-main">
        <div className="scr-main-head">
          <b>Sales</b>
          <span className="scr-range">Last 7 days</span>
        </div>
        <div className="scr-kpis">
          <div className="scr-kpi">
            <i>Revenue</i>
            <b>48,250</b>
            <em className="up">▲ 12%</em>
          </div>
          <div className="scr-kpi">
            <i>Orders</i>
            <b>1,204</b>
            <em className="up">▲ 6%</em>
          </div>
          <div className="scr-kpi">
            <i>Uptime</i>
            <b>99.9%</b>
            <em>30d</em>
          </div>
        </div>
        <div className="scr-chart">
          {bars.map((h, i) => (
            <span key={i} className="bar" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="scr-table">
          <div className="trow">
            <span>#1042 · Coffee House</span>
            <span className="tamt">12,000</span>
          </div>
          <div className="trow">
            <span>#1041 · Bakery Plus</span>
            <span className="tamt">8,500</span>
          </div>
          <div className="trow">
            <span>#1040 · Green Market</span>
            <span className="tamt">21,750</span>
          </div>
        </div>
      </main>
    </div>
  );
}

// Tall, auto-scrollable web page for the laptop stage (two stacked copies loop).
export function WebScrollScreen() {
  return (
    <div className="scr-scroll">
      <WebScreen />
      <WebScreen />
    </div>
  );
}

export function Scene({ kind }: { kind: "mobile" | "web" | "dash" }) {
  if (kind === "mobile") return <MobileScreen />;
  if (kind === "web") return <WebScreen />;
  return <DashScreen />;
}
