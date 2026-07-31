import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { EASE, EMAIL, Magnetic } from '../ui.jsx';

const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const word = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};
const fadeItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero({ started }) {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const line1Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const line2Y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const shapeY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <header ref={heroRef} id="hero" className="hero">
      <motion.span className="hero-bg-name" style={{ y: reduce ? undefined : bgY }} aria-hidden="true">
        KRISHNA
      </motion.span>
      <motion.div
        className="hero-shape"
        style={{ y: reduce ? undefined : shapeY }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <motion.div
        className="hero-content"
        variants={titleContainer}
        initial="hidden"
        animate={started ? 'show' : 'hidden'}
        style={{ opacity: reduce ? undefined : fade }}
      >
        <motion.div className="status-pill" variants={fadeItem}>
          <motion.span
            className="status-dot"
            animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          Available for Projects
        </motion.div>

        <motion.p className="hero-sub" variants={fadeItem}>
          Creative Web Developer &amp; Designer
        </motion.p>

        <h1 className="hero-title" aria-label="Krishna Golwala">
          <motion.span className="hero-line" style={{ y: reduce ? undefined : line1Y }} aria-hidden="true">
            <motion.span variants={word}>Krishna</motion.span>
          </motion.span>
          <motion.span className="hero-line hero-line--outline" style={{ y: reduce ? undefined : line2Y }} aria-hidden="true">
            <motion.span variants={word}>Golwala</motion.span>
          </motion.span>
        </h1>

        <motion.p className="hero-copy" variants={fadeItem} style={reduce ? undefined : { y: copyY }}>
          I build responsive, high-performing websites with clean interfaces, practical backend thinking, and a sharp
          focus on the people using them.
        </motion.p>

        <motion.div className="hero-actions" variants={fadeItem}>
          <Magnetic>
            <a href={`mailto:${EMAIL}`} className="btn btn--primary" data-cursor>
              Start a Project
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#projects" className="btn btn--ghost" data-cursor>
              View Work
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <a href="#about" className="scroll-hint" aria-label="Scroll to about section">
        <span>Scroll</span>
        <motion.span
          className="scroll-hint-line"
          animate={reduce ? undefined : { y: [-44, 44] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </a>
    </header>
  );
}
