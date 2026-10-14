
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Github,
  Linkedin,
  Sparkles,
  Zap,
} from 'lucide-react'
import { profile, projects, skillGroups } from '../data'
import ProjectCard from '../components/ProjectCard'

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: `${(i % 8) * 0.35}s`,
  duration: `${4 + (i % 6)}s`,
  size: i % 5 === 0 ? 4 : 2,
}))

const titleTransition = {
  duration: 0.45,
  ease: 'easeOut',
}

function GlitchText({ text, delay = 0 }) {
  return (
    <span className="cyber-word" aria-label={text}>
      {Array.from(text).map((char, index) => (
        <motion.span
          className="cyber-letter"
          key={`${char}-${index}`}
          aria-hidden="true"
          initial={{
            opacity: 0,
            y: 35,
            rotateX: -75,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            ...titleTransition,
            delay: delay + index * 0.045,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

const reveal = {
  hidden: { opacity: 0, y: 45, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: 'easeOut' },
  },
}

export default function Home() {
  const heroRef = useRef(null)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const smoothX = useSpring(pointerX, {
    stiffness: 65,
    damping: 20,
    mass: 0.6,
  })

  const smoothY = useSpring(pointerY, {
    stiffness: 65,
    damping: 20,
    mass: 0.6,
  })

  const glowX = useTransform(smoothX, [-1, 1], ['-15%', '115%'])
  const glowY = useTransform(smoothY, [-1, 1], ['-15%', '115%'])
  const avatarRotateX = useTransform(smoothY, [-1, 1], [10, -10])
  const avatarRotateY = useTransform(smoothX, [-1, 1], [-14, 14])

  function handleMouseMove(event) {
    if (!heroRef.current) return

    const rect = heroRef.current.getBoundingClientRect()

    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  function handleMouseLeave() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <>
      <section
        className="hero section-wrap cyber-hero"
        id="top"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cyber-grid-overlay" aria-hidden="true" />

        <motion.div
          className="cyber-cursor-glow"
          style={{ left: glowX, top: glowY }}
          aria-hidden="true"
        />

        <div className="cyber-particles" aria-hidden="true">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="cyber-particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div className="hero-copy cyber-hero-copy">
          <motion.div
            className="profile-orbit"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="profile-orbit-ring orbit-a" />
            <div className="profile-orbit-ring orbit-b" />
            <div className="profile-orbit-ring orbit-c" />

            <motion.div
              className="profile-3d-frame"
              style={{ rotateX: avatarRotateX, rotateY: avatarRotateY }}
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } }}
              whileHover={{ scale: 1.045 }}
            >
              <motion.img
                src="/profile.png"
                alt="Ashutosh Kumar Sharma"
                className="profile-photo home-profile"
                initial={{ opacity: 0, scale: 0.65, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.2 }}
              />
            </motion.div>

            <span className="orbit-spark spark-one" />
            <span className="orbit-spark spark-two" />
          </motion.div>

          <motion.div
            className="eyebrow cyber-eyebrow"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <span className="availability-dot" />
            <span>OPEN TO LEARNING & OPPORTUNITIES</span>
          </motion.div>

          <motion.h1
            className="cyber-headline"
            aria-label="Building ideas into digital reality."
            initial="hidden"
            animate="visible"
          >
            <span className="headline-line">
              <GlitchText text="Building ideas" delay={0.3} />
            </span>
            <br />
            <span className="headline-line">
              <span className="headline-into">into </span>
              <span className="gradient-text cyber-gradient">
                <GlitchText text="digital reality." delay={0.95} />
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="hero-description cyber-description"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.65 }}
          >
            Hey, I'm <strong>{profile.name}</strong> — a Computer Science
            student exploring full-stack development, thoughtful UI, and
            AI-powered solutions.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <Link className="button button-primary cyber-button" to="/projects">
              Explore my work <ArrowUpRight size={17} />
            </Link>

            <Link className="button button-ghost cyber-button-ghost" to="/contact">
              Let's connect <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            className="social-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} />
            </a>

            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub <ArrowUpRight size={13} />
            </a>

            <span className="social-separator" />

            <span className="location-label">⌖ {profile.location}</span>
          </motion.div>

          <motion.div
            className="cyber-status"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.9 }}
          >
            <Zap size={13} />
            <span>IDEAS INTO INTERACTIVE EXPERIENCES</span>
          </motion.div>
        </div>

        <motion.div
          className="hero-art cyber-hero-art"
          initial={{ opacity: 0, scale: 0.75, rotateY: 18, rotateZ: 3 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, rotateZ: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
          aria-label="Decorative developer illustration"
        >
          <div className="cyber-art-glow" />
          <div className="art-ring ring-one" />
          <div className="art-ring ring-two" />
          <div className="cyber-crosshair crosshair-one">+</div>
          <div className="cyber-crosshair crosshair-two">+</div>

          <motion.div
            className="art-card cyber-art-card"
            animate={{ y: [0, -9, 0], rotateZ: [-2, -3.5, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              scale: 1.035,
              rotateZ: 0,
              boxShadow: '0 0 65px rgba(0,245,255,0.2)',
            }}
          >
            <div className="art-window">
              <span />
              <span />
              <span />
              <small>ashu.jsx</small>
            </div>

            <div className="code-lines">
              <p><em>const</em> developer = {'{'}</p>
              <p className="indent">
                <b>name:</b> <i>'Ashutosh'</i>,
              </p>
              <p className="indent">
                <b>focus:</b> <i>'Full-stack'</i>,
              </p>
              <p className="indent">
                <b>curiosity:</b> <i>true</i>
              </p>
              <p>{'}'}</p>

              <div className="code-divider" />

              <p><em>function</em> <strong>buildFuture</strong>() {'{'}</p>
              <p className="indent">
                return <i>'keep building'</i>;
              </p>
              <p>{'}'}</p>

              <span className="cursor-block" />
            </div>
          </motion.div>

          <motion.div
            className="float-chip chip-code cyber-chip"
            animate={{ y: [0, -12, 0], x: [0, 4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Code2 size={17} /> Clean code
          </motion.div>

          <motion.div
            className="float-chip chip-spark cyber-chip"
            animate={{ y: [0, 10, 0], x: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={16} /> Curious by nature
          </motion.div>

          <div className="cyber-coordinate">23° N / 85° E</div>

          <div className="art-caption">
            DESIGN <span>×</span> CODE <span>×</span> IMPACT
          </div>
        </motion.div>

        <a href="#featured" className="scroll-cue cyber-scroll">
          <ArrowDownRight size={16} /> SCROLL TO EXPLORE
          <span className="scroll-line" />
        </a>
      </section>

      <section className="ticker cyber-ticker" aria-label="Areas of interest">
        <div>
          FRONTEND DEVELOPMENT <span>✳</span> BACKEND SYSTEMS <span>✳</span>
          AI EXPERIMENTS <span>✳</span> PROBLEM SOLVING <span>✳</span>
          FRONTEND DEVELOPMENT <span>✳</span> BACKEND SYSTEMS <span>✳</span>
        </div>
      </section>

      <motion.section
        className="section-wrap section-block"
        id="featured"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 — SELECTED WORK</p>
            <h2>
              Things I'm <span className="gradient-text">building.</span>
            </h2>
          </div>

          <Link className="text-link" to="/projects">
            All projects <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="project-grid cyber-project-grid">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.number}
              className="cyber-project-wrap"
              initial={{ opacity: 0, y: 55, rotateX: 8, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              whileHover={{ y: -9, scale: 1.015 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-wrap section-block skills-preview"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 — MY TOOLKIT</p>
            <h2>
              Learning by <span className="gradient-text">building.</span>
            </h2>
          </div>

          <Link className="text-link" to="/about">
            More about me <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="skill-grid">
          {skillGroups.map((group, i) => (
            <motion.div
              className="skill-panel cyber-skill-panel"
              key={group.title}
              initial={{ opacity: 0, y: 35, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -7,
                rotateY: 4,
                rotateX: -3,
                scale: 1.025,
              }}
            >
              <span className="skill-index">0{i + 1}</span>
              <h3>{group.title}</h3>

              <div className="tag-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-wrap cta-section cyber-cta"
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div>
          <p className="eyebrow">HAVE AN IDEA?</p>
          <h2>
            Let's make something
            <br />
            <span className="gradient-text">meaningful.</span>
          </h2>
        </div>

        <Link to="/contact" className="button button-primary cyber-button">
          Get in touch <ArrowUpRight size={17} />
        </Link>

        <div className="cta-glow" />
        <div className="cyber-cta-grid" />
      </motion.section>
    </>
  )
}
