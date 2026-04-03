import { useState, useMemo, useEffect, useRef } from "react";

// ─── IMAGE IMPORTS ────────────────────────────────────────────────────────────
import img1 from "./images/Media (1).jpg";
import img2 from "./images/Media (2).jpg";
import img3 from "./images/Media (3).jpg";
import img4 from "./images/Media (4).jpg";
import img5 from "./images/Media (5).jpg";
import img6 from "./images/Media (6).jpg";
import img7 from "./images/Media (7).jpg";
import img8 from "./images/Media (8).jpg";
import img9 from "./images/Media (9).jpg";
import img10 from "./images/Media (10).jpg";
import img11 from "./images/Media (11).jpg";
import img12 from "./images/Media (12).jpg";
import img13 from "./images/Media (13).jpg";
import img14 from "./images/Media (14).jpg";
import img15 from "./images/Media (15).jpg";
import img16 from "./images/Media (16).jpg";
import img17 from "./images/Media (17).jpg";
import logo from "./images/Media (18).jpg";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Floral", "Boho", "Minimal", "Animal", "Pouch & Cover"];
const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low", "Best Sellers"];

const images = [
  { id: 1, src: img1, name: "Purple Flower Phone Pouch", price: 100, best: true, category: "Pouch & Cover", tag: "Hot", color: "#EDE0FF" },
  { id: 2, src: img2, name: "Granny Square Phone Cover", price: 120, best: false, category: "Pouch & Cover", tag: null, color: "#D8EEFF" },
  { id: 3, src: img3, name: "White Daisy Bag Charm", price: 150, best: true, category: "Floral", tag: "Trending", color: "#FFFBF0" },
  { id: 4, src: img4, name: "Pink Sunflower Keychain", price: 90, best: false, category: "Floral", tag: "New", color: "#FFE8F5" },
  { id: 5, src: img5, name: "Boo Ghost Keychain", price: 200, best: true, category: "Animal", tag: "Hot", color: "#F5F0FF" },
  { id: 6, src: img6, name: "Red Double Hearts Car Charm", price: 130, best: false, category: "Boho", tag: null, color: "#FFE0E0" },
  { id: 7, src: img7, name: "Pink Berry Cluster Car Charm", price: 110, best: false, category: "Boho", tag: null, color: "#FFE8F0" },
  { id: 8, src: img8, name: "Red Rose Keychain", price: 170, best: true, category: "Floral", tag: "Trending", color: "#FFE0E5" },
  { id: 9, src: img9, name: "Red Petal Flower Bag Charm", price: 140, best: false, category: "Floral", tag: null, color: "#FFE8E0" },
  { id: 10, src: img10, name: "Triple Hearts Car Charm", price: 160, best: true, category: "Boho", tag: "Popular", color: "#FFE0F0" },
  { id: 11, src: img11, name: "Blue Tassel Mini Sling Bag", price: 180, best: false, category: "Pouch & Cover", tag: null, color: "#D8EEFF" },
  { id: 12, src: img12, name: "Stacked Hearts Keychain Duo", price: 125, best: false, category: "Boho", tag: "New", color: "#F0E0FF" },
  { id: 13, src: img13, name: "Earbuds Crochet Cover", price: 135, best: false, category: "Pouch & Cover", tag: null, color: "#D8E8FF" },
  { id: 14, src: img14, name: "Sunflower & Leaf Keychain", price: 190, best: true, category: "Floral", tag: "Hot", color: "#FFFAE0" },
  { id: 15, src: img15, name: "Lily of the Valley Charm", price: 210, best: false, category: "Floral", tag: null, color: "#E8FFE8" },
  { id: 16, src: img16, name: "Cherry · Candle · Heart Set", price: 220, best: false, category: "Animal", tag: "Limited", color: "#FFE8E0" },
  { id: 17, src: img17, name: "Evil Eye Keychain", price: 250, best: true, category: "Boho", tag: "Premium", color: "#E0EEFF" },
];

// ─── REAL IMAGE COMPONENT ─────────────────────────────────────────────────────
function PlaceholderCard({ src, color, id }) {
  return src
    ? <img src={src} alt={`Keychain ${id}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    : <div style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>🪢</div>;
}

// ─── CART BADGE ───────────────────────────────────────────────────────────────
function CartIcon({ count }) {
  return (
    <div style={{ position: "relative", cursor: "pointer" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && (
        <span style={{
          position: "absolute", top: "-8px", right: "-8px",
          background: "#FF385C", color: "#fff", borderRadius: "50%",
          width: "18px", height: "18px", fontSize: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: "700", animation: "cartPop 0.3s cubic-bezier(.36,.07,.19,.97)"
        }}>{count}</span>
      )}
    </div>
  );
}

// ─── STAR RATING ──────────────────────────────────────────────────────────────
function Stars({ n = 5 }) {
  return <span style={{ color: "#FFAD33", fontSize: "12px", letterSpacing: "1px" }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [priceRange, setPriceRange] = useState("all");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScroll = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Hide header on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHeaderVisible(current < lastScroll.current || current < 80);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (item) => {
    setCart(c => {
      const exists = c.find(x => x.id === item.id);
      if (exists) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
    showToast("Added to cart 🛍️");
  };

  const toggleWishlist = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  };

  const removeFromCart = (id) => setCart(c => c.filter(x => x.id !== id));
  const cartTotal = cart.reduce((s, x) => s + x.price * x.qty, 0);

  const filtered = useMemo(() => {
    let arr = [...images];
    if (searchQuery) arr = arr.filter(i =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(i.price).includes(searchQuery)
    );
    if (category !== "All") arr = arr.filter(i => i.category === category);
    if (priceRange === "low") arr = arr.filter(i => i.price <= 120);
    else if (priceRange === "mid") arr = arr.filter(i => i.price > 120 && i.price <= 180);
    else if (priceRange === "high") arr = arr.filter(i => i.price > 180);
    if (sortBy === "Price: Low to High") arr.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") arr.sort((a, b) => b.price - a.price);
    else if (sortBy === "Best Sellers") arr = [...arr.filter(i => i.best), ...arr.filter(i => !i.best)];
    return arr;
  }, [priceRange, category, sortBy, searchQuery]);

  const bestSellers = images.filter(i => i.best);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #FDF8F3;
          --rose: #FF385C;
          --roseDark: #D4284A;
          --rosePale: #FFE8EC;
          --gold: #C9A84C;
          --goldLight: #F5E6C0;
          --text: #1A1A2E;
          --textMuted: #7A7A9A;
          --white: #FFFFFF;
          --shadow: 0 4px 24px rgba(26,26,46,0.08);
          --shadowHover: 0 12px 40px rgba(26,26,46,0.16);
          --radius: 18px;
          --font-display: 'Playfair Display', serif;
          --font-body: 'DM Sans', sans-serif;
        }

        body { font-family: var(--font-body); background: var(--cream); color: var(--text); }
        img { display: block; }
        button { font-family: var(--font-body); cursor: pointer; border: none; background: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes cartPop {
          0% { transform: scale(0); }
          70% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes heartPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .card-hover {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: var(--shadowHover) !important;
        }
        .card-hover:active { transform: scale(0.97); }

        .pill-btn {
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .img-zoom img {
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .img-zoom:hover img { transform: scale(1.06); }

        .wishlist-btn {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .wishlist-btn.active { animation: heartPop 0.3s ease; }

        /* Desktop grid */
          .logo-text-desktop { display: none; }

          .mobile-search-bar { display: block; }

        @media (min-width: 768px) {
          .logo-text-desktop { display: block !important; }
          .desktop-search { display: flex !important; }
          .mobile-search-bar { display: none !important; }
          .main-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .hero-section { padding: 40px 40px 0 !important; }
          .page-container { max-width: 1200px; margin: 0 auto; padding: 0 32px !important; }
          .best-cards { min-width: 160px !important; }
          .best-img { height: 160px !important; }
          .card-img { height: 200px !important; }
          .desktop-sidebar { display: flex !important; }
          .mobile-filter-btn { display: none !important; }
          .desktop-layout { display: grid !important; grid-template-columns: 260px 1fr; gap: 32px; align-items: start; }

          /* On desktop, modal is a centered dialog instead of fullscreen */
          .product-modal-fullscreen {
            background: rgba(10,8,20,0.85) !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 32px !important;
          }
          .product-modal-inner {
            flex-direction: row !important;
            border-radius: 24px !important;
            overflow: hidden !important;
            max-width: 820px !important;
            width: 100% !important;
            max-height: 90vh !important;
            box-shadow: 0 32px 80px rgba(0,0,0,0.5) !important;
          }
          .product-modal-img {
            width: 55% !important;
            min-height: 480px !important;
            flex-shrink: 0 !important;
          }
          .product-modal-img img {
            height: 100% !important;
            object-fit: cover !important;
          }
          .product-modal-info {
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 36px 32px 32px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }
          .product-modal-handle { display: none !important; }
        }

        @media (min-width: 1100px) {
          .main-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }

        .desktop-sidebar { display: none; }
        .desktop-layout { display: block; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--cream)" }}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(253,248,243,0.92)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          opacity: headerVisible ? 1 : 0,
          animation: "slideDown 0.5s cubic-bezier(0.4,0,0.2,1)"
        }}>
          <div className="page-container" style={{ padding: "0 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0" }}>
              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "46px", height: "46px", borderRadius: "50%",
                  overflow: "hidden", flexShrink: 0,
                  boxShadow: "0 2px 16px rgba(201,168,76,0.3)",
                  border: "2px solid rgba(201,168,76,0.25)"
                }}>
                  <img src={logo} alt="Loop & Love" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                </div>
                {/* Brand name — always visible */}
                <div>
                  <h1 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "600", letterSpacing: "0.2px", lineHeight: 1.2, color: "var(--text)" }}>Loop & Love</h1>
                  {/* <p style={{ fontSize: "9px", color: "var(--gold)", fontWeight: "600", letterSpacing: "1.8px", textTransform: "uppercase", marginTop: "1px" }}>by SG · Handmade 🪢</p> */}
                  <p
                    style={{
                      fontSize: "9px",
                      color: "var(--gold)",
                      fontWeight: "600",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginTop: "1px"
                    }}
                  >
                    by <span style={{ color: "#FF005D", fontWeight: "bold" }}>SG</span> · Handmade 🪢
                  </p>
                </div>
              </div>

              {/* Search Bar (desktop only) */}
              <div className="desktop-search" style={{ display: "none", alignItems: "center", gap: "8px", flex: 1, maxWidth: "340px", margin: "0 24px" }}>
                <div style={{
                  flex: 1, display: "flex", alignItems: "center",
                  background: "#fff", border: "1.5px solid rgba(201,168,76,0.2)",
                  borderRadius: "50px", padding: "8px 16px", gap: "8px",
                  boxShadow: "0 2px 12px rgba(201,168,76,0.08)"
                }}>
                  <span style={{ fontSize: "14px", color: "var(--textMuted)" }}>🔍</span>
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search keychains..."
                    style={{ border: "none", outline: "none", fontSize: "13px", flex: 1, background: "transparent", fontFamily: "var(--font-body)", color: "var(--text)" }}
                  />
                  {searchQuery && <button onClick={() => setSearchQuery("")} style={{ color: "var(--textMuted)", fontSize: "16px" }}>×</button>}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                <button
                  className="mobile-filter-btn"
                  onClick={() => setShowFilter(true)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text)", fontSize: "13px", fontWeight: "500" }}
                >
                  <span>⚙️</span> Filter
                </button>
                <button onClick={() => setShowCart(true)} style={{ color: "var(--text)" }}>
                  <CartIcon count={cart.length} />
                </button>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #FFE8EC, #F5E6C0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", cursor: "pointer" }}>
                  👤
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── MOBILE SEARCH BAR ──────────────────────────────────── */}
        <div className="mobile-search-bar" style={{ padding: "10px 16px 0" }}>
          <div style={{
            display: "flex", alignItems: "center",
            background: "#fff", border: "1.5px solid rgba(201,168,76,0.2)",
            borderRadius: "50px", padding: "9px 16px", gap: "8px",
            boxShadow: "0 2px 12px rgba(201,168,76,0.08)"
          }}>
            <span style={{ fontSize: "14px", color: "var(--textMuted)" }}>🔍</span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search keychains..."
              style={{ border: "none", outline: "none", fontSize: "13px", flex: 1, background: "transparent", fontFamily: "var(--font-body)", color: "var(--text)" }}
            />
            {searchQuery && <button onClick={() => setSearchQuery("")} style={{ color: "var(--textMuted)", fontSize: "16px" }}>×</button>}
          </div>
        </div>

        {/* ── HERO STRIP ─────────────────────────────────────────── */}
        <div className="hero-section" style={{
          padding: "24px 16px 0",
          animation: mounted ? "fadeUp 0.6s ease 0.1s both" : "none"
        }}>
          <div className="page-container" style={{ padding: "0" }}>
            <div style={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)",
              padding: "28px 28px",
              position: "relative", overflow: "hidden",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,56,92,0.12)", filter: "blur(40px)" }} />
              <div style={{ position: "absolute", bottom: "-30px", left: "30%", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(201,168,76,0.12)", filter: "blur(30px)" }} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px", fontWeight: "500" }}>Handcrafted with love</p>
                <h2 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(20px,4vw,28px)", lineHeight: 1.2, maxWidth: "260px" }}>
                  Unique <em style={{ color: "#FFAD33" }}>Keychains</em> for Every Vibe
                </h2>
                <button style={{
                  marginTop: "16px", background: "linear-gradient(135deg, #FF385C, #D4284A)",
                  color: "#fff", padding: "10px 22px", borderRadius: "50px",
                  fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px",
                  boxShadow: "0 4px 20px rgba(255,56,92,0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,56,92,0.5)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,56,92,0.4)"; }}
                  onClick={() => document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Shop Now ↓
                </button>
              </div>
              <div style={{ fontSize: "clamp(40px,8vw,64px)", position: "relative", zIndex: 2, animation: "pulse 3s ease-in-out infinite" }}>🪢</div>
            </div>
          </div>
        </div>

        {/* ── CATEGORY PILLS ─────────────────────────────────────── */}
        <div className="page-container" style={{ padding: "0 16px" }}>
          <div className="scrollbar-hide" style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "20px 0 4px", animation: mounted ? "fadeUp 0.6s ease 0.2s both" : "none" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} className="pill-btn"
                onClick={() => setCategory(cat)}
                style={{
                  background: category === cat ? "linear-gradient(135deg, #1A1A2E, #2D1B4E)" : "#fff",
                  color: category === cat ? "#fff" : "var(--textMuted)",
                  border: category === cat ? "none" : "1.5px solid rgba(26,26,46,0.1)",
                  boxShadow: category === cat ? "0 4px 16px rgba(26,26,46,0.2)" : "none",
                  transform: category === cat ? "scale(1.04)" : "scale(1)",
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)"
                }}
              >{cat}</button>
            ))}
          </div>
        </div>

        {/* ── BEST SELLERS ───────────────────────────────────────── */}
        <div className="page-container" style={{ padding: "0 16px", marginTop: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "600" }}>
              🔥 Best Sellers
            </h2>
            <span style={{ fontSize: "12px", color: "var(--rose)", fontWeight: "600", cursor: "pointer" }}>See all →</span>
          </div>
          <div className="scrollbar-hide" style={{ display: "flex", gap: "14px", overflowX: "auto", paddingBottom: "8px" }}>
            {bestSellers.map((item, i) => (
              <div key={item.id} className="card-hover"
                style={{
                  minWidth: "140px", background: "#fff", borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow)", overflow: "hidden", flexShrink: 0,
                  animation: mounted ? `fadeUp 0.5s ease ${0.1 + i * 0.07}s both` : "none",
                  cursor: "pointer"
                }}
                onClick={() => setSelectedImage(item)}
              >
                <div className="best-img img-zoom" style={{ height: "130px", overflow: "hidden", position: "relative" }}>
                  <PlaceholderCard src={item.src} color={item.color} id={item.id} />
                  {item.tag && (
                    <span style={{
                      position: "absolute", top: "8px", left: "8px",
                      background: item.tag === "Hot" ? "linear-gradient(135deg,#FF385C,#D4284A)" : "linear-gradient(135deg,#C9A84C,#A8872E)",
                      color: "#fff", fontSize: "9px", fontWeight: "700", letterSpacing: "0.5px",
                      padding: "3px 8px", borderRadius: "20px", textTransform: "uppercase"
                    }}>{item.tag}</span>
                  )}
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <p style={{ fontSize: "11px", color: "var(--textMuted)", marginBottom: "2px" }}>{item.category}</p>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "var(--rose)" }}>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ───────────────────────────────────────── */}
        <div className="page-container" style={{ padding: "0 16px", marginTop: "28px", paddingBottom: "80px" }} id="catalogue">
          <div className="desktop-layout">

            {/* ── DESKTOP SIDEBAR FILTER ─── */}
            <aside className="desktop-sidebar" style={{
              flexDirection: "column", gap: "8px",
              background: "#fff", borderRadius: "20px",
              padding: "24px", boxShadow: "var(--shadow)",
              position: "sticky", top: "90px",
              animation: mounted ? "fadeUp 0.6s ease 0.3s both" : "none"
            }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", marginBottom: "16px", fontWeight: "600" }}>Filters</h3>

              <p style={{ fontSize: "12px", fontWeight: "700", color: "var(--textMuted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Price Range</p>
              {[["all", "All Prices"], ["low", "Under ₹120"], ["mid", "₹120 – ₹180"], ["high", "Above ₹180"]].map(([v, l]) => (
                <button key={v} onClick={() => setPriceRange(v)} style={{
                  textAlign: "left", padding: "10px 14px", borderRadius: "12px",
                  fontSize: "13px", fontWeight: "500",
                  background: priceRange === v ? "linear-gradient(135deg,#FFE8EC,#FFF3DC)" : "transparent",
                  color: priceRange === v ? "var(--rose)" : "var(--text)",
                  border: priceRange === v ? "1.5px solid rgba(255,56,92,0.2)" : "1.5px solid transparent",
                  transition: "all 0.2s ease"
                }}>{l}</button>
              ))}

              <div style={{ height: "1px", background: "rgba(26,26,46,0.06)", margin: "16px 0" }} />

              <p style={{ fontSize: "12px", fontWeight: "700", color: "var(--textMuted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Sort By</p>
              {SORT_OPTIONS.map(s => (
                <button key={s} onClick={() => setSortBy(s)} style={{
                  textAlign: "left", padding: "10px 14px", borderRadius: "12px",
                  fontSize: "13px", fontWeight: "500",
                  background: sortBy === s ? "linear-gradient(135deg,#E8E8FF,#F0E8FF)" : "transparent",
                  color: sortBy === s ? "#5B4FCF" : "var(--text)",
                  border: sortBy === s ? "1.5px solid rgba(91,79,207,0.2)" : "1.5px solid transparent",
                  transition: "all 0.2s ease"
                }}>{s}</button>
              ))}

              <div style={{ height: "1px", background: "rgba(26,26,46,0.06)", margin: "16px 0" }} />
              <button onClick={() => { setPriceRange("all"); setSortBy("Default"); setCategory("All"); }} style={{
                padding: "11px", borderRadius: "12px", fontSize: "12px", fontWeight: "600",
                color: "var(--textMuted)", border: "1.5px dashed rgba(26,26,46,0.15)",
                transition: "all 0.2s ease"
              }}>↺ Reset All Filters</button>
            </aside>

            {/* ── GRID ─── */}
            <div>
              {/* Sort bar (mobile) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "10px" }}>
                <p style={{ fontSize: "13px", color: "var(--textMuted)" }}>
                  <strong style={{ color: "var(--text)" }}>{filtered.length}</strong> items found
                </p>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                    style={{
                      padding: "7px 12px", borderRadius: "10px", fontSize: "12px",
                      border: "1.5px solid rgba(26,26,46,0.12)", background: "#fff",
                      fontFamily: "var(--font-body)", color: "var(--text)", cursor: "pointer", outline: "none"
                    }}>
                    {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <button className="mobile-filter-btn pill-btn"
                    onClick={() => setShowFilter(true)}
                    style={{ background: "var(--text)", color: "#fff", padding: "7px 14px" }}
                  >⚙️ Filter</button>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--textMuted)" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>No keychains found</p>
                  <p style={{ fontSize: "13px", marginTop: "6px" }}>Try adjusting your filters</p>
                </div>
              ) : (
                <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "14px" }}>
                  {filtered.map((img, i) => (
                    <div key={img.id} className="card-hover"
                      style={{
                        background: "#fff", borderRadius: "var(--radius)",
                        boxShadow: "var(--shadow)", overflow: "hidden",
                        animation: mounted ? `fadeUp 0.5s ease ${0.05 + (i % 8) * 0.05}s both` : "none"
                      }}
                    >
                      <div className="card-img img-zoom" style={{ height: "160px", overflow: "hidden", position: "relative", cursor: "pointer" }}
                        onClick={() => setSelectedImage(img)}>
                        <PlaceholderCard src={img.src} color={img.color} id={img.id} />
                        {img.tag && (
                          <span style={{
                            position: "absolute", top: "10px", left: "10px",
                            background: img.tag === "Hot" ? "linear-gradient(135deg,#FF385C,#D4284A)"
                              : img.tag === "New" ? "linear-gradient(135deg,#2ECC71,#27AE60)"
                                : img.tag === "Premium" ? "linear-gradient(135deg,#C9A84C,#A8872E)"
                                  : "linear-gradient(135deg,#5B4FCF,#4A3FB5)",
                            color: "#fff", fontSize: "9px", fontWeight: "700",
                            padding: "3px 8px", borderRadius: "20px", letterSpacing: "0.5px",
                            textTransform: "uppercase"
                          }}>{img.tag}</span>
                        )}
                        <button
                          className={`wishlist-btn ${wishlist.includes(img.id) ? "active" : ""}`}
                          onClick={e => { e.stopPropagation(); toggleWishlist(img.id); }}
                          style={{
                            position: "absolute", top: "8px", right: "8px",
                            width: "32px", height: "32px", borderRadius: "50%",
                            background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                          }}
                        >{wishlist.includes(img.id) ? "❤️" : "🤍"}</button>
                      </div>
                      <div style={{ padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                          <div>
                            <p style={{ fontSize: "11px", color: "var(--textMuted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>{img.category}</p>
                            <p style={{ fontSize: "13px", fontWeight: "600", marginTop: "2px" }}>{img.name}</p>
                          </div>
                          <p style={{ fontSize: "16px", fontWeight: "700", color: "var(--rose)" }}>₹{img.price}</p>
                        </div>
                        <Stars n={img.best ? 5 : 4} />
                        <button
                          onClick={() => addToCart(img)}
                          style={{
                            marginTop: "10px", width: "100%", padding: "9px",
                            borderRadius: "10px", fontSize: "12px", fontWeight: "600",
                            background: "linear-gradient(135deg, #1A1A2E, #2D1B4E)",
                            color: "#fff", letterSpacing: "0.3px",
                            transition: "all 0.2s ease",
                            boxShadow: "0 3px 12px rgba(26,26,46,0.2)"
                          }}
                          onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(26,26,46,0.3)"; }}
                          onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 3px 12px rgba(26,26,46,0.2)"; }}
                        >🛍️ Add to Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── IMAGE MODAL ────────────────────────────────────────── */}
        {selectedImage && (
          <div className="product-modal-fullscreen" style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", flexDirection: "column",
            background: "#000",
            animation: "fadeIn 0.22s ease"
          }}>
            <div className="product-modal-inner" style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>

              {/* Full-bleed image — fills entire screen on mobile */}
              <div className="product-modal-img" style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.name}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",          /* never crops, always fits */
                    objectPosition: "center",
                    display: "block",
                    background: "#111",
                    animation: "fadeUp 0.3s cubic-bezier(0.34,1.56,0.64,1)"
                  }}
                />

                {/* Top bar: close + wishlist */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "env(safe-area-inset-top, 16px) 16px 12px",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)"
                }}>
                  <button onClick={() => setSelectedImage(null)}
                    style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "20px", color: "#fff", fontWeight: "300"
                    }}>‹</button>

                  <button onClick={() => toggleWishlist(selectedImage.id)}
                    style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "18px"
                    }}>{wishlist.includes(selectedImage.id) ? "❤️" : "🤍"}</button>
                </div>

                {/* Tag badge */}
                {selectedImage.tag && (
                  <span style={{
                    position: "absolute", bottom: "16px", left: "16px",
                    background: selectedImage.tag === "Hot" ? "linear-gradient(135deg,#FF385C,#D4284A)"
                      : selectedImage.tag === "New" ? "linear-gradient(135deg,#2ECC71,#27AE60)"
                        : selectedImage.tag === "Premium" ? "linear-gradient(135deg,#C9A84C,#A8872E)"
                          : "linear-gradient(135deg,#5B4FCF,#4A3FB5)",
                    color: "#fff", fontSize: "11px", fontWeight: "700",
                    padding: "5px 12px", borderRadius: "20px", letterSpacing: "0.8px",
                    textTransform: "uppercase"
                  }}>{selectedImage.tag}</span>
                )}
              </div>

              {/* Bottom sheet info panel — slides up */}
              <div className="product-modal-info" style={{
                background: "#fff",
                borderRadius: "22px 22px 0 0",
                padding: "20px 20px calc(env(safe-area-inset-bottom, 0px) + 20px)",
                boxShadow: "0 -4px 30px rgba(0,0,0,0.15)",
                animation: "slideUp 0.35s cubic-bezier(0.34,1.2,0.64,1)"
              }}>
                {/* Drag handle */}
                <div className="product-modal-handle" style={{ width: "40px", height: "4px", borderRadius: "2px", background: "rgba(0,0,0,0.12)", margin: "0 auto 16px" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div style={{ flex: 1, paddingRight: "12px" }}>
                    <p style={{ fontSize: "11px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>{selectedImage.category}</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "19px", fontWeight: "600", marginTop: "3px", lineHeight: 1.25 }}>{selectedImage.name}</h3>
                    <div style={{ marginTop: "4px" }}><Stars n={selectedImage.best ? 5 : 4} /></div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: "26px", fontWeight: "800", color: "var(--rose)", lineHeight: 1 }}>₹{selectedImage.price}</p>
                    <p style={{ fontSize: "11px", color: "var(--textMuted)", marginTop: "3px" }}>Free gift wrap</p>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "var(--textMuted)", lineHeight: "1.6", marginBottom: "16px" }}>
                  Lovingly handcrafted with premium yarn. Each piece is one-of-a-kind — made with care, one loop at a time. 🪢
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => { addToCart(selectedImage); setSelectedImage(null); }}
                    style={{
                      flex: 1, padding: "14px", borderRadius: "14px", fontWeight: "700",
                      background: "linear-gradient(135deg, #FF385C, #D4284A)", color: "#fff",
                      fontSize: "15px", boxShadow: "0 4px 20px rgba(255,56,92,0.4)",
                      letterSpacing: "0.3px"
                    }}>Add to Cart 🛍️</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FILTER BOTTOM SHEET ────────────────────────────────── */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, width: "100%",
          background: "#fff", borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
          padding: "0 20px 40px", zIndex: 150,
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          transform: showFilter ? "translateY(0)" : "translateY(110%)"
        }}>
          {/* Handle */}
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
            <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "rgba(26,26,46,0.12)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 20px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "600" }}>Filter & Sort</h3>
            <button onClick={() => setShowFilter(false)} style={{
              width: "34px", height: "34px", borderRadius: "50%", background: "#f5f5f5",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px"
            }}>×</button>
          </div>

          <p style={{ fontSize: "11px", fontWeight: "700", color: "var(--textMuted)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Price Range</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
            {[["all", "All Prices", "💰"], ["low", "Under ₹120", "🟢"], ["mid", "₹120–₹180", "🟡"], ["high", "Above ₹180", "🔴"]].map(([v, l, icon]) => (
              <button key={v} onClick={() => setPriceRange(v)} style={{
                padding: "12px", borderRadius: "14px", fontSize: "13px", fontWeight: "500",
                background: priceRange === v ? "linear-gradient(135deg,#FFE8EC,#FFF3DC)" : "#f9f9f9",
                color: priceRange === v ? "var(--rose)" : "var(--text)",
                border: priceRange === v ? "1.5px solid rgba(255,56,92,0.25)" : "1.5px solid transparent",
                transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "6px"
              }}>{icon} {l}</button>
            ))}
          </div>

          <p style={{ fontSize: "11px", fontWeight: "700", color: "var(--textMuted)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Sort By</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
            {SORT_OPTIONS.map(s => (
              <button key={s} onClick={() => setSortBy(s)} style={{
                textAlign: "left", padding: "11px 14px", borderRadius: "12px",
                fontSize: "13px", fontWeight: "500",
                background: sortBy === s ? "linear-gradient(135deg,#E8E8FF,#F0E8FF)" : "#f9f9f9",
                color: sortBy === s ? "#5B4FCF" : "var(--text)",
                border: sortBy === s ? "1.5px solid rgba(91,79,207,0.2)" : "1.5px solid transparent",
                transition: "all 0.2s ease"
              }}>{s}</button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => { setPriceRange("all"); setSortBy("Default"); }}
              style={{ flex: 1, padding: "13px", borderRadius: "14px", fontSize: "13px", fontWeight: "600", background: "#f5f5f5", color: "var(--textMuted)" }}>Reset</button>
            <button onClick={() => setShowFilter(false)}
              style={{ flex: 2, padding: "13px", borderRadius: "14px", fontSize: "13px", fontWeight: "700", background: "linear-gradient(135deg,#1A1A2E,#2D1B4E)", color: "#fff", boxShadow: "0 4px 16px rgba(26,26,46,0.25)" }}>Apply Filters</button>
          </div>
        </div>

        {/* ── CART DRAWER ────────────────────────────────────────── */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 180,
          opacity: showCart ? 1 : 0, pointerEvents: showCart ? "all" : "none",
          transition: "opacity 0.3s ease"
        }}>
          <div onClick={() => setShowCart(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,8,20,0.5)", backdropFilter: "blur(4px)" }} />
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "min(360px, 90vw)", background: "#fff",
            boxShadow: "-8px 0 40px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column",
            transform: showCart ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)"
          }}>
            <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(26,26,46,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "600" }}>My Cart 🛍️</h3>
              <button onClick={() => setShowCart(false)} style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "var(--textMuted)" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>🛒</div>
                  <p style={{ fontWeight: "500" }}>Your cart is empty</p>
                  <p style={{ fontSize: "13px", marginTop: "6px" }}>Start adding your favourite keychains!</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", borderBottom: "1px solid rgba(26,26,46,0.05)", animation: "fadeUp 0.3s ease" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                    <PlaceholderCard src={item.src} color={item.color} id={item.id} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: "600" }}>{item.name}</p>
                    <p style={{ fontSize: "12px", color: "var(--rose)", fontWeight: "700" }}>₹{item.price} × {item.qty}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                    <p style={{ fontSize: "14px", fontWeight: "700" }}>₹{item.price * item.qty}</p>
                    <button onClick={() => removeFromCart(item.id)} style={{ fontSize: "11px", color: "var(--textMuted)", textDecoration: "underline" }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: "16px 20px 32px", borderTop: "1px solid rgba(26,26,46,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontWeight: "600" }}>Total</span>
                  <span style={{ fontSize: "20px", fontWeight: "800", color: "var(--rose)" }}>₹{cartTotal}</span>
                </div>
                <button style={{
                  width: "100%", padding: "14px", borderRadius: "14px", fontWeight: "700",
                  background: "linear-gradient(135deg,#FF385C,#D4284A)", color: "#fff",
                  fontSize: "15px", boxShadow: "0 4px 20px rgba(255,56,92,0.35)",
                  transition: "all 0.2s ease"
                }}
                  onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={e => e.currentTarget.style.transform = ""}
                  onClick={() => { showToast("Order placed! 🎉"); setCart([]); setShowCart(false); }}>
                  Checkout →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── TOAST ──────────────────────────────────────────────── */}
        {toast && (
          <div style={{
            position: "fixed", bottom: "28px", left: "50%",
            transform: "translateX(-50%)",
            background: "#1A1A2E", color: "#fff",
            padding: "12px 24px", borderRadius: "100px",
            fontSize: "13px", fontWeight: "600",
            boxShadow: "0 8px 32px rgba(26,26,46,0.3)",
            zIndex: 300, whiteSpace: "nowrap",
            animation: "toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)"
          }}>{toast}</div>
        )}

        {/* Overlay for filter sheet */}
        {showFilter && (
          <div onClick={() => setShowFilter(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 149, animation: "fadeIn 0.2s ease" }} />
        )}
      </div>
    </>
  );
}