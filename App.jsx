import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --black: #080608;
    --white: #faf8f4;
    --gold: #c9a96e;
    --mid: rgba(250,248,244,0.5);
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Jost', sans-serif; background: var(--black); color: var(--white); overflow-x: hidden; }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.6rem 3rem;
    background: linear-gradient(to bottom, rgba(8,6,8,0.9) 0%, transparent 100%);
  }
  .logo {
    font-family: 'Cormorant Garamond', serif; font-size: 1.6rem;
    color: var(--white); cursor: pointer; letter-spacing: 0.04em; font-style: italic;
  }
  .logo small {
    display: block; font-style: normal; font-family: 'Jost', sans-serif;
    font-size: 0.58rem; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--gold); font-weight: 200; margin-top: -2px;
  }
  .nav-links { display: flex; gap: 0.2rem; align-items: center; }
  .nb {
    background: none; border: none; cursor: pointer; color: rgba(250,248,244,0.5);
    font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 300;
    letter-spacing: 0.2em; text-transform: uppercase; padding: 0.6rem 1rem;
    transition: color 0.25s;
  }
  .nb:hover, .nb.on { color: var(--white); }
  .nb.cta {
    border: 1px solid rgba(201,169,110,0.5); color: var(--gold);
    padding: 0.6rem 1.5rem; margin-left: 0.5rem; transition: background 0.25s, color 0.25s;
  }
  .nb.cta:hover { background: var(--gold); color: var(--black); }

  .pg { animation: pgIn 0.5s ease both; }
  @keyframes pgIn { from { opacity:0 } to { opacity:1 } }

  /* BIG HERO */
  .hero {
    height: 100vh; position: relative; display: flex;
    flex-direction: column; align-items: center; justify-content: center;
    text-align: center; overflow: hidden;
  }
  .hero-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.38);
  }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(8,6,8,0.25) 0%, rgba(8,6,8,0.0) 35%, rgba(8,6,8,0.65) 100%);
  }
  .hero-body { position: relative; z-index: 2; padding: 0 1rem; max-width: 1000px; }
  .hero-label {
    font-size: 0.68rem; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--gold); font-weight: 300; margin-bottom: 2.2rem; display: block;
  }
  .hero-h1 {
    font-family: 'Cormorant Garamond', serif; font-weight: 300;
    font-size: clamp(4rem, 10vw, 9rem); line-height: 0.95;
    color: var(--white); letter-spacing: -0.01em; margin-bottom: 2rem;
  }
  .hero-h1 em { font-style: italic; color: #e8d5b0; display: block; }
  .hero-sub {
    font-size: clamp(0.85rem, 1.4vw, 1rem); font-weight: 200;
    color: rgba(250,248,244,0.6); max-width: 500px; margin: 0 auto 3rem;
    line-height: 1.95; letter-spacing: 0.03em;
  }
  .hero-btns { display: flex; gap: 1.2rem; justify-content: center; }
  .btn-a {
    background: var(--gold); color: var(--black); border: none; cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 400;
    letter-spacing: 0.25em; text-transform: uppercase; padding: 1.1rem 3rem;
    transition: opacity 0.25s, transform 0.2s;
  }
  .btn-a:hover { opacity: 0.88; transform: translateY(-2px); }
  .btn-b {
    background: none; color: rgba(250,248,244,0.65); border: 1px solid rgba(250,248,244,0.3);
    cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 300;
    letter-spacing: 0.25em; text-transform: uppercase; padding: 1.1rem 2.5rem;
    transition: color 0.25s, border-color 0.25s;
  }
  .btn-b:hover { color: var(--white); border-color: rgba(250,248,244,0.7); }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    z-index: 2; color: rgba(250,248,244,0.3); font-size: 0.6rem;
    letter-spacing: 0.35em; text-transform: uppercase;
    display: flex; flex-direction: column; align-items: center; gap: 0.8rem;
  }
  .scroll-bar { width: 1px; height: 48px; background: linear-gradient(to bottom, var(--gold), transparent); }

  /* MARQUEE */
  .marquee { background: var(--gold); padding: 1rem 0; overflow: hidden; white-space: nowrap; }
  .marquee-inner { display: inline-flex; gap: 3rem; animation: scrollM 22s linear infinite; }
  @keyframes scrollM { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .mtag { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1rem; color: var(--black); flex-shrink: 0; }

  /* SPLIT */
  .split { display: grid; grid-template-columns: 1fr 1fr; }
  .split-img { position: relative; min-height: 600px; overflow: hidden; }
  .split-img img { width:100%; height:100%; object-fit:cover; display:block; }
  .split-content { padding: 6rem 5rem; display: flex; flex-direction: column; justify-content: center; }
  .eyebrow { font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); font-weight: 300; margin-bottom: 1.5rem; }
  .big-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; line-height: 1.1; margin-bottom: 1.8rem; }
  .big-title em { font-style: italic; color: var(--gold); }
  .body-txt { color: rgba(250,248,244,0.5); line-height: 1.9; font-weight: 200; font-size: 0.92rem; margin-bottom: 1.2rem; }

  /* STATS */
  .stats { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid rgba(250,248,244,0.08); }
  .stat { padding: 3rem 2rem; text-align: center; border-right: 1px solid rgba(250,248,244,0.08); }
  .stat:last-child { border-right: none; }
  .stat-n { font-family: 'Cormorant Garamond', serif; font-size: 3.2rem; font-weight: 300; color: var(--gold); line-height: 1; }
  .stat-l { font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(250,248,244,0.3); margin-top: 0.5rem; font-weight: 300; }

  /* WORK GRID */
  .work-header { padding: 5rem 3rem 3rem; text-align: center; }
  .work-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    grid-template-rows: 420px 320px;
    gap: 4px; padding: 0 4px 4px;
  }
  .wg { position: relative; overflow: hidden; cursor: pointer; }
  .wg img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.5s ease; }
  .wg:hover img { transform: scale(1.04); }
  .wg-overlay { position: absolute; inset:0; background: linear-gradient(to top, rgba(8,6,8,0.8) 0%, transparent 55%); opacity:0; transition: opacity 0.35s; }
  .wg:hover .wg-overlay { opacity:1; }
  .wg-info { position: absolute; bottom:0; left:0; right:0; padding:1.8rem; transform:translateY(6px); opacity:0; transition: all 0.35s; }
  .wg:hover .wg-info { transform:translateY(0); opacity:1; }
  .wg-cat { font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.3rem; }
  .wg-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 300; }
  .wg:first-child { grid-row: span 2; }

  /* SERVICES */
  .services-sec { padding: 6rem 3rem; }
  .svc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; background: rgba(250,248,244,0.05); }
  .svc { background: var(--black); padding: 3.5rem 2.8rem; border: 1px solid rgba(250,248,244,0.04); transition: background 0.3s; position: relative; }
  .svc:hover { background: #100d10; }
  .svc-line { width: 36px; height: 1px; background: var(--gold); margin-bottom: 2rem; transition: width 0.3s; }
  .svc:hover .svc-line { width: 70px; }
  .svc-num { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300; color: rgba(250,248,244,0.04); line-height: 1; position: absolute; top: 1.5rem; right: 1.5rem; }
  .svc-icon { font-size: 1.8rem; margin-bottom: 1.2rem; }
  .svc h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 300; margin-bottom: 0.8rem; }
  .svc p { color: rgba(250,248,244,0.38); font-size: 0.86rem; line-height: 1.8; font-weight: 200; }

  /* FULLWIDTH IMAGE BREAK */
  .img-break { position: relative; height: 65vh; overflow: hidden; }
  .img-break img { width:100%; height:100%; object-fit:cover; object-position:center 30%; filter:brightness(0.42); }
  .img-break-inner { position: absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: 0 2rem; }
  .img-break-inner blockquote { font-family: 'Cormorant Garamond', serif; font-style:italic; font-weight:300; font-size:clamp(1.6rem,3.5vw,2.8rem); color:var(--white); max-width:750px; line-height:1.45; }
  .img-break-inner cite { display:block; margin-top:1.5rem; color:var(--gold); font-size:0.68rem; letter-spacing:0.3em; text-transform:uppercase; font-style:normal; }

  /* MENU */
  .menu-hero { position: relative; height: 55vh; overflow: hidden; display:flex; align-items:center; justify-content:center; }
  .menu-hero img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.35); }
  .menu-hero-text { position:relative; z-index:1; text-align:center; }
  .menu-hero-text h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(3rem,7vw,6rem); font-weight:300; }
  .menu-hero-text p { color:var(--gold); font-size:0.68rem; letter-spacing:0.4em; text-transform:uppercase; margin-top:1rem; font-weight:300; }
  .menu-cats-bar { display:flex; justify-content:center; border-bottom:1px solid rgba(250,248,244,0.08); }
  .mc { background:none; border:none; cursor:pointer; font-family:'Jost',sans-serif; font-size:0.7rem; font-weight:300; letter-spacing:0.2em; text-transform:uppercase; color:rgba(250,248,244,0.35); padding:1.2rem 2rem; border-bottom:1px solid transparent; margin-bottom:-1px; transition:color 0.25s; }
  .mc.on { color:var(--gold); border-bottom-color:var(--gold); }
  .menu-body-area { max-width:820px; margin:0 auto; padding:4rem 2rem; }
  .menu-row { display:flex; justify-content:space-between; align-items:flex-start; padding:1.6rem 0; border-bottom:1px solid rgba(250,248,244,0.06); }
  .menu-row:last-child { border-bottom:none; }
  .mr-name { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:300; margin-bottom:0.35rem; }
  .mr-desc { color:rgba(250,248,244,0.35); font-size:0.82rem; font-weight:200; line-height:1.6; max-width:420px; }
  .mr-tag { display:inline-block; margin-top:0.4rem; font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold); border:1px solid rgba(201,169,110,0.3); padding:0.12rem 0.5rem; }
  .menu-note { margin-top:3rem; padding:1.5rem 2rem; background:rgba(201,169,110,0.06); border-left:2px solid var(--gold); color:rgba(250,248,244,0.4); font-size:0.85rem; line-height:1.8; font-weight:200; }

  /* GALLERY */
  .gallery-intro { padding: 5rem 3rem 2rem; text-align: center; }
  .gal-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:4px; padding:4px; }
  .gc-item { position:relative; overflow:hidden; cursor:pointer; }
  .gc-item img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.5s ease; }
  .gc-item:hover img { transform:scale(1.05); }
  .gc-item:nth-child(1) { grid-column:span 2; aspect-ratio:16/9; }
  .gc-item:nth-child(4) { grid-column:span 2; aspect-ratio:16/9; }
  .gc-item:not(:nth-child(1)):not(:nth-child(4)) { aspect-ratio:1; }
  .gc-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(8,6,8,0.8) 0%,transparent 55%); opacity:0; transition:opacity 0.35s; }
  .gc-item:hover .gc-overlay { opacity:1; }
  .gc-label { position:absolute; bottom:0; left:0; right:0; padding:1.5rem; transform:translateY(8px); opacity:0; transition:all 0.35s; }
  .gc-item:hover .gc-label { transform:translateY(0); opacity:1; }
  .gc-cat { font-size:0.6rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); margin-bottom:0.25rem; }
  .gc-name { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:300; }

  /* ABOUT */
  .about-hero-img { position:relative; height:70vh; overflow:hidden; display:flex; align-items:flex-end; }
  .about-hero-img img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.38); }
  .about-hero-text { position:relative; z-index:1; padding:4rem; }
  .about-hero-text p { color:var(--gold); font-size:0.68rem; letter-spacing:0.35em; text-transform:uppercase; margin-bottom:1rem; font-weight:300; }
  .about-hero-text h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(2.8rem,6vw,5.5rem); font-weight:300; line-height:1.05; }
  .about-split-sec { display:grid; grid-template-columns:1fr 1fr; }
  .about-img-side { position:relative; min-height:550px; overflow:hidden; }
  .about-img-side img { width:100%; height:100%; object-fit:cover; display:block; }
  .about-text-side { padding:6rem 5rem; display:flex; flex-direction:column; justify-content:center; }

  /* CONTACT */
  .contact-hero-img { position:relative; height:55vh; overflow:hidden; display:flex; align-items:center; justify-content:center; }
  .contact-hero-img img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.35); }
  .contact-hero-img h1 { position:relative; z-index:1; font-family:'Cormorant Garamond',serif; font-size:clamp(3rem,7vw,6rem); font-weight:300; text-align:center; line-height:1.1; padding:0 1rem; }
  .contact-body { display:grid; grid-template-columns:1fr 1.3fr; max-width:1000px; margin:0 auto; padding:5rem 2rem; gap:5rem; }
  .ci h2 { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:300; margin-bottom:2.5rem; }
  .cd { display:flex; gap:1.2rem; margin-bottom:1.8rem; }
  .cd-ico { font-size:1.1rem; }
  .cd-lbl { font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:0.2rem; font-weight:300; }
  .cd-v { color:rgba(250,248,244,0.45); font-size:0.88rem; font-weight:200; line-height:1.6; }
  .cf { display:flex; flex-direction:column; gap:1rem; }
  .cf h2 { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:300; margin-bottom:0.5rem; }
  .fi { padding:1rem 1.2rem; background:rgba(250,248,244,0.04); border:1px solid rgba(250,248,244,0.08); font-family:'Jost',sans-serif; font-size:0.85rem; font-weight:300; color:var(--white); outline:none; transition:border-color 0.25s; }
  .fi::placeholder { color:rgba(250,248,244,0.2); }
  .fi:focus { border-color:rgba(201,169,110,0.5); }
  .fi option { background:var(--black); }
  textarea.fi { height:120px; resize:none; }
  .fr { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }

  @media(max-width:768px){
    nav { padding:1rem 1.2rem; }
    .nb { font-size:0.62rem; padding:0.4rem 0.45rem; letter-spacing:0.08em; }
    .nb.cta { padding:0.4rem 0.7rem; margin-left:0; }
    .logo small { display:none; }
    .split, .about-split-sec, .contact-body { grid-template-columns:1fr; }
    .split-content, .about-text-side { padding:3.5rem 2rem; }
    .work-grid { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
    .wg:first-child { grid-row:span 1; grid-column:span 2; }
    .svc-grid { grid-template-columns:1fr; }
    .stats { grid-template-columns:1fr 1fr; }
    .gal-grid { grid-template-columns:1fr 1fr; }
    .gc-item:nth-child(1), .gc-item:nth-child(4) { grid-column:span 2; }
    .fr { grid-template-columns:1fr; }
    .contact-body { gap:3rem; padding:3rem 1.5rem; }
  }
`;

const menuData = {
  "Canapés": [
    { name:"Smoked Salmon Blinis", desc:"Crème fraîche, dill, lemon zest", tag:"Signature" },
    { name:"Truffle Arancini", desc:"Wild mushroom, aged Pecorino, herb aioli", tag:"Vegetarian" },
    { name:"Beef Tataki Crostini", desc:"Wasabi cream, pickled daikon, micro cress", tag:"" },
    { name:"Prawn Cocktail Shots", desc:"Marie rose, avocado mousse, paprika", tag:"Popular" },
    { name:"Caprese Skewers", desc:"Buffalo mozzarella, heritage tomato, aged balsamic", tag:"Vegetarian" },
  ],
  "Bowl Food": [
    { name:"Lobster Mac & Cheese", desc:"Aged Gruyère, chive crumb, chilli oil", tag:"Signature" },
    { name:"Slow-Braised Short Rib", desc:"Truffle mash, roasted shallots, red wine jus", tag:"" },
    { name:"Thai Green Curry", desc:"Jasmine rice, pak choi, toasted coconut", tag:"Vegan" },
    { name:"Saffron Risotto", desc:"Wild mushroom, mascarpone, parmesan tuile", tag:"Vegetarian" },
  ],
  "Dinner": [
    { name:"Beef Wellington Duo", desc:"Prosciutto-wrapped fillet, duxelles, tarragon jus", tag:"Signature" },
    { name:"Pan-Seared Sea Bass", desc:"Saffron velouté, samphire, heritage tomato salsa", tag:"" },
    { name:"Duck Breast", desc:"Cherry reduction, celeriac fondant, crispy kale", tag:"" },
    { name:"Roasted Cauliflower Crown", desc:"Hazelnut butter, pomegranate, herb gremolata", tag:"Vegetarian" },
  ],
  "Desserts": [
    { name:"Dark Chocolate Fondant", desc:"Salted caramel, tonka bean ice cream, gold leaf", tag:"Signature" },
    { name:"Eton Mess Tower", desc:"Chantilly cream, summer berries, rose meringue", tag:"" },
    { name:"Cheese & Chutney Board", desc:"Five artisan cheeses, crackers, truffle honey", tag:"" },
    { name:"Mini Dessert Trio", desc:"Macaron, chocolate truffle, lemon posset", tag:"Popular" },
  ],
};

const IMGS = {
  hero:        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&q=85",
  split1:      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=85",
  break1:      "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1800&q=85",
  menuHero:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85",
  aboutHero:   "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1800&q=85",
  aboutSplit:  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000&q=85",
  contactHero: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1800&q=85",
  w1: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  w2: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
  w3: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800&q=80",
  w4: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=80",
  w5: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&q=80",
  g1: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
  g2: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
  g3: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
  g4: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  g5: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  g6: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
  g7: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&q=80",
};

const STRIP = ["Weddings","Corporate Events","Private Celebrations","Outside Catering","Event Design","Floral Styling","Intimate Dinners","Festival Catering"];

export default function App() {
  const [page, setPage] = useState("home");
  const [cat, setCat] = useState("Canapés");
  const go = (p) => { setPage(p); window.scrollTo(0,0); };

  return (
    <>
      <style>{css}</style>

      <nav>
        <div className="logo" onClick={()=>go("home")}>
          Untethered
          <small>Events &amp; Outside Catering</small>
        </div>
        <div className="nav-links">
          {["home","about","services","catering","gallery","contact"].map(p=>(
            <button key={p} className={`nb${page===p?" on":""}${p==="contact"?" cta":""}`} onClick={()=>go(p)}>
              {p==="catering"?"Menu":p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {page==="home" && (
        <div className="pg">
          {/* MASSIVE HERO */}
          <section className="hero">
            <img className="hero-img" src={IMGS.hero} alt="Luxury wedding event" />
            <div className="hero-overlay"/>
            <div className="hero-body">
              <span className="hero-label">Events Design &nbsp;·&nbsp; Outside Catering &nbsp;·&nbsp; Bespoke Experiences</span>
              <h1 className="hero-h1">
                We Don't Just<br/>
                <em>Design Events.</em>
                We Create Feelings.
              </h1>
              <p className="hero-sub">From the first bloom to the final toast — every detail crafted to move your guests in ways they'll never forget.</p>
              <div className="hero-btns">
                <button className="btn-a" onClick={()=>go("contact")}>Plan Your Event</button>
                <button className="btn-b" onClick={()=>go("gallery")}>See Our Work</button>
              </div>
            </div>
            <div className="hero-scroll">
              <div className="scroll-bar"/>
              Scroll
            </div>
          </section>

          {/* MARQUEE */}
          <div className="marquee">
            <div className="marquee-inner">
              {[...Array(2)].map((_,r)=>(
                <span key={r} style={{display:"inline-flex",gap:"3rem"}}>
                  {STRIP.map((t,i)=><span key={i} className="mtag">{t} &nbsp; ✦</span>)}
                </span>
              ))}
            </div>
          </div>

          {/* SPLIT */}
          <section className="split">
            <div className="split-img">
              <img src={IMGS.split1} alt="Elegant event setup"/>
            </div>
            <div className="split-content">
              <div className="eyebrow">About Untethered</div>
              <h2 className="big-title">Your Vision,<br/><em>Elevated.</em></h2>
              <p className="body-txt">We are a team of passionate event designers and Michelin-trained chefs united by one obsession — making your event feel unlike anything your guests have ever experienced.</p>
              <p className="body-txt">From intimate candlelit dinners to grand gala celebrations, we craft every moment with extraordinary care, precision, and love for the details that most people never even notice — but always feel.</p>
              <button className="btn-b" style={{marginTop:"1.5rem",alignSelf:"flex-start"}} onClick={()=>go("about")}>Our Story →</button>
            </div>
          </section>

          {/* STATS */}
          <div className="stats">
            <div className="stat"><div className="stat-n">1,200+</div><div className="stat-l">Events Delivered</div></div>
            <div className="stat"><div className="stat-n">10+</div><div className="stat-l">Years of Craft</div></div>
            <div className="stat"><div className="stat-n">45</div><div className="stat-l">Expert Team</div></div>
            <div className="stat"><div className="stat-n">98%</div><div className="stat-l">Client Satisfaction</div></div>
          </div>

          {/* WORK GRID */}
          <div className="work-header">
            <div className="eyebrow" style={{textAlign:"center",marginBottom:"1rem"}}>Portfolio</div>
            <h2 className="big-title" style={{textAlign:"center"}}>Moments We've <em>Made.</em></h2>
          </div>
          <div className="work-grid">
            {[
              {src:IMGS.w1, cat:"Weddings", title:"The Garden Wedding"},
              {src:IMGS.w2, cat:"Corporate", title:"Awards Evening"},
              {src:IMGS.w3, cat:"Private Party", title:"Rooftop Soirée"},
              {src:IMGS.w4, cat:"Wedding", title:"The Grand Ceremony"},
              {src:IMGS.w5, cat:"Fine Dining", title:"Candlelit Supper"},
            ].map((w,i)=>(
              <div className="wg" key={i}>
                <img src={w.src} alt={w.title}/>
                <div className="wg-overlay"/>
                <div className="wg-info">
                  <div className="wg-cat">{w.cat}</div>
                  <div className="wg-title">{w.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FULLWIDTH QUOTE IMAGE */}
          <div className="img-break">
            <img src={IMGS.break1} alt="Atmospheric event"/>
            <div className="img-break-inner">
              <blockquote>"The best events don't just look beautiful — they make people feel something they'll carry with them forever."</blockquote>
              <cite>— Our Promise to Every Client</cite>
            </div>
          </div>

          {/* SERVICES */}
          <section className="services-sec">
            <h2 className="big-title" style={{textAlign:"center",marginBottom:"4rem"}}>What We <em>Do</em></h2>
            <div className="svc-grid">
              {[
                {icon:"✨",num:"01",name:"Event Design & Styling",desc:"Full concept to execution — floral, lighting, décor, and everything in between."},
                {icon:"🍽️",num:"02",name:"Outside Catering",desc:"Restaurant-quality menus brought to any venue. Our chefs travel anywhere."},
                {icon:"💒",num:"03",name:"Wedding Packages",desc:"End-to-end wedding design and catering with a dedicated planner by your side."},
                {icon:"🏢",num:"04",name:"Corporate Events",desc:"Launches, award ceremonies, conferences — delivered with precision and style."},
                {icon:"🎉",num:"05",name:"Private Celebrations",desc:"Birthdays, anniversaries, milestones — every celebration made extraordinary."},
                {icon:"🎪",num:"06",name:"Pop-ups & Festivals",desc:"High-volume outdoor catering with full logistics, equipment, and staffing."},
              ].map((s,i)=>(
                <div className="svc" key={i}>
                  <div className="svc-num">{s.num}</div>
                  <div className="svc-line"/>
                  <div className="svc-icon">{s.icon}</div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {page==="about" && (
        <div className="pg" style={{paddingTop:"68px"}}>
          <div className="about-hero-img">
            <img src={IMGS.aboutHero} alt="Our team at work"/>
            <div className="about-hero-text">
              <p>Who We Are</p>
              <h1>Born From a Passion<br/>For the Extraordinary</h1>
            </div>
          </div>
          <section className="about-split-sec">
            <div className="about-img-side">
              <img src={IMGS.aboutSplit} alt="Event in progress"/>
            </div>
            <div className="about-text-side">
              <div className="eyebrow">Our Story</div>
              <h2 className="big-title">Crafted With<br/><em>Passion & Precision</em></h2>
              <p className="body-txt">Untethered was founded in 2014 on a simple but powerful belief — that great events are born from the perfect marriage of inspired design and extraordinary food. A decade on, we've delivered over 1,200 events across the UK and Europe.</p>
              <p className="body-txt">Our team brings together event designers, Michelin-trained chefs, and experienced hospitality professionals who share one obsession: the details that most people never even notice — but always feel.</p>
              <p className="body-txt">Whether you're planning an intimate dinner for twenty or a festival for two thousand, we bring the same dedication, creativity, and care to every single event.</p>
            </div>
          </section>
          <div className="stats">
            <div className="stat"><div className="stat-n">1,200+</div><div className="stat-l">Events Delivered</div></div>
            <div className="stat"><div className="stat-n">10+</div><div className="stat-l">Years Experience</div></div>
            <div className="stat"><div className="stat-n">45</div><div className="stat-l">Team Members</div></div>
            <div className="stat"><div className="stat-n">98%</div><div className="stat-l">Client Satisfaction</div></div>
          </div>
          <div className="img-break">
            <img src={IMGS.break1} alt="Luxury atmosphere"/>
            <div className="img-break-inner">
              <blockquote>"We don't just turn up and set up. We immerse ourselves in your vision until it becomes ours."</blockquote>
              <cite>— Founder, Untethered Events</cite>
            </div>
          </div>
        </div>
      )}

      {page==="services" && (
        <div className="pg">
          <section className="hero" style={{height:"70vh"}}>
            <img className="hero-img" src={IMGS.split1} alt="Event design"/>
            <div className="hero-overlay"/>
            <div className="hero-body">
              <span className="hero-label">What We Offer</span>
              <h1 className="hero-h1" style={{fontSize:"clamp(3rem,7vw,6.5rem)"}}>Our <em>Services</em></h1>
            </div>
          </section>
          <section className="services-sec" style={{paddingTop:"5rem"}}>
            <div className="svc-grid">
              {[
                {icon:"✨",num:"01",name:"Event Design & Styling",desc:"From concept to final flourish — immersive environments that tell your story. Floral design, lighting, bespoke décor, furniture hire, and full installation."},
                {icon:"🍽️",num:"02",name:"Outside Catering",desc:"Our chefs bring fine-dining quality to any location. Field, farmhouse, rooftop or ballroom — fully equipped kitchens, professional staff, seasonal menus."},
                {icon:"💒",num:"03",name:"Wedding Packages",desc:"Bespoke wedding packages from engagement party to the big day. Coordinated design and catering with a dedicated wedding planner throughout."},
                {icon:"🏢",num:"04",name:"Corporate Events",desc:"Product launches, awards ceremonies, conferences, and incentive dinners — we make your brand look extraordinary and your guests feel genuinely impressed."},
                {icon:"🎉",num:"05",name:"Private Celebrations",desc:"Birthdays, anniversaries, christenings, retirement parties — every milestone deserves extraordinary food and an unforgettable atmosphere."},
                {icon:"🎪",num:"06",name:"Pop-ups & Festivals",desc:"High-volume outdoor and festival catering with full equipment hire, staffing, and logistics. We've fed thousands. No venue, no problem."},
              ].map((s,i)=>(
                <div className="svc" key={i}>
                  <div className="svc-num">{s.num}</div>
                  <div className="svc-line"/>
                  <div className="svc-icon">{s.icon}</div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <div className="img-break">
            <img src={IMGS.menuHero} alt="Fine dining"/>
            <div className="img-break-inner">
              <blockquote>"Every service we offer exists for one reason — to make your guests feel something extraordinary."</blockquote>
            </div>
          </div>
        </div>
      )}

      {page==="catering" && (
        <div className="pg" style={{paddingTop:"68px"}}>
          <div className="menu-hero">
            <img src={IMGS.menuHero} alt="Fine dining spread"/>
            <div className="menu-hero-text">
              <h1>Our Menus</h1>
              <p>Seasonal · Chef-Crafted · Delivered Anywhere</p>
            </div>
          </div>
          <div className="menu-cats-bar">
            {Object.keys(menuData).map(c=>(
              <button key={c} className={`mc${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="menu-body-area">
            {menuData[cat].map((item,i)=>(
              <div className="menu-row" key={i}>
                <div>
                  <div className="mr-name">{item.name}</div>
                  <div className="mr-desc">{item.desc}</div>
                  {item.tag && <span className="mr-tag">{item.tag}</span>}
                </div>
              </div>
            ))}
            <div className="menu-note">
              All menus are tailored to your event. We cater for all dietary requirements including vegan, gluten-free, halal, and kosher.{" "}
              <span style={{color:"var(--gold)",cursor:"pointer"}} onClick={()=>go("contact")}>Contact us for a bespoke quote →</span>
            </div>
          </div>
        </div>
      )}

      {page==="gallery" && (
        <div className="pg" style={{paddingTop:"68px"}}>
          <div className="gallery-intro">
            <div className="eyebrow" style={{textAlign:"center",marginBottom:"1rem"}}>Portfolio</div>
            <h2 className="big-title" style={{textAlign:"center"}}>A Glimpse Into <em>Our World</em></h2>
          </div>
          <div className="gal-grid">
            {[
              {src:IMGS.g1, cat:"Wedding Design",    name:"The Grand Garden Gala"},
              {src:IMGS.g2, cat:"Corporate",          name:"Midnight Product Launch"},
              {src:IMGS.g3, cat:"Venue Styling",      name:"Candlelit Manor Evening"},
              {src:IMGS.g4, cat:"Outside Catering",   name:"Fine Dining in the Fields"},
              {src:IMGS.g5, cat:"Event Design",       name:"Floral Paradise"},
              {src:IMGS.g6, cat:"Private Party",      name:"Rooftop Celebration"},
              {src:IMGS.g7, cat:"Wedding Catering",   name:"The Harvest Table"},
            ].map((g,i)=>(
              <div className="gc-item" key={i}>
                <img src={g.src} alt={g.name}/>
                <div className="gc-overlay"/>
                <div className="gc-label">
                  <div className="gc-cat">{g.cat}</div>
                  <div className="gc-name">{g.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {page==="contact" && (
        <div className="pg" style={{paddingTop:"68px"}}>
          <div className="contact-hero-img">
            <img src={IMGS.contactHero} alt="Luxury event"/>
            <h1>Let's Create Something<br/><em style={{fontStyle:"italic",color:"var(--gold)"}}>Extraordinary</em></h1>
          </div>
          <div className="contact-body">
            <div className="ci">
              <h2>Get In Touch</h2>
              <div className="cd"><div className="cd-ico">📞</div><div><div className="cd-lbl">Phone</div><div className="cd-v">+256 787 887 653</div></div></div>
              <div className="cd"><div className="cd-ico">✉️</div><div><div className="cd-lbl">Email</div><div className="cd-v">hello@untetheredevents.ug</div></div></div>
              <div className="cd"><div className="cd-ico">📍</div><div><div className="cd-lbl">Based In</div><div className="cd-v">Kampala, Ntinda<br/>Available Nationwide & East Africa</div></div></div>
              <div className="cd"><div className="cd-ico">🕐</div><div><div className="cd-lbl">Office Hours</div><div className="cd-v">Mon–Fri: 9am–6pm (EAT)<br/>Sat: 10am–4pm</div></div></div>
            </div>
            <div className="cf">
              <h2>Enquire Now</h2>
              <div className="fr">
                <input className="fi" type="text" placeholder="Your Name"/>
                <input className="fi" type="email" placeholder="Email Address"/>
              </div>
              <div className="fr">
                <input className="fi" type="tel" placeholder="Phone Number"/>
                <input className="fi" type="text" placeholder="Event Date"/>
              </div>
              <select className="fi" defaultValue="">
                <option value="" disabled>Type of Event</option>
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Private Party</option>
                <option>Birthday / Celebration</option>
                <option>Festival / Pop-up</option>
                <option>Other</option>
              </select>
              <input className="fi" type="text" placeholder="Approximate Guest Numbers"/>
              <textarea className="fi" placeholder="Tell us about your vision — venue, vibe, any special requirements..."/>
              <button className="btn-a" style={{alignSelf:"flex-start"}}>Send Enquiry</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
