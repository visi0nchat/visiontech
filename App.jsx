import { useMemo, useState } from "react";
import {
  Search, ShoppingCart, UserRound, Menu, X, Smartphone, Laptop,
  Headphones, Tv, Gamepad2, ShieldCheck, Truck, Store, ChevronRight,
  Heart, Plus, Minus, Trash2, ArrowRight, BadgeCheck
} from "lucide-react";

const products = [
  { id: 1, name: "Samsung Galaxy A15", category: "Phones", price: 3200, condition: "New", store: "Salone Mobile Hub", tag: "Popular", color: "phone" },
  { id: 2, name: "iPhone 13", category: "Phones", price: 8900, condition: "Used — excellent", store: "Freetown Gadget Store", tag: "Featured", color: "iphone" },
  { id: 3, name: "HP ProBook 440", category: "Computers", price: 7600, condition: "Refurbished", store: "TechPoint SL", tag: "Good value", color: "laptop" },
  { id: 4, name: "Oraimo FreePods", category: "Accessories", price: 650, condition: "New", store: "Salone Mobile Hub", tag: "", color: "audio" },
  { id: 5, name: "Samsung 43-inch Smart TV", category: "Televisions", price: 6800, condition: "New", store: "Freetown Electronics", tag: "", color: "tv" },
  { id: 6, name: "PlayStation 5", category: "Gaming", price: 12500, condition: "New", store: "Game Zone Freetown", tag: "Popular", color: "gaming" },
  { id: 7, name: "Oraimo Power Bank 20000mAh", category: "Accessories", price: 850, condition: "New", store: "TechPoint SL", tag: "", color: "power" },
  { id: 8, name: "Dell Latitude 5420", category: "Computers", price: 8200, condition: "Used — excellent", store: "Freetown Gadget Store", tag: "", color: "laptop" }
];

const categories = [
  { name: "All products", icon: Store },
  { name: "Phones", icon: Smartphone },
  { name: "Computers", icon: Laptop },
  { name: "Accessories", icon: Headphones },
  { name: "Televisions", icon: Tv },
  { name: "Gaming", icon: Gamepad2 }
];

const money = (value) => `Le ${value.toLocaleString("en-US")}`;

function ProductArt({ type }) {
  const icons = { phone: Smartphone, iphone: Smartphone, laptop: Laptop, audio: Headphones, tv: Tv, gaming: Gamepad2, power: Smartphone };
  const Icon = icons[type] || Smartphone;
  return <div className={`product-art ${type}`}><Icon size={62} strokeWidth={1.25} /></div>;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currency, setCurrency] = useState("SLE");
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => products.filter((p) => {
    const matchesCategory = category === "All products" || p.category === category;
    const matchesQuery = `${p.name} ${p.store} ${p.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  const cartItems = products.filter((p) => cart[p.id]).map((p) => ({ ...p, quantity: cart[p.id] }));
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((old) => ({ ...old, [product.id]: (old[product.id] || 0) + 1 }));
    setNotice(`${product.name} added to your cart`);
    setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(id, amount) {
    setCart((old) => {
      const next = { ...old, [id]: (old[id] || 0) + amount };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }

  function showComingSoon(feature) {
    setNotice(`${feature} will be available in the next development stage.`);
    setTimeout(() => setNotice(""), 2600);
  }

  return (
    <div className="site-shell">
      <div className="top-strip">Shop confidently. Discover trusted electronics dealers across Freetown.</div>
      <header className="header">
        <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setCategory("All products"); setQuery(""); }}>
          <span className="brand-mark">V</span>
          <span><strong>VISION</strong><small>TECH</small></span>
        </a>
        <div className="search-wrap">
          <Search size={19} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search phones, laptops, accessories..." aria-label="Search products" />
          <button onClick={() => setCategory("All products")}>Search</button>
        </div>
        <div className="header-actions">
          <select aria-label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="SLE">SLE</option><option value="USD">USD</option>
          </select>
          <button className="action-link" onClick={() => showComingSoon("Account")}><UserRound size={19} /><span>Account</span></button>
          <button className="action-link cart-action" onClick={() => setCartOpen(true)}><ShoppingCart size={20} /><span>Cart</span><b>{cartCount}</b></button>
        </div>
      </header>

      {mobileMenu && <nav className="mobile-menu">{categories.map((c) => <button key={c.name} onClick={() => { setCategory(c.name); setMobileMenu(false); }}>{c.name}</button>)}</nav>}

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">YOUR LOCAL ELECTRONICS MARKETPLACE</span>
            <h1>Find the tech you need.<br /><em>Shop with confidence.</em></h1>
            <p>Discover phones, computers and electronics from dealers in Freetown — all in one place.</p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => document.getElementById("shop").scrollIntoView({ behavior: "smooth" })}>Explore products <ArrowRight size={17} /></button>
              <button className="secondary-button" onClick={() => showComingSoon("Dealer registration")}>Become a dealer</button>
            </div>
            <div className="hero-trust"><span><ShieldCheck size={17} /> Verified dealers</span><span><Truck size={17} /> Local delivery</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-circle"></div>
            <div className="hero-device phone-device"><div className="device-screen"><span>V</span><small>VISION TECH</small></div></div>
            <div className="hero-device laptop-device"><div className="laptop-screen"></div><div className="laptop-base"></div></div>
            <div className="floating-note"><BadgeCheck size={18} /><span><b>Shop smarter</b><small>Local dealers. More choice.</small></span></div>
          </div>
        </section>

        <section className="benefits">
          <div><ShieldCheck /><span><b>Verified dealers</b><small>Dealer checks before selling</small></span></div>
          <div><Truck /><span><b>Freetown delivery</b><small>Delivery fee based on location</small></span></div>
          <div><Heart /><span><b>Customer rewards</b><small>Earn points on eligible purchases</small></span></div>
          <div><Store /><span><b>Local marketplace</b><small>Shop from multiple stores</small></span></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div><span className="eyebrow">THE MARKETPLACE</span><h2>Shop by category</h2></div>
            <button className="text-button" onClick={() => setCategory("All products")}>View all products <ChevronRight size={17} /></button>
          </div>
          <div className="category-row">
            {categories.map(({ name, icon: Icon }) => <button key={name} className={`category-card ${category === name ? "selected" : ""}`} onClick={() => setCategory(name)}><span><Icon size={25} /></span><b>{name}</b></button>)}
          </div>

          <div className="section-heading product-heading">
            <div><span className="eyebrow">CURATED FOR YOU</span><h2>{category === "All products" ? "Featured products" : category}</h2></div>
            <span className="result-count">{visibleProducts.length} products</span>
          </div>
          {visibleProducts.length ? <div className="product-grid">
            {visibleProducts.map((product) => <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <button className="wish-button" aria-label="Add to wishlist" onClick={() => showComingSoon("Wishlist")}><Heart size={17} /></button>
                <ProductArt type={product.color} />
              </div>
              <div className="product-info">
                <small className="product-condition">{product.condition}</small>
                <h3>{product.name}</h3>
                <p className="store-name"><BadgeCheck size={14} /> {product.store}</p>
                <div className="product-bottom"><strong>{currency === "SLE" ? money(product.price) : `$${(product.price / 23).toFixed(2)}`}</strong><button aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product)}><Plus size={18} /></button></div>
              </div>
            </article>)}
          </div> : <div className="empty-state">No products match your search. Try another keyword or category.</div>}
        </section>

        <section className="dealer-banner">
          <div><span className="eyebrow">GROW YOUR BUSINESS</span><h2>Are you an electronics dealer?</h2><p>Open your store on Vision Tech and reach more customers across Freetown.</p></div>
          <button className="light-button" onClick={() => showComingSoon("Dealer registration")}>Register your store <ArrowRight size={17} /></button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main"><div className="footer-brand"><a className="brand light-brand" href="#"><span className="brand-mark">V</span><span><strong>VISION</strong><small>TECH</small></span></a><p>Phones and electronics from local dealers, brought together in one marketplace.</p></div>
          <div><b>Marketplace</b><button onClick={() => setCategory("Phones")}>Phones</button><button onClick={() => setCategory("Computers")}>Computers</button><button onClick={() => setCategory("Accessories")}>Accessories</button></div>
          <div><b>Join Vision Tech</b><button onClick={() => showComingSoon("Dealer registration")}>Become a dealer</button><button onClick={() => showComingSoon("Affiliate programme")}>Become an affiliate</button><button onClick={() => showComingSoon("Help centre")}>Help centre</button></div>
          <div><b>Customer care</b><button onClick={() => showComingSoon("Contact page")}>Contact us</button><button onClick={() => showComingSoon("Returns policy")}>Returns & refunds</button><button onClick={() => showComingSoon("Privacy policy")}>Privacy policy</button></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Vision Tech. All rights reserved.</span><span>Built for Sierra Leone 🇸🇱</span></div>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
        <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-heading"><h2>Your cart ({cartCount})</h2><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>
          {cartItems.length ? <>
            <div className="cart-list">{cartItems.map((item) => <div className="cart-item" key={item.id}><ProductArt type={item.color} /><div className="cart-item-info"><b>{item.name}</b><small>{money(item.price)}</small><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)}><Plus size={14} /></button></div></div><button className="remove-button" onClick={() => setCart((old) => { const next = { ...old }; delete next[item.id]; return next; })}><Trash2 size={17} /></button></div>)}</div>
            <div className="cart-total"><span>Product subtotal</span><b>{money(subtotal)}</b></div>
            <p className="cart-note">Delivery fee is calculated by location at checkout.</p>
            <button className="primary-button checkout-button" onClick={() => showComingSoon("Checkout")}>Continue to checkout <ArrowRight size={17} /></button>
          </> : <div className="empty-cart"><ShoppingCart size={40} /><p>Your cart is empty.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div>}
        </aside>
      </div>}
    </div>
  );
}
