"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Eye,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  achievements,
  certificates,
  community,
  experience,
  interests,
  navigation,
  profile,
  projects,
  research,
  skills,
  type Project,
} from "@/data/portfolio";

const filters = [
  "All",
  "AI/ML",
  "Full-Stack",
  "Research",
  "Computer Vision",
  "Generative AI",
  "Data Analytics",
] as const;

type Filter = (typeof filters)[number];

const socialLinks = [
  { label: "GitHub", href: profile.github, Icon: Github },
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
  { label: "Instagram", href: profile.instagram, Icon: Instagram },
];

function ExternalAnchor({
  href,
  children,
  className,
  label,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function SectionHeading({
  number,
  label,
  title,
  copy,
}: {
  number: string;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading reveal">
      <div className="section-kicker">
        <span>{number}</span>
        <span className="kicker-line" />
        {label}
      </div>
      <div className="heading-row">
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = document.querySelector(".project-dialog");
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleDialogKeys);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleDialogKeys);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <section
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="icon-button dialog-close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          autoFocus
        >
          <X size={19} />
        </button>
        <div className="dialog-kicker">{project.status}</div>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="dialog-summary">{project.details.objective}</p>
        <div className="dialog-section">
          <h3>What’s in the repository</h3>
          <ul>
            {project.details.implementation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="dialog-section">
          <h3>Engineering notes</h3>
          <ul>
            {project.details.decisions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="dialog-note">
          <strong>Scope &amp; limitations</strong>
          <p>{project.details.limitations}</p>
        </div>
        {project.technologies.length > 0 ? (
          <div className="tag-list dialog-tags">
            {project.technologies.map((technology) => (
              <span className="tag" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        ) : null}
        <ExternalAnchor
          className="text-link dialog-link"
          href={project.repository}
        >
          View repository <ExternalLink size={15} />
        </ExternalAnchor>
        {project.relatedProject ? (
          <ExternalAnchor
            className="text-link dialog-link related-project-link"
            href={project.relatedProject.repository}
          >
            Related project: {project.relatedProject.title}
            <ExternalLink size={15} />
          </ExternalAnchor>
        ) : null}
      </section>
    </div>
  );
}

function CertificateDialog({
  certificate,
  onClose,
}: {
  certificate: (typeof certificates)[number];
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="certificate-dialog"
      aria-labelledby="certificate-dialog-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="certificate-dialog-header">
        <div>
          <span className="dialog-kicker">{certificate.issuer}</span>
          <h2 id="certificate-dialog-title">{certificate.title}</h2>
          <p>{certificate.date}</p>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close certificate preview"
          autoFocus
        >
          <X size={19} />
        </button>
      </div>
      {certificate.documentType === "pdf" ? (
        <iframe
          className="certificate-frame"
          src={certificate.file}
          title={`${certificate.title} certificate document`}
        />
      ) : (
        <div className="certificate-image-frame">
          <Image
            src={certificate.file}
            alt={`${certificate.title} issued by ${certificate.issuer}`}
            fill
            sizes="(max-width: 800px) 100vw, 900px"
          />
        </div>
      )}
      <div className="certificate-dialog-footer">
        <span>Certificate document provided by Ishita</span>
        <a
          className="text-link"
          href={certificate.file}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in new tab <ExternalLink size={14} />
        </a>
      </div>
    </dialog>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] =
    useState<(typeof certificates)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(profile.theme);
  const [roleIndex, setRoleIndex] = useState(0);
  const [formMessage, setFormMessage] = useState("");

  const visibleProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.published &&
          (activeFilter === "All" ? true : project.categories.includes(activeFilter)),
      ),
    [activeFilter],
  );
  const displayedProjects =
    activeFilter === "All" && !showAllProjects
      ? visibleProjects.slice(0, 4)
      : visibleProjects;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll(".reveal")
        .forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeFilter, showAllProjects]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const roles = [
      "Software & AI",
      "Machine learning",
      "Full-stack products",
      "Data & research",
    ];
    const interval = window.setInterval(
      () => setRoleIndex((current) => (current + 1) % roles.length),
      4200,
    );
    return () => window.clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const body = `From: ${name} (${email})\n\n${message}`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setFormMessage(
      `Your email app should open with this message ready. If it doesn’t, email me directly at ${profile.email}.`,
    );
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#home" aria-label="Ishita Agrawal, home">
            <span className="brand-mark">i.</span>
            <span className="brand-name">ishita agrawal</span>
          </a>
          <nav
            id="mobile-navigation"
            className={`main-nav${menuOpen ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <a
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button theme-button"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a className="nav-connect" href="#contact">
              Let’s connect <ArrowUpRight size={15} />
            </a>
            <button
              className="icon-button menu-button"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow reveal">
              <span className="status-dot" />
              Fourth-year student · NIT Rourkela
            </div>
            <h1 className="reveal">
              Hi, I’m
              <br />
              <span className="hero-name">Ishita Agrawal</span>
              <span className="hero-period">.</span>
            </h1>
            <p className="hero-statement reveal">
              Learning by building at the intersection of{" "}
              <span className="role-line" aria-live="polite">
                <span className="rotating-role">
                  {["software & AI", "machine learning", "full-stack products", "data & research"][roleIndex]}
                </span>
                <span className="role-caret" aria-hidden="true" />
              </span>
            </p>
            <p className="hero-intro reveal">
              I like turning open-ended questions into useful things—whether
              that means exploring schedule disruptions, forecasting air
              quality, or shaping an idea into a product. I’m curious by
              nature, happiest when I’m learning something new, and always
              glad to build alongside people who care about the work.
            </p>
            <div className="hero-actions reveal">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowDownRight size={16} />
              </a>
              <a className="button button-quiet" href="#contact">
                Let’s connect <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-socials reveal">
              <span>Find me elsewhere</span>
              {socialLinks.map(({ label, href, Icon }) => (
                <ExternalAnchor href={href} label={label} key={label}>
                  <Icon size={17} />
                </ExternalAnchor>
              ))}
            </div>
          </div>
          <div className="hero-art reveal">
            <div className="portrait-frame">
              {profile.portrait ? (
                <Image
                  className="portrait-image"
                  src={profile.portrait}
                  alt="Ishita Agrawal at NIT Rourkela"
                  fill
                  priority
                  sizes="(max-width: 900px) 86vw, 40vw"
                />
              ) : (
                <span className="portrait-fallback" aria-hidden="true">
                  {profile.initials}
                </span>
              )}
              <div className="portrait-caption">
                <span>{profile.college}</span>
                <strong>{profile.name}</strong>
              </div>
            </div>
            <div className="portrait-note">
              <span className="portrait-note-mark"><Code2 size={17} /></span>
              <span>
                <strong>Learning by building</strong>
                <small>Software · AI · data</small>
              </span>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            Scroll to explore <ArrowDown size={14} />
          </a>
        </section>

        <section className="section-wrap about-section" id="about">
          <SectionHeading
            number="1"
            label="A little about me"
            title="Curiosity is usually where I start."
            copy="A builder, an explorer, and a person who likes a good conversation."
          />
          <div className="about-layout">
            <div className="about-story reveal">
              <p className="lead-copy">
                I’m Ishita, a fourth-year student at{" "}
                <strong>NIT Rourkela</strong> interested in the ways software,
                machine learning, and data can work together to solve practical
                problems.
              </p>
              <p>
                I’ve explored a mix of ideas through projects—from construction
                schedule analysis and air-quality forecasting to healthcare
                interfaces and computer vision. I enjoy the whole process:
                asking better questions, trying an approach, and learning what
                the details reveal.
              </p>
              <p>
                Away from a screen, I’m extroverted and curious. I like meeting
                people, trading ideas, trying new activities, enjoying music,
                and making time for martial arts. New experiences have a way of
                teaching me something unexpected.
              </p>
              <div className="education-note">
                <span className="education-icon">N</span>
                <span>
                  <strong>{profile.college}</strong>
                  <small>{profile.year} student</small>
                </span>
                <ArrowUpRight size={16} />
              </div>
            </div>
            <div className="enjoy-card reveal">
              <div className="enjoy-head">
                <span className="section-kicker">A few things I enjoy</span>
                <Sparkles size={18} />
              </div>
              <ul>
                {interests.map((interest, index) => (
                  <li key={interest}>
                    <span className="enjoy-number">{index + 1}</span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-wrap experience-section" id="experience">
          <SectionHeading
            number="2"
            label="Experience"
            title="Learning through real constraints."
            copy="The most useful lessons often show up between the plan and the real problem."
          />
          <div className="timeline">
            {experience
              .filter((item) => item.published)
              .map((item, index) => (
                <article className="timeline-item reveal" key={item.organization}>
                  <div className="timeline-marker">
                    <span>{index + 1}</span>
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-topline">
                      <span className="timeline-period">{item.period}</span>
                      <span className="timeline-location">{item.location}</span>
                    </div>
                    <h3>{item.organization}</h3>
                    <p className="timeline-role">{item.role}</p>
                    <p className="timeline-description">{item.description}</p>
                    <div className="timeline-bottom">
                      <div className="tag-list">
                        {item.technologies.map((technology) => (
                          <span className="tag" key={technology}>
                            {technology}
                          </span>
                        ))}
                      </div>
                      {item.repositoryPublic ? (
                        <ExternalAnchor
                          className="text-link"
                          href={item.repository}
                        >
                          View project <ArrowUpRight size={15} />
                        </ExternalAnchor>
                      ) : (
                        <span className="repository-note">
                          Backend contribution · Hirenext
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section className="section-wrap projects-section" id="projects">
          <SectionHeading
            number="3"
            label="Selected work"
            title="Projects that made me think."
            copy="A few projects I’ve enjoyed exploring. Open a case study to see how each one came together."
          />
          <div className="filter-row" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                className={`filter-chip${activeFilter === filter ? " active" : ""}`}
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {displayedProjects.map((project, index) => (
              <article
                className={`project-card reveal${index === 0 ? " project-card-featured" : ""}`}
                key={project.title}
                style={{ "--card-index": index } as React.CSSProperties}
              >
                <div className="project-card-top">
                  <span className="project-index">
                    {index + 1}
                  </span>
                  <ExternalAnchor
                    href={project.repository}
                    label={`Open ${project.title} repository`}
                    className="project-github"
                  >
                    <Github size={17} />
                  </ExternalAnchor>
                </div>
                <div className="project-card-body">
                  <span className="project-category">
                    {project.categories.slice(0, 2).join(" · ")}
                  </span>
                  <div className="project-card-heading">
                    <h3>{project.title}</h3>
                    {index === 0 ? (
                      <span className="featured-project-label">
                        Featured case study
                      </span>
                    ) : null}
                  </div>
                  <p>{project.summary}</p>
                </div>
                <div className="project-card-bottom">
                  <div className="tag-list">
                    {project.technologies.slice(0, 4).map((technology) => (
                      <span className="tag" key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>
                  <button
                    className="case-link"
                    type="button"
                    onClick={() => setSelectedProject(project)}
                  >
                    Case study <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {visibleProjects.length === 0 ? (
            <p className="empty-state">No projects in this category yet.</p>
          ) : null}
          {activeFilter === "All" && visibleProjects.length > 4 ? (
            <div className="projects-expand">
              <button
                className="button button-quiet"
                type="button"
                onClick={() => setShowAllProjects((showAll) => !showAll)}
              >
                {showAllProjects
                  ? "Show fewer projects"
                  : `Explore all ${visibleProjects.length} projects`}
                <ArrowDown size={14} />
              </button>
            </div>
          ) : null}
        </section>

        <section className="section-wrap skills-section" id="skills">
          <SectionHeading
            number="4"
            label="Tools I enjoy working with"
            title="What I use to bring ideas to life."
            copy="A mix of languages, frameworks, and libraries I’ve explored while building projects."
          />
          <div className="skills-grid">
            {skills.map((group, index) => (
              <article className="skill-card reveal" key={group.category}>
                <div className="skill-card-head">
                  <span className="skill-index">{index + 1}</span>
                  <Code2 size={17} />
                </div>
                <h3>{group.category}</h3>
                <div className="skill-pills">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap research-section" id="research">
          <SectionHeading
            number="5"
            label="Research & applied AI"
            title="Forecasting what comes next."
            copy="A practical time-series exploration grounded in local air-quality observations."
          />
          <div className="research-panel reveal">
            <div className="research-copy">
              <span className="research-label">
                <span className="status-dot" /> PM2.5 / PM10 · time-series
              </span>
              <h3>{research.title}</h3>
              <p>{research.context}</p>
              <div className="station-note">
                <span>Study location</span>
                <strong>{research.station}</strong>
              </div>
              <div className="station-note">
                <span>Evaluation window</span>
                <strong>{research.evaluation}</strong>
              </div>
              <ExternalAnchor
                href={research.repository}
                className="button button-primary research-button"
              >
                Explore the research <ArrowUpRight size={16} />
              </ExternalAnchor>
            </div>
            <div className="research-flow">
              <span className="flow-label">Forecasting workflow</span>
              <div className="flow-list">
                {research.steps.map((step, index) => (
                  <div className="flow-step" key={step}>
                    <span className="flow-number">{index + 1}</span>
                    <span>{step}</span>
                    {index < research.steps.length - 1 ? (
                      <ChevronDown className="flow-chevron" size={15} />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="model-row">
                <span>Models compared</span>
                {research.models.map((model) => (
                  <span className="model-tag" key={model}>
                    {model}
                  </span>
                ))}
              </div>
              <p className="research-caveat">
                This study looks for patterns in past readings; it doesn’t explain
                what causes pollution levels to change.
              </p>
            </div>
          </div>
        </section>

        <section className="section-wrap achievement-section" id="achievements">
          <SectionHeading
            number="6"
            label="Achievements & community"
            title="A few milestones, and plenty of people."
            copy="Competition is a good way to practice thinking on your feet—and collaboration makes the learning richer."
          />
          <div className="achievement-grid">
            {achievements.map((achievement) => (
              <article className="achievement-card reveal" key={achievement.event}>
                <span className="achievement-icon">
                  <Award size={21} />
                </span>
                <span className="achievement-event">{achievement.event}</span>
                <h3>{achievement.title}</h3>
                <p>A problem-solving milestone and a chance to learn through competition.</p>
                <span className="achievement-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </article>
            ))}
          </div>
          <div className="community-panel reveal">
            <div className="community-intro">
              <span className="section-kicker">Beyond code</span>
              <h3>Good work is rarely done alone.</h3>
              <p>
                I enjoy meeting people, sharing ideas, mentoring, and taking on
                projects that stretch what I know.
              </p>
            </div>
            <div className="community-roles">
              {community.map((item) => (
                <div className="community-role" key={item.title}>
                  <span className="community-check">
                    <Check size={15} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    {item.detail ? <small>{item.detail}</small> : null}
                  </span>
                  <ArrowUpRight size={15} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap certificate-section" id="certificates">
          <SectionHeading
            number="7"
            label="Certificates"
            title="Learning, documented."
            copy="A few milestones from internships, training, and events."
          />
          {certificates.some((certificate) => certificate.title && certificate.file) ? (
            <div className="certificate-grid">
              {certificates
                .filter((certificate) => certificate.title && certificate.file)
                .map((certificate) => (
                  <article
                    className="certificate-card reveal"
                    key={certificate.title}
                  >
                    <Award size={20} />
                    {certificate.documentType === "image" ? (
                      <div className="certificate-thumbnail">
                        <Image
                          src={certificate.file}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 85vw, 40vw"
                        />
                      </div>
                    ) : null}
                    <h3>{certificate.title}</h3>
                    <p>{certificate.issuer}</p>
                    <span className="certificate-date">{certificate.date}</span>
                    <div className="certificate-actions">
                      <button
                        className="text-link"
                        type="button"
                        onClick={() => setSelectedCertificate(certificate)}
                      >
                        Preview <Eye size={14} />
                      </button>
                      <a
                        className="text-link"
                        href={certificate.file}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open certificate <ExternalLink size={14} />
                      </a>
                    </div>
                  </article>
                ))}
            </div>
          ) : (
            <div className="certificate-empty reveal">
              <span className="certificate-mark">
                <Award size={21} />
              </span>
              <p>
                Certificate documents and official verification links are not
                available yet.
              </p>
            </div>
          )}
        </section>

        <section className="section-wrap contact-section" id="contact">
          <SectionHeading
            number="8"
            label="Contact"
            title="Have an idea? Let’s build something meaningful."
            copy="I’m always happy to connect with people who enjoy building, experimenting, and exploring new ideas."
          />
          <div className="contact-layout">
            <div className="contact-copy reveal">
              <p>
                Whether you’re recruiting, working on an interesting project,
                or simply curious to exchange ideas, I’d love to hear from you.
              </p>
              <a className="email-card" href={`mailto:${profile.email}`}>
                <span className="email-icon">
                  <Mail size={20} />
                </span>
                <span>
                  <small>Write me an email</small>
                  <strong>{profile.email}</strong>
                </span>
                <ArrowUpRight size={17} />
              </a>
              <div className="contact-socials">
                {socialLinks.map(({ label, href, Icon }) => (
                  <ExternalAnchor
                    href={href}
                    label={label}
                    key={label}
                    className="social-link"
                  >
                    <Icon size={17} />
                    {label}
                    <ArrowUpRight size={13} />
                  </ExternalAnchor>
                ))}
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    autoComplete="name"
                    maxLength={120}
                    name="name"
                    placeholder="Name"
                    required
                  />
                </label>
                <label>
                  Email address
                  <input
                    autoComplete="email"
                    maxLength={254}
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </label>
              </div>
              <label>
                Subject
                <input
                  maxLength={160}
                  name="subject"
                  placeholder="What’s on your mind?"
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  maxLength={5000}
                  name="message"
                  placeholder="Tell me a little about it..."
                  required
                  rows={5}
                />
              </label>
              <button className="button button-primary form-submit" type="submit">
                Open email draft <ArrowUpRight size={16} />
              </button>
              <p className="form-helper" aria-live="polite">
                {formMessage ||
                  "This form opens your email app with a draft. Nothing is sent or stored by this website."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark">i.</span>
            <span className="brand-name">ishita agrawal</span>
          </a>
          <p>Learning by building. Growing by connecting.</p>
          <a className="back-top" href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ishita Agrawal</span>
          <div className="footer-links">
            {navigation.slice(0, 5).map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <span>Made with curiosity <span aria-hidden="true">✳</span></span>
        </div>
      </footer>

      {selectedProject ? (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}

      {selectedCertificate ? (
        <CertificateDialog
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      ) : null}

      <a className="floating-mail" href={`mailto:${profile.email}`} aria-label="Email Ishita">
        <Mail size={18} />
      </a>
    </div>
  );
}
