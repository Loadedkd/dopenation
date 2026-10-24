import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Disc3, Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const genres = [
  {
    id: "pop",
    number: "01",
    title: "Pop",
    mood: "BRIGHT SIDE / BIG FEELING",
    description: "Hooks that stay with you. Melodies made for the ride home and the encore. Find your next repeat.",
    image: "/manus-storage/async-images/GjnRkQauYE9fkjhx4DZLD1/image-1.webp",
    alt: "Surreal chrome vinyl and a luminous glass flower in vivid pop colors",
    className: "pop",
    search: "Dopenation Pop playlist",
  },
  {
    id: "indian-hip-hop",
    number: "02",
    title: "Indian Hip-Hop",
    mood: "BASSLINES / NEW VOICES",
    description: "A pulse from the streets, built for right now. Bars, beats and a scene moving at its own speed.",
    image: "/manus-storage/async-images/GjnRkQauYE9fkjhx4DZLD1/image-2.webp",
    alt: "A contemporary Indian city skyline at blue hour with amber lights and monsoon haze",
    className: "indian",
    search: "Dopenation Indian Hip Hop playlist",
  },
  {
    id: "desi-rap",
    number: "03",
    title: "Desi Rap",
    mood: "RAW CUTS / REAL TALK",
    description: "Unfiltered stories over hard drums. New-school attitude with roots that run deep.",
    image: "/manus-storage/async-images/GjnRkQauYE9fkjhx4DZLD1/image-3.webp",
    alt: "A rain-soaked city lane lit by vermilion neon, with a microphone cable in the foreground",
    className: "desi",
    search: "Dopenation Desi Rap playlist",
  },
  {
    id: "edm-bangers",
    number: "04",
    title: "EDM Bangers",
    mood: "HANDS UP / LIGHTS OUT",
    description: "Big-room energy, no half measures. For the drop, the drive and the last song of the night.",
    image: "/manus-storage/async-images/GjnRkQauYE9fkjhx4DZLD1/image-4.webp",
    alt: "A dark electronic music festival lit by acid-lime and violet lasers",
    className: "edm",
    search: "Dopenation EDM Bangers playlist",
  },
];

function MusicSearchLink({ query, children }: { query: string; children: React.ReactNode }) {
  const href = `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const artworkY = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : 80]);
  const revealFrom = reduceMotion ? false : { opacity: 0, y: 34 };
  const revealTo = reduceMotion ? undefined : { opacity: 1, y: 0 };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Dopenation home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true"><Disc3 size={20} strokeWidth={2.2} /></span>
          <span className="brand-word">DOPE<span>NATION</span></span>
          <span className="brand-dot" aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav id="primary-navigation" className={`nav-links${menuOpen ? " nav-links--open" : ""}`} aria-label="Main navigation">
          <a href="#playlists" onClick={closeMenu}>Playlists <span>04</span></a>
          <a href="#about" onClick={closeMenu}>The channel</a>
          <a className="nav-cta" href="#playlists" onClick={closeMenu}>Find your frequency <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> SOUND WITHOUT BORDERS <span className="eyebrow-rule" /> EST. FOR WHAT'S NEXT</div>
            <h1 id="hero-title">Your next<br /><span>repeat</span> starts<br />here<span className="hero-period">.</span></h1>
            <div className="hero-bottomline">
              <p>Four moods. One home for the sounds you came to find—and the ones you didn't know you needed.</p>
              <a className="round-link" href="#playlists" aria-label="Scroll to playlists"><ArrowDown size={19} /></a>
            </div>
          </div>

          <motion.div className="hero-art" style={{ y: artworkY }} aria-hidden="true">
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <div className="orbit orbit--three" />
            <div className="hero-disc"><span className="disc-center"><Disc3 size={38} strokeWidth={1.2} /></span></div>
            <span className="hero-art-label hero-art-label--top">TUNE IN / TUNE OUT</span>
            <span className="hero-art-label hero-art-label--bottom">DN — SIDE A</span>
            <span className="hero-art-number">04</span>
          </motion.div>

          <a className="scroll-note" href="#playlists"><span className="scroll-line" /> SCROLL TO FEEL IT</a>
          <div className="hero-index" aria-hidden="true">01 / 04</div>
        </section>

        <div className="ticker" aria-label="Four sounds, one frequency">
          <div className="ticker-track" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <span className="ticker-item" key={i}>FIND YOUR FREQUENCY <span className="ticker-star">✳</span> NO SKIPS, JUST VIBES <span className="ticker-star">✳</span></span>
            ))}
          </div>
        </div>

        <section className="playlist-section" id="playlists" aria-labelledby="playlist-heading">
          <div className="section-heading">
            <motion.div initial={revealFrom} whileInView={revealTo} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}>
              <span className="section-kicker">THE SOUND SELECTOR <span>— 4 GENRES, ZERO RULES</span></span>
              <h2 id="playlist-heading">Pick a <em>mood.</em></h2>
            </motion.div>
            <p className="section-aside">Scroll through. Stop where it hits.<br />Your next repeat is somewhere in here.</p>
          </div>

          <div className="genre-list">
            {genres.map((genre, index) => (
              <motion.article
                className={`genre-card genre-card--${genre.className}${index % 2 ? " genre-card--reverse" : ""}`}
                id={genre.id}
                key={genre.id}
                initial={revealFrom}
                whileInView={revealTo}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="genre-visual">
                  <img src={genre.image} alt={genre.alt} loading="lazy" />
                  <div className="visual-shade" />
                  <span className="visual-stamp">DN / PLAYLIST <span>{genre.number}</span></span>
                  <span className="visual-caption">DOPENATION RADIO — GENRE SELECTOR</span>
                </div>
                <div className="genre-info">
                  <div className="genre-meta"><span>{genre.number} / 04</span><span className="genre-meta-dot" />{genre.mood}</div>
                  <h3>{genre.title}</h3>
                  <p>{genre.description}</p>
                  <MusicSearchLink query={genre.search}>Explore on YouTube Music</MusicSearchLink>
                  <span className="genre-watermark" aria-hidden="true">{genre.number}</span>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="playlist-note">Playlist buttons open a YouTube Music search for Dopenation + genre. Add direct playlist links when your mixes are ready.</p>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-heading">
          <motion.div className="about-mark" initial={revealFrom} whileInView={revealTo} viewport={{ once: true }} transition={{ duration: 0.6 }} aria-hidden="true">
            <span className="about-mark-ring"><Disc3 size={48} strokeWidth={1} /></span>
            <span className="about-mark-copy">PLAY IT<br />YOUR WAY</span>
          </motion.div>
          <motion.div className="about-copy" initial={revealFrom} whileInView={revealTo} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}>
            <span className="section-kicker">A CHANNEL FOR THE CURIOUS</span>
            <h2 id="about-heading">Not one sound.<br /><em>Your whole rotation.</em></h2>
            <p>Dopenation brings the worlds you move through into one place—from hooks that lift you up to basslines that keep the night going. Choose a lane, cross over, come back louder.</p>
            <a className="about-jump" href="#playlists">Back to the genres <ArrowRight size={17} /></a>
          </motion.div>
        </section>

        <section className="closing-cta" aria-labelledby="closing-heading">
          <div className="closing-noise" aria-hidden="true" />
          <span className="section-kicker">THE NEXT TRACK IS YOURS</span>
          <h2 id="closing-heading">Stay in the<br /><em>good noise.</em></h2>
          <a className="closing-button" href="#playlists">Choose your sound <ArrowUpRight size={18} /></a>
          <span className="closing-orbit" aria-hidden="true"><Disc3 size={110} strokeWidth={0.6} /></span>
        </section>
      </main>

      <footer className="footer">
        <a className="brand brand--footer" href="#top" aria-label="Dopenation home"><span className="brand-mark" aria-hidden="true"><Disc3 size={19} /></span><span className="brand-word">DOPE<span>NATION</span></span><span className="brand-dot" aria-hidden="true" /></a>
        <span className="footer-line">FOUR MOODS. ONE FREQUENCY.</span>
        <a className="back-top" href="#top">BACK TO TOP ↑</a>
        <span className="footer-copy">© DOPENATION</span>
      </footer>
    </div>
  );
}
