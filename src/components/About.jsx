import { Reveal, SectionHeader } from '../ui.jsx';

const TIMELINE = [
  {
    year: '2022',
    title: 'The Start',
    copy: 'Joined GitHub in December 2022 and wrote my first lines of HTML & CSS.',
  },
  {
    year: '2024',
    title: 'E-Commerce & Web',
    copy: 'Managed marketplaces on Amazon, Flipkart & Meesho as an E-commerce Executive — while sharpening my web skills.',
  },
  {
    year: '2025',
    title: 'BCA Graduate',
    copy: 'Graduated from SDJ International College and went full-stack with PHP & MySQL.',
  },
  {
    year: '2026',
    title: 'MCA Student',
    copy: 'Pursuing my Master of Computer Applications at SCET, Surat — shipping projects and learning daily.',
  },
];

const CHIPS = ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'C++', 'Git'];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader index="04" label="About Me" title="My story & work" />
        <div className="about-grid">
          <Reveal className="about-intro">
            <p className="about-lead">
              &ldquo;Consistency and curiosity are my biggest strengths as a developer.&rdquo;
            </p>
            <p>
              I&rsquo;m Krishna Golwala — a web developer from Surat, India. I hold a BCA from SDJ International College
              and am currently pursuing my MCA at Sarvajanik College of Engineering &amp; Technology (SCET), specializing
              in web development, advanced database systems and software design patterns.
            </p>
            <p>
              Before going full-stack, I spent two years as an E-commerce Executive at Prerna Industries — managing
              operations on Amazon, Flipkart and Meesho, optimizing product listings and planning campaigns. That
              experience shaped how I build: real-world usability first.
            </p>
            <p>
              Today I build database-driven web applications with PHP &amp; MySQL — carts, checkouts, admin panels,
              authentication and clean, maintainable code.
            </p>
            <div className="about-chips">
              {CHIPS.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </Reveal>

          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08} className="timeline-item">
                <span className="timeline-dot" aria-hidden="true" />
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
