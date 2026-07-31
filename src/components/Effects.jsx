import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE } from '../ui.jsx';

const BOOT_LINES = [
  '$ npm run dev',
  '> compiling portfolio',
  '> loading components',
  '> connecting projects',
  '> portfolio ready',
];

export function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const controls = animate(0, 100, {
      duration: 1.5,
      ease: EASE,
      onUpdate: (v) => setPct(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduce]);

  useEffect(() => {
    if (reduce) {
      onDone();
      return undefined;
    }
    return undefined;
  }, [reduce, onDone]);

  if (reduce) return null;

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.65 }}
      onAnimationComplete={onDone}
      aria-hidden="true"
    >
      <div className="preloader-window">
        <div className="preloader-bar">
          <span className="preloader-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="preloader-title">krishna — portfolio</span>
        </div>
        <div className="preloader-body">
          <div className="preloader-lines">
            {BOOT_LINES.map((line, i) => (
              <motion.span
                key={line}
                className={`preloader-line${i === BOOT_LINES.length - 1 ? ' preloader-line--done' : ''}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: 0.1 + i * 0.16 }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="preloader-cursor"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: 0.1 + BOOT_LINES.length * 0.16 }}
            />
          </div>
          <div className="preloader-foot">
            <motion.div
              className="preloader-progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: EASE }}
            />
            <span className="preloader-pct">{pct}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 60 });
  const dotY = useSpring(y, { stiffness: 900, damping: 60 });
  const glowX = useSpring(x, { stiffness: 55, damping: 18, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 55, damping: 18, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setEnabled(mq.matches);
    if (!mq.matches) return undefined;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => setHovering(Boolean(e.target.closest('a, button, [data-cursor]')));
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />
      <motion.div
        className={`cursor${hovering ? ' cursor--active' : ''}`}
        style={{ x: dotX, y: dotY }}
        aria-hidden="true"
      />
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 1]);
  const y = useTransform(scrollYProgress, [0.05, 0.12], [18, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? 'auto' : 'none'));

  return (
    <motion.a href="#hero" className="back-to-top" style={{ opacity, y, pointerEvents }} aria-label="Back to top">
      <svg viewBox="0 0 40 40" className="back-to-top-ring" aria-hidden="true">
        <circle className="ring-bg" cx="20" cy="20" r="17" />
        <motion.circle className="ring-fg" cx="20" cy="20" r="17" style={{ pathLength: scrollYProgress }} />
      </svg>
      <svg viewBox="0 0 24 24" className="back-to-top-arrow" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </motion.a>
  );
}

export default function Effects({ onDone }) {
  return (
    <>
      <Preloader onDone={onDone} />
      <Cursor />
      <ScrollProgress />
      <BackToTop />
    </>
  );
}
