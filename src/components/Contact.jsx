import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { EASE, EMAIL, Magnetic, Reveal } from '../ui.jsx';

const GITHUB_URL = 'https://github.com/krishnagolwala';
const LINKEDIN_URL = 'https://www.linkedin.com/in/krishna-golwala-47857826a';

function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${fd.get('name') || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message') || ''}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="5" placeholder="Tell me about your project..." required />
      </div>
      <motion.button
        type="submit"
        className={`btn btn--primary btn--submit${sent ? ' btn--sent' : ''}`}
        whileTap={{ scale: 0.96 }}
        data-cursor
      >
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.span
              key="sent"
              className="btn-sent"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Message Ready
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="btn-idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              Send Message
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <p className="form-note">Opens your email app with everything pre-filled. Or email me directly.</p>
    </form>
  );
}

function Contact() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section id="contact" ref={ref} className="contact-section">
      <div className="container">
        <motion.h2 className="cta-title" style={reduce ? undefined : { scale, y }}>
          Let&rsquo;s Bring Your Vision to Life
        </motion.h2>

        <div className="contact-grid">
          <Reveal className="contact-info">
            <div className="contact-card">
              <span className="contact-card-label">Email</span>
              <a className="contact-card-value" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
            <div className="contact-card">
              <span className="contact-card-label">Response Time</span>
              <span className="contact-card-value">Within 24–48 hours</span>
            </div>
            <div className="contact-card">
              <span className="contact-card-label">Status</span>
              <span className="contact-card-value contact-availability">
                <motion.span
                  className="status-dot"
                  animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                />
                Available for Projects
              </span>
            </div>
            <div className="contact-card">
              <span className="contact-card-label">Elsewhere</span>
              <span className="contact-card-links">
              <Magnetic strength={0.25}>
                <a className="contact-social" href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a className="contact-social" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a className="contact-social" href={`mailto:${EMAIL}`} aria-label="Email" data-cursor>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="m2 7 10 7L22 7" />
                    </svg>
                  </a>
                </Magnetic>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="contact-form-wrap">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const drift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <footer ref={ref} className="site-footer">
      <motion.div
        className="footer-divider"
        initial={reduce ? undefined : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        aria-hidden="true"
      />
      <div className="footer-watermark" aria-hidden="true">
        <motion.span style={reduce ? undefined : { x: drift }}>KRISHNA</motion.span>
      </div>
      <div className="footer-row">
        <p>&copy; 2026 Krishna Golwala. All rights reserved.</p>
        <span className="footer-availability">
          <span className="status-dot" aria-hidden="true" />
          Available for work
        </span>
        <div className="footer-socials">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="m2 7 10 7L22 7" />
            </svg>
          </a>
        </div>
        <a className="footer-email" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </div>
    </footer>
  );
}

export default function ContactSections() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  );
}
