import { motion } from 'framer-motion';
import { Reveal, SectionHeader, fadeUp } from '../ui.jsx';

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '5+', label: 'Projects Built' },
  { value: '2', label: 'Live Apps' },
];

const SKILLS = [
  { name: 'HTML', pct: 92 },
  { name: 'CSS', pct: 88 },
  { name: 'JavaScript', pct: 84 },
  { name: 'PHP', pct: 78 },
  { name: 'MySQL', pct: 80 },
  { name: 'C++', pct: 72 },
];

const SERVICES = [
  {
    title: 'Web Development',
    copy: 'Responsive, fast, accessible websites — from landing pages to full-stack applications.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: 'UI / UX Design',
    copy: 'Clean interfaces and thoughtful flows, designed around how real people actually use them.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: 'Backend & Data',
    copy: 'PHP and MySQL under the hood — forms, auth, and data handling that just works.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </svg>
    ),
  },
];

const PROJECTS = [
  {
    num: '01',
    tag: 'E-Commerce',
    title: 'Jewelry Store',
    desc: 'Complete e-commerce platform — shopping cart, checkout flow, invoice generation, admin panel and order management.',
    stack: ['PHP', 'MySQL'],
    hue: 'a',
  },
  {
    num: '02',
    tag: 'Web App',
    title: 'Digi Bouquet',
    desc: 'A modern, fully responsive web application with interactive JavaScript features and custom styling.',
    stack: ['JavaScript', 'CSS', 'HTML'],
    hue: 'b',
  },
  {
    num: '03',
    tag: 'Management',
    title: 'SCET InfraDESK',
    desc: 'Infrastructure management system — resource tracking, request management, role-based access and reporting.',
    stack: ['PHP', 'HTML'],
    hue: 'a',
  },
  {
    num: '04',
    tag: 'Desktop',
    title: 'Canteen System',
    desc: 'Console-based canteen management with multi-role access (admin, manager, staff) and file-based storage.',
    stack: ['C++'],
    hue: 'b',
  },
];

function Stats() {
  return (
    <section className="stats-section" aria-label="Experience stats">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader index="01" label="Technology" title="Tools I use to build & ship" />
        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="skill-head">
                <h3>{skill.name}</h3>
                <span className="skill-pct">{skill.pct}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.pct}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeader index="02" label="Services" title="What I can do for you" />
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1} className="service-card">
              <span className="service-num">0{i + 1}</span>
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p className="service-copy">{service.copy}</p>
              <a className="service-link" href="#contact" data-cursor>
                Start a project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader index="03" label="Selected Work" title="Recent projects" />
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="project-wrap">
              <article className={`project-box project--${p.hue}`} data-cursor>
                <div className="project-media">
                  <span className="project-art" aria-hidden="true">
                    {p.num}
                  </span>
                </div>
                <div className="project-info">
                  <span className="project-tag">{p.tag}</span>
                  <div className="project-row">
                    <h3>{p.title}</h3>
                    <span className="project-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="project-desc">{p.desc}</p>
                  <ul className="project-stack">
                    {p.stack.map((tech) => (
                      <li key={tech} className="project-badge">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Sections() {
  return (
    <>
      <Stats />
      <Skills />
      <Services />
      <Projects />
    </>
  );
}
