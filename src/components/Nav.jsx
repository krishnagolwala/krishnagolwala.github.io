import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASE, EMAIL } from '../ui.jsx';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Work' },
  { href: `mailto:${EMAIL}`, label: 'Contact' },
];

const SECTION_IDS = ['hero', 'about', 'services', 'projects', 'contact'];

export default function Nav({ started }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#hero');
  const prevY = useRef(0);
  const menuOpenRef = useRef(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const delta = v - prevY.current;
    prevY.current = v;
    setScrolled(v > 24);
    if (!menuOpenRef.current) setHidden(delta > 0 && v > 220);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-38% 0px -55% 0px' },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    menuOpenRef.current = !menuOpenRef.current;
    setMenuOpen(menuOpenRef.current);
  };

  const closeMenu = () => {
    menuOpenRef.current = false;
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={started ? { y: hidden && !menuOpen ? '-110%' : 0, opacity: 1 } : {}}
        transition={{ duration: 0.55, ease: EASE }}
        aria-label="Primary navigation"
      >
        <div className="nav-bar">
          <a href="#hero" className="logo" aria-label="Krishna Golwala home">
            KRISHNA<span className="logo-dot">.</span>
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((link) => {
              const isActive = link.href.startsWith('#') && active === link.href;
              return (
                <li key={link.label}>
                  <a href={link.href} className={isActive ? 'active' : ''} aria-current={isActive ? 'true' : undefined}>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            className={`menu-toggle${menuOpen ? ' menu-toggle--open' : ''}`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }} transition={{ duration: 0.3, ease: EASE }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }} transition={{ duration: 0.3, ease: EASE }} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ul>
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.06 + i * 0.06 }}
                >
                  <a href={link.href} onClick={closeMenu}>
                    <span className="mobile-menu-index">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="mobile-menu-email"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
            >
              {EMAIL}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
