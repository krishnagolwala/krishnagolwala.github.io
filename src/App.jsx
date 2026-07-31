import Lenis from 'lenis';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Effects from './components/Effects.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Sections from './components/Sections.jsx';
import About from './components/About.jsx';
import ContactSections from './components/Contact.jsx';

export default function App() {
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;

    const lenis = new Lenis({ duration: 1.15 });
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor || anchor.getAttribute('href').length < 2) return;
      e.preventDefault();
      lenis.scrollTo(anchor.getAttribute('href'), { offset: -72, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', onClick);
    };
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <Effects onDone={() => setStarted(true)} />
      <Nav started={started} />
      <main>
        <Hero started={started} />
        <Sections />
        <About />
        <ContactSections />
      </main>
    </MotionConfig>
  );
}
