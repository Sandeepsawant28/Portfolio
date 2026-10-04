import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import FolderFloat from './components/FolderFloat';
import sandeepImg from './assets/sandeep.png';
import seedsImg from './assets/seeds-installation.jpg';
import gecRoboticsImg from './assets/gec-robotics.jpg';
import torqueAwardImg from './assets/torque-expo-1st-place.jpg';
import scapadeExpoImg from './assets/scapade-national-expo.jpg';
import researchInternshipImg from './assets/research-internship.jpg';
import hockeyTeamImg from './assets/inter-college-hockey.jpg';

const FIRST_NAME = 'Sandeep';
const LAST_NAME = 'Sawant';
const STATEMENT_WORDS = "I build things end to end: from the model that listens to a farmer speaking Konkani, to the web app people actually open.".split(' ');
const BIG_NAME = 'Sandeep Sawant';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'SEEDS Installation Ceremony',
    role: 'Executive Member · Student Council',
    event: 'Don Bosco College of Engineering',
    tag: 'Executive Council',
    colClass: 'col-6',
    src: seedsImg,
    alt: 'SEEDS Installation Ceremony - Sandeep Sawant as Executive Member with council and faculty',
    desc: 'Inducted as an Executive Member of SEEDS, the first-year student council at Don Bosco College of Engineering. Actively contributed to organizing sports competitions, cultural festivals, and technical & teaching sessions for students.',
  },
  {
    id: 2,
    title: 'Robotics Event at GEC',
    role: 'Robotics Competitor & Team Lead',
    event: 'Spectrum · Goa College of Engineering',
    tag: 'Robotics & Hardware',
    colClass: 'col-6',
    src: gecRoboticsImg,
    alt: 'Spectrum Robotics Event at Goa College of Engineering - Sandeep with robotics team and bots',
    desc: 'Competed at the Spectrum robotics competition at Goa College of Engineering (GEC). Engineered and tuned bot chassis, motor controllers, and sensor arrays for high-speed obstacle navigation and technical time-trials.',
  },
  {
    id: 3,
    title: '1st Place · Project Expo (TORQUE 2026)',
    role: '1st Prize Winner · Lead Developer',
    event: 'Dept. of Mechanical Engineering · GEC',
    tag: '1st Place Winner',
    featured: true,
    colClass: 'col-6',
    src: torqueAwardImg,
    alt: 'Award Ceremony at TORQUE 2026 - Sandeep Sawant receiving 1st Place Trophy and Certificate at GEC',
    desc: 'Awarded 1st Place at the prestigious state-level Project Expo during TORQUE 2026, organized by the Department of Mechanical Engineering Students\' Association at Goa College of Engineering (GEC), recognized for technical innovation and engineering excellence.',
  },
  {
    id: 4,
    title: 'Runners-Up · National Project Expo (S-CAPADE XI)',
    role: 'Runners-Up · Lead Presenter & Developer',
    event: 'S-CAPADE XI · Rosary College',
    tag: 'National Runners-Up',
    featured: true,
    colClass: 'col-6',
    src: scapadeExpoImg,
    alt: 'S-CAPADE XI National Level IT Project Exhibition - Sandeep Sawant presenting project and winning Runners-Up at Rosary College',
    desc: 'Awarded Runners-Up at S-CAPADE XI, a prestigious National Level IT Project Exhibition organized by the Department of Computer Applications at Rosary College of Commerce & Arts. Showcased and demonstrated project innovations to an expert evaluation panel.',
  },
  {
    id: 5,
    title: 'AI/ML Speech Research Internship',
    role: 'AI/ML Research Intern',
    event: 'Vidyaapati Project · Goa University',
    tag: 'Research Lab',
    colClass: 'col-6',
    src: researchInternshipImg,
    alt: 'Vidyaapati Project AI/ML Research Team at Goa University Lab',
    desc: 'Working with the research cohort at Goa University under the Vidyaapati Project. Spearheaded the curation of a 2.9-hour Konkani farmer speech dataset (1,916 sentences) and fine-tuned Whisper-small with LoRA to drop WER from 95.49% to 23.61%.',
  },
  {
    id: 6,
    title: 'Inter-College Hockey Team',
    role: 'College Team Player · Varsity Squad',
    event: 'Inter-Collegiate Hockey Championship',
    tag: 'Varsity Athletics',
    colClass: 'col-6',
    src: hockeyTeamImg,
    alt: 'Don Bosco College of Engineering Inter-College Hockey Team Squad on astroturf turf',
    desc: 'Representing Don Bosco College of Engineering in the Inter-Collegiate Hockey Championship on astroturf turf. Bringing intense dedication, rapid tactical coordination, athletic stamina, and team camaraderie beyond the engineering desk.',
  },
];

export function App() {
  const defaultRepos = [
    { label: 'DBCE Futsal League (Live)', value: 'https://dbce-futsal-league-5.onrender.com' },
    { label: 'UniFire Registry (Live)', value: 'https://fire-extinguisher-1.onrender.com/' },
    { label: 'Agentic RAG (RepoPilot)', value: 'https://github.com/Sandeepsawant28/Agnetic_RAG' },
    { label: 'Konkani Whisper ASR', value: 'https://huggingface.co/sandeepsawant28/whisper-small-konkani-numbers' },
    { label: 'Canopy (Eco Travel)', value: 'https://github.com/Sandeepsawant28/Canopy' },
    { label: 'E-Learning Platform', value: 'https://github.com/Sandeepsawant28/E-Learning' },
    { label: 'Portfolio Website', value: 'https://github.com/Sandeepsawant28/Portfolio' },
    { label: 'AI Surveillance YOLOv8', value: 'https://github.com/Sandeepsawant28' },
  ];

  const [repos, setRepos] = useState(defaultRepos);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  const scrollWork = (direction) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll('.card');
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth + (window.innerWidth * 0.025);
    trackRef.current.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const ratio = Math.max(0, Math.min(1, scrollLeft / maxScroll));
    const idx = Math.min(5, Math.max(0, Math.round(ratio * 5)));
    setActiveWorkIndex(idx);
  };

  const handleMouseDown = (e) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.pageX - trackRef.current.offsetLeft;
    dragStartScrollRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.5;
    trackRef.current.scrollLeft = dragStartScrollRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e) => {
    if (!trackRef.current) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const tr = trackRef.current;
    const atStart = tr.scrollLeft <= 5 && e.deltaY < 0;
    const atEnd = tr.scrollLeft >= tr.scrollWidth - tr.clientWidth - 5 && e.deltaY > 0;
    if (!atStart && !atEnd) {
      e.preventDefault();
      tr.scrollLeft += e.deltaY * 0.85;
    }
  };

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
    document.body.style.overflow = '';
  };

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  // Fetch live repositories from GitHub
  useEffect(() => {
    fetch('https://api.github.com/users/Sandeepsawant28/repos?sort=updated&per_page=10')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const liveDeployments = [
            { label: 'DBCE Futsal League (Live)', value: 'https://dbce-futsal-league-5.onrender.com' },
            { label: 'UniFire Registry (Live)', value: 'https://fire-extinguisher-1.onrender.com/' },
            { label: 'Agentic RAG (RepoPilot)', value: 'https://github.com/Sandeepsawant28/Agnetic_RAG' },
            { label: 'Konkani Whisper ASR', value: 'https://huggingface.co/sandeepsawant28/whisper-small-konkani-numbers' },
          ];
          const fetched = data
            .filter((r) => !r.fork && r.name !== 'Agnetic_RAG')
            .map((r) => ({
              label: r.name,
              value: r.html_url,
            }));
          setRepos([...liveDeployments, ...fetched]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (RM) {
      const l = $('.loader');
      if (l) l.remove();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* smooth scroll */
    let lenis = null;
    let tickerFn = null;
    try {
      lenis = new Lenis({ lerp: 0.09 });
      lenis.on('scroll', ScrollTrigger.update);
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      $$('a[href^="#"]').forEach((a) =>
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const target = a.getAttribute('href');
          if (target && lenis) {
            lenis.scrollTo(target, { duration: 1.5 });
          }
        })
      );

      let hidden = false;
      lenis.on('scroll', ({ scroll, direction }) => {
        const h = direction === 1 && scroll > 300;
        if (h !== hidden) {
          hidden = h;
          gsap.to('.nav', { yPercent: h ? -130 : 0, duration: 0.5, ease: 'power3.out' });
        }
      });
    } catch {
      // fallback
    }

    const cnt = { v: 0 };
    const lc = $('.lc');
    gsap
      .timeline()
      .to(cnt, {
        v: 100,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (lc) lc.textContent = Math.round(cnt.v);
        },
      })
      .to('.loader', { yPercent: -100, duration: 0.7, ease: 'expo.inOut' }, '+=.05')
      .fromTo('.name span.l', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', clearProps: 'all' }, '-=.3')
      .fromTo('.facts p, .hero-foot', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'all' }, '-=.5')
      .add(() => {
        const l = $('.loader');
        if (l) l.remove();
      });

    gsap.to('.name', {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.bar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

    gsap.fromTo(
      $$('.statement .wd'),
      { opacity: 0.15 },
      { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 80%', end: 'bottom 50%', scrub: true } }
    );

    $$('.stat b').forEach((b) => {
      const o = { v: 0 };
      gsap.to(o, {
        v: +b.dataset.n,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: b, start: 'top 90%', once: true },
        onUpdate: () => {
          const d = +b.dataset.d || 0;
          if (b.firstChild) {
            b.firstChild.nodeValue = o.v.toLocaleString('en-US', {
              minimumFractionDigits: d,
              maximumFractionDigits: d,
            });
          }
        },
      });
    });

    const mm = gsap.matchMedia();
    mm.add('(min-width:800px)', () => {
      const tr = $('.track');
      const work = $('.work');
      if (!tr || !work) return;

      // Force the layout this animation needs, so it doesn't depend on CSS
      tr.style.display = 'flex';
      tr.style.flexWrap = 'nowrap';
      tr.style.width = 'max-content';
      $$('.card', tr).forEach((c) => {
        c.style.flexShrink = '0';
      });

      const getDistance = () =>
        Math.max(0, tr.scrollWidth - window.innerWidth + window.innerWidth * 0.05);

      gsap.to(tr, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: work,
          start: 'top top',
          end: () => '+=' + Math.max(400, getDistance()),
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tr.style.removeProperty('display');
        tr.style.removeProperty('flex-wrap');
        tr.style.removeProperty('width');
        $$('.card', tr).forEach((c) => c.style.removeProperty('flex-shrink'));
      };
    });

    mm.add('(max-width:799px)', () => {
      gsap.from('.card', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: { trigger: '.track', start: 'top 80%' },
      });
    });

    $$('.rule').forEach((r) =>
      gsap.from(r, {
        scaleX: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: r, start: 'top 92%' },
      })
    );

    /* Re-measure once fonts and images have loaded (fixes the horizontal
       scroll not moving on deployed sites like GitHub Pages) */
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t1 = setTimeout(refresh, 600);
    const t2 = setTimeout(refresh, 1800);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    $$('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true });
    });

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      mm.revert();
      if (lenis) {
        if (tickerFn) gsap.ticker.remove(tickerFn);
        lenis.destroy();
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.set(['.name span.l', '.facts p', '.hero-foot', '.contact h2', '.big', '.gallery-card'], { clearProps: 'all' });
    };
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="bar"></div>

      {/* Intro Curtain Loader */}
      <div className="loader">
        <span>Sandeep Sawant</span>
        <span className="lc">0</span>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <a className="logo" href="#top">
          Sandeep Sawant
        </a>
        <div className="links">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#repos">Repos</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="top">
        <aside className="facts">
          <p>Based in Goa, India</p>
          <p>BE Computer, Don Bosco College of Engineering, 2026</p>
          <p>Full-stack, AI/ML, speech recognition</p>
          <p>Open to software engineering roles</p>
        </aside>

        <h1 className="name" aria-label="Sandeep Sawant">
          <span className="l l1">Sandeep</span>
          <span className="l l2">Sawant</span>
        </h1>

        <div className="hero-foot">
          <p>
            Final-year <b>Computer Engineering</b> student. Full-stack developer and AI/ML research intern fine-tuning speech recognition models.
          </p>
        </div>
      </header>

      {/* Skewing Ticker Marquee */}
      <div className="marq" aria-hidden="true">
        <div className="mt">
          <span>Full-stack / React / Node.js / Whisper + LoRA / Speech recognition / Computer vision / </span>
          <span>Full-stack / React / Node.js / Whisper + LoRA / Speech recognition / Computer vision / </span>
        </div>
      </div>

      {/* About Section */}
      <section className="about" id="about">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '6vw', alignItems: 'center' }}>
          <div>
            <div
              style={{
                width: '100%',
                maxWidth: '560px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--line)',
                boxShadow: '0 20px 40px -20px rgba(0,0,0,0.15)',
              }}
            >
              <img
                src={sandeepImg}
                alt="Sandeep Sawant"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div>
            <p className="statement">
              {STATEMENT_WORDS.map((w, i) => (
                <span className="wd" key={i}>
                  {w}&nbsp;
                </span>
              ))}
            </p>

            {/* Live Counters */}
            <div className="stats">
              <div className="stat">
                <b data-n="8.1" data-d="2">0</b>
                <span>BE Computer CGPA (Don Bosco College of Eng.)</span>
              </div>
              <div className="stat">
                <b data-n="80.02" data-d="2">
                  0<i>%</i>
                </b>
                <span>HSSC Higher Secondary (Rosary HSS)</span>
              </div>
              <div className="stat">
                <b data-n="83.83" data-d="2">
                  0<i>%</i>
                </b>
                <span>SSC Secondary School (Rosary High)</span>
              </div>
              <div className="stat">
                <b data-n="5" data-d="0">
                  0<i>+</i>
                </b>
                <span>Full-Stack & AI Production Projects Built</span>
              </div>
              <div className="stat">
                <b data-n="10" data-d="0">
                  0<i>+</i>
                </b>
                <span>Modern Frameworks & Tech Stacks Mastered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Pinned Track: Selected Works */}
      <section className="work" id="work">
        <h2>Selected work</h2>
        <div className="track">
          {/* Project 1: Konkani Farmer ASR */}
          <article className="card">
            <div className="art">Whisper + LoRA</div>
            <h3>
              Konkani Farmer ASR <span>2026</span>
            </h3>
            <p>
              AI Farmer Assistant: a 2.9-hour agricultural Konkani speech dataset from 42 volunteers and a Whisper-small LoRA model, with WER cut from 95.49% to 23.61%. Co-authored a research paper.{' '}
              <a
                className="u"
                href="https://huggingface.co/sandeepsawant28/whisper-small-konkani-numbers"
                target="_blank"
                rel="noreferrer"
              >
                Numerals model on Hugging Face
              </a>
            </p>
            <div className="tags">
              <em>Whisper</em>
              <em>LoRA</em>
              <em>Hugging Face</em>
              <em>Python</em>
            </div>
          </article>

          {/* Project 2: DBCE Futsal League Auction */}
          <article className="card">
            <div className="art">React + Node · Live</div>
            <h3>
              DBCE Futsal League <span>Live App</span>
            </h3>
            <p>
              Full-stack real-time player auction and team bidding platform engineered for the Don Bosco College of Engineering Futsal League. Live budget tracking, roster creation, and player profiles.{' '}
              <a
                className="u"
                href="https://dbce-futsal-league-5.onrender.com"
                target="_blank"
                rel="noreferrer"
              >
                Launch App (Render) ↗
              </a>
            </p>
            <div className="tags">
              <em>React</em>
              <em>Node.js</em>
              <em>Live Auction</em>
              <em>Render</em>
            </div>
          </article>

          {/* Project 3: UniFire Registry */}
          <article className="card">
            <div className="art">React + Safety · Live</div>
            <h3>
              UniFire Registry <span>Live App</span>
            </h3>
            <p>
              Fire safety compliance and extinguisher tracking registry. Facilitates scheduled maintenance records, periodic inspection workflows, safety audit logs, and instant CSV reporting.{' '}
              <a
                className="u"
                href="https://fire-extinguisher-1.onrender.com/"
                target="_blank"
                rel="noreferrer"
              >
                Launch App (Render) ↗
              </a>
            </p>
            <div className="tags">
              <em>React</em>
              <em>Management System</em>
              <em>Audit Trail</em>
              <em>Render</em>
            </div>
          </article>

          {/* Project 4: Canopy */}
          <article className="card">
            <div className="art">React + Node</div>
            <h3>
              Canopy <span>Full-stack</span>
            </h3>
            <p>
              Eco-friendly travel planner. Hotels get an EcoScore, travelers earn points and badges, with GPT-4o itineraries, Stripe carbon offsets and Google Maps.{' '}
              <a
                className="u"
                href="https://github.com/Sandeepsawant28/Canopy"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </p>
            <div className="tags">
              <em>React (Vite)</em>
              <em>Node.js</em>
              <em>Supabase</em>
              <em>OpenAI</em>
              <em>Stripe</em>
            </div>
          </article>

          {/* Project 5: E-Learning Platform */}
          <article className="card">
            <div className="art">PHP + MySQL</div>
            <h3>
              E-Learning Platform <span>Full-stack</span>
            </h3>
            <p>
              Course platform with role-based access for students and admins, a quiz system with automated scoring, course management and progress tracking.{' '}
              <a
                className="u"
                href="https://github.com/Sandeepsawant28/E-Learning"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </p>
            <div className="tags">
              <em>PHP</em>
              <em>MySQL</em>
              <em>JavaScript</em>
            </div>
          </article>

          {/* Project 6: RepoPilot (Code Q&A) */}
          <article className="card">
            <div className="art">Agentic RAG</div>
            <h3>
              RepoPilot (Code Q&A) <span>2026</span>
            </h3>
            <p>
              Ask a codebase questions in plain English and get answers grounded in the retrieved code, with file references. Built around an eval harness: on 27 questions, vector search reached 96% recall@6 (hybrid 93%), and a general cross-encoder reranker lowered it to 81%, so it is off by default. Query rewriting and an agent loop for multi-file questions are in progress.{' '}
              <a
                className="u"
                href="https://github.com/Sandeepsawant28/Agnetic_RAG"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </p>
            <div className="tags">
              <em>RAG</em>
              <em>Hybrid search (RRF)</em>
              <em>Evals</em>
              <em>FastAPI</em>
              <em>Python</em>
            </div>
          </article>
        </div>
      </section>

      {/* Interactive GitHub Floating Dossier (FolderFloat from React Bits) */}
      <section
        id="repos"
        style={{
          padding: '14vh 5vw 10vh',
          textAlign: 'center',
          background: 'var(--bg)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto 5vh' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              color: 'var(--acc)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Live GitHub Repositories
          </span>
          <h2
            style={{
              font: "800 clamp(2.2rem, 5.5vw, 4.5rem)/1.02 'Bricolage Grotesque', sans-serif",
              letterSpacing: '-0.03em',
              marginTop: '12px',
              color: 'var(--ink)',
            }}
          >
            Hover or click to unpack my repositories.
          </h2>
        </div>

        {/* FolderFloat Component Container */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            minHeight: '380px',
            paddingBottom: '20px',
          }}
        >
          <FolderFloat
            items={repos}
            label="Sandeep's Repos"
            sublabel={`${repos.length} public repos`}
            trigger="hover"
            physics={true}
            drift={0.5}
            width={240}
            height={160}
            radius={8}
            spread={220}
            lift={32}
            tilt={8}
            flapAngle={36}
            restAngle={16}
            folderColor="#14181F"
            frontColor="#1e232d"
            paperColor="#F2EFE8"
            itemColor="#FFFFFF"
            itemTextColor="#14181F"
            labelColor="#FFCF3F"
            onSelect={(url) => {
              if (url && typeof url === 'string') {
                window.open(url, '_blank');
              }
            }}
          />
        </div>
      </section>

      {/* Experience Section */}
      <section className="svcs" id="experience">
        <h2>Experience</h2>
        <div className="svc">
          <span className="rule"></span>
          <h3>
            AI/ML Research Intern
            <small>
              Vidyaapati Project, Goa University
              <br />
              Aug 3 to Sep 25, 2026
            </small>
          </h3>
          <ul>
            <li>Built a 2.9-hour agricultural Konkani speech dataset (1,916 validated sentences, 42 volunteers) annotated by dialect, script, topic and recording condition.</li>
            <li>Fine-tuned Whisper-small with LoRA: WER 95.49% to 23.61%, CER 84.45% to 8.07% on a held-out set.</li>
            <li>Benchmarked Wav2Vec2-XLSR and MMS-1B-all on the same data. Neither gave usable output, which confirmed Whisper.</li>
            <li>Published a Whisper-small model for Konkani spoken numerals (1 to 100) on Hugging Face.</li>
            <li>Built a live voice-transcription prototype (Vercel frontend, hosted model backend). INT8 quantization still ran out of memory on free CPU hosting, so reliable deployment needs a GPU.</li>
            <li>Co-authored a research paper on Konkani speech resources and the dataset.</li>
          </ul>
        </div>
      </section>

      {/* Moments & Milestones Gallery Section */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <span className="gallery-tag">Photographic Record · Highlights</span>
          <h2 className="gallery-title">Moments &amp; Milestones</h2>
          <p className="gallery-lead">
            Visual records spanning executive student council leadership, 1st place &amp; national runner-up project expo honors, speech AI research labs, robotics tracks, and varsity athletics.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, idx) => (
            <article
              key={item.id}
              className={`gallery-card ${item.colClass}`}
              onClick={() => openLightbox(idx)}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(idx);
                }
              }}
            >
              <div className="gallery-img-box">
                <span className={`gallery-badge ${item.featured ? 'featured' : ''}`}>
                  {item.tag}
                </span>
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span className="gallery-zoom-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                  Click to Expand
                </span>
              </div>
              <div className="gallery-card-body">
                <div className="gallery-meta">
                  <span>{item.event}</span>
                  <span>{item.role}</span>
                </div>
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="gallery-lightbox-overlay" onClick={closeLightbox}>
          <div
            className="gallery-lightbox-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="gallery-lightbox-top">
              <span className="gallery-lightbox-counter">
                {`Milestone ${activePhotoIndex + 1} of ${GALLERY_ITEMS.length} · ${GALLERY_ITEMS[activePhotoIndex].tag}`}
              </span>
              <button
                className="gallery-lightbox-close"
                onClick={closeLightbox}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="gallery-lightbox-view">
              <button
                className="gallery-lightbox-nav prev"
                onClick={prevPhoto}
                aria-label="Previous photograph"
              >
                ‹
              </button>

              <img
                src={GALLERY_ITEMS[activePhotoIndex].src}
                alt={GALLERY_ITEMS[activePhotoIndex].alt}
              />

              <button
                className="gallery-lightbox-nav next"
                onClick={nextPhoto}
                aria-label="Next photograph"
              >
                ›
              </button>
            </div>

            <div className="gallery-lightbox-details">
              <div className="gallery-lightbox-details-head">
                <h3 className="gallery-lightbox-title">
                  {GALLERY_ITEMS[activePhotoIndex].title}
                </h3>
                <span className={`gallery-badge ${GALLERY_ITEMS[activePhotoIndex].featured ? 'featured' : ''}`}>
                  {GALLERY_ITEMS[activePhotoIndex].tag}
                </span>
              </div>
              <div style={{ color: 'var(--mute)', fontSize: '0.9rem', marginBottom: '10px' }}>
                <b>{GALLERY_ITEMS[activePhotoIndex].role}</b> · {GALLERY_ITEMS[activePhotoIndex].event}
              </div>
              <p className="gallery-lightbox-desc">
                {GALLERY_ITEMS[activePhotoIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      <section className="svcs" id="skills">
        <h2>Skills</h2>
        <div className="svc">
          <span className="rule"></span>
          <h3>Full-stack web</h3>
          <p>React (Vite), Tailwind CSS, Node.js (Express), PHP, REST APIs, HTML, CSS, JavaScript.</p>
        </div>
        <div className="svc">
          <span className="rule"></span>
          <h3>AI / ML</h3>
          <p>Whisper (LoRA fine-tuning), Hugging Face, NLP, YOLOv8, OpenCV, Scikit-learn, NumPy, Pandas, Matplotlib, WER/CER evaluation, model quantization.</p>
        </div>
        <div className="svc">
          <span className="rule"></span>
          <h3>Databases</h3>
          <p>MySQL, PostgreSQL (Supabase), MongoDB.</p>
        </div>
        <div className="svc">
          <span className="rule"></span>
          <h3>Languages and tools</h3>
          <p>C, C++, Java, Python, JavaScript, PHP. Git/GitHub, VS Code, Postman, Docker, Vercel, Render, Google Colab.</p>
        </div>
      </section>

      {/* Awards and activities Section */}
      <section className="svcs" id="awards">
        <h2>Awards and activities</h2>
        <div className="svc">
          <span className="rule"></span>
          <h3>Runner-Up, S-Capade XI</h3>
          <p>2nd place at a national level project exhibition.</p>
        </div>
        <div className="svc">
          <span className="rule"></span>
          <h3>1st Place, Idea Generation</h3>
          <p>Won the competition organized by the E-Cell, Don Bosco College of Engineering.</p>
        </div>
        <div className="svc">
          <span className="rule"></span>
          <h3>Best Student Volunteer</h3>
          <p>Awarded in higher secondary for contribution to institutional events.</p>
        </div>
        <div className="svc">
          <span className="rule"></span>
          <h3>Beyond code</h3>
          <p>
            Inter-College Hockey Championship player. Built the{' '}
            <a
              className="u"
              href="https://dbce-futsal-league-5.onrender.com"
              target="_blank"
              rel="noreferrer"
            >
              DBCE Futsal League auction website (Live)
            </a>
            . Developed the{' '}
            <a
              className="u"
              href="https://fire-extinguisher-1.onrender.com/"
              target="_blank"
              rel="noreferrer"
            >
              UniFire Registry system (Live)
            </a>
            . Robo Race participant. Quiz in-charge for Exquizite (Inspirus 9). Volunteer at a robotics event, Kala Academy, Goa.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section className="svcs" id="education">
        <h2>Education</h2>
        <div className="svc">
          <span className="rule"></span>
          <h3>BE Computer</h3>
          <p>Don Bosco College of Engineering, 2026 (pursuing). CGPA 8.10.</p>
        </div>
        <div className="svc">
          <span className="rule"></span>
          <h3>HSSC</h3>
          <p>Rosary Higher Secondary School, 2023. 80.02%.</p>
        </div>
        <div className="svc">
          <span className="rule"></span>
          <h3>SSC</h3>
          <p>Rosary High School, 2021. 83.83%.</p>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <footer className="contact" id="contact">
        <h2>Let's build something that works.</h2>
        <a className="btn" href="mailto:sandeepsawant604@gmail.com">
          sandeepsawant604@gmail.com
        </a>
        <div className="foot">
          <span>Goa, India · +91-9552885824 · Open to software engineering roles</span>
          <span>
            <a href="https://github.com/Sandeepsawant28" target="_blank" rel="noreferrer">
              GitHub
            </a>
            {' '}&nbsp;{' '}
            <a href="https://linkedin.com/in/sandeep-sawant28" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </span>
        </div>
        <div className="big" aria-label="Sandeep Sawant">
          Sandeep Sawant
        </div>
      </footer>
    </>
  );
}

export default App;
