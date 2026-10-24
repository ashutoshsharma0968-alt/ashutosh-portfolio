import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail,
  Code2, Layers3, Sparkles, Terminal, Cpu, ExternalLink
} from 'lucide-react'
import { profile, projects, skillGroups } from '../data'
import ProjectCard from '../components/ProjectCard'
import Avatar3D from '../components/Avatar3D'

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

const stack = ['REACT', 'JAVASCRIPT', 'NODE.JS', 'EXPRESS', 'MONGODB', 'AI EXPERIMENTS', 'UI ENGINEERING']

export default function Home() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <main className="heavy-home">
      <section className="heavy-hero" id="top">
        <div className="heavy-hero-grid" aria-hidden="true" />
        <div className="heavy-hero-glow heavy-glow-a" aria-hidden="true" />
        <div className="heavy-hero-glow heavy-glow-b" aria-hidden="true" />

        <div className="heavy-hero-inner">
          <motion.div className="heavy-intro" initial="hidden" animate="visible" variants={rise}>
            <div className="heavy-overline"><span className="heavy-live-dot" /> PORTFOLIO / 2026 <span className="heavy-overline-line" /> JAMSHEDPUR, INDIA</div>
            <p className="heavy-kicker">COMPUTER SCIENCE STUDENT <span>·</span> DEVELOPER IN PROGRESS</p>
            <h1 className="heavy-title">
              I turn<br />
              <span className="heavy-title-outline">curiosity</span> into<br />
              <span className="heavy-title-gradient">digital impact.</span>
            </h1>
            <p className="heavy-lede">
              I'm <strong>{profile.name}</strong> — a B.Tech student who loves building thoughtful web experiences, full-stack products, and practical AI experiments.
            </p>
            <div className="heavy-actions">
              <Link className="heavy-btn heavy-btn-primary" to="/projects">Explore selected work <ArrowUpRight size={17} /></Link>
              <Link className="heavy-btn heavy-btn-secondary" to="/contact">Start a conversation <ArrowRight size={16} /></Link>
            </div>
            <div className="heavy-socials">
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ExternalLink size={12} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ExternalLink size={12} /></a>
              <a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a>
            </div>
            <div className="heavy-scroll-note"><ArrowDown size={14} /> SCROLL TO EXPLORE</div>
          </motion.div>

          <motion.div className="heavy-visual" initial={{ opacity: 0, x: 35, scale: .96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .9, delay: .15 }}>
            <div className="heavy-visual-label"><span>FIG. 01</span><span>INTERACTIVE DIGITAL IDENTITY</span></div>
            <div className="heavy-visual-frame">
              <div className="heavy-corner heavy-corner-tl" /><div className="heavy-corner heavy-corner-tr" />
              <div className="heavy-corner heavy-corner-bl" /><div className="heavy-corner heavy-corner-br" />
              <div className="heavy-visual-orbit" />
              <Avatar3D />
              <div className="heavy-float-tag heavy-float-code"><Code2 size={15} /> BUILD / SHIP / LEARN</div>
              <div className="heavy-float-tag heavy-float-ai"><Sparkles size={15} /> AI × WEB</div>
            </div>
            <div className="heavy-visual-footer"><span>ASHUTOSH SHARMA</span><span>STUDENT / BUILDER / EXPLORER</span></div>
          </motion.div>
        </div>

        <div className="heavy-bottom-index"><span>01</span> — THE INTRODUCTION <span className="heavy-bottom-rule" /> SCROLL TO DISCOVER <ArrowDown size={13} /></div>
      </section>

      <div className="heavy-marquee" aria-label="Technology interests"><div className="heavy-marquee-track">{[...stack, ...stack].map((item, i) => <span key={item + i}>{item}<i>✳</i></span>)}</div></div>

      <motion.section className="heavy-section heavy-work section-wrap" id="featured" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .1 }} variants={rise}>
        <div className="heavy-section-top">
          <div><p className="heavy-section-label">01 / SELECTED WORK</p><h2>Built with intent.<br /><span>Made to matter.</span></h2></div>
          <p className="heavy-section-description">A growing collection of products and experiments where design meets engineering. Each project is a chance to solve a real problem and learn by shipping.</p>
        </div>
        <div className="heavy-project-grid">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div key={project.number} className="heavy-project-item" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ delay: index * .12, duration: .55 }}>
              <div className="heavy-project-index"><span>{project.number}</span><span>{project.category}</span></div>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
        <div className="heavy-view-all"><span>MORE IDEAS ARE IN THE WORKS</span><Link to="/projects">View all projects <ArrowUpRight size={16} /></Link></div>
      </motion.section>

      <section className="heavy-manifesto">
        <div className="heavy-manifesto-inner section-wrap">
          <div className="heavy-manifesto-side"><span className="heavy-section-label">02 / THE APPROACH</span><span className="heavy-manifesto-mark">✳</span></div>
          <div className="heavy-manifesto-copy"><p>Not just pretty screens.</p><h2>I care about the <em>details</em>, the <em>logic</em>, and the people on the other side of the screen.</h2><span className="heavy-manifesto-note">DESIGN WITH PURPOSE · CODE WITH CURIOSITY</span></div>
        </div>
      </section>

      <motion.section className="heavy-section heavy-toolkit section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .12 }} variants={rise}>
        <div className="heavy-section-top">
          <div><p className="heavy-section-label">03 / THE TOOLKIT</p><h2>My current<br /><span>building blocks.</span></h2></div>
          <p className="heavy-section-description">Tools I use and concepts I'm actively strengthening. I believe in showing the journey honestly and letting the work speak.</p>
        </div>
        <div className="heavy-toolkit-layout">
          <div className="heavy-toolkit-tabs" role="tablist" aria-label="Skill categories">
            {skillGroups.map((group, index) => <button key={group.title} className={activeTab === group.title ? 'heavy-tool-tab is-active' : 'heavy-tool-tab'} onClick={() => setActiveTab(group.title)} role="tab" aria-selected={activeTab === group.title}><span>0{index + 1}</span>{group.title}<ArrowUpRight size={14} /></button>)}
          </div>
          <div className="heavy-toolkit-panel" role="tabpanel">
            {skillGroups.filter(group => group.title === activeTab).map(group => <div key={group.title} className="heavy-toolkit-content"><div className="heavy-toolkit-heading"><Layers3 size={20} /><span>CAPABILITIES / {group.title.toUpperCase()}</span></div><h3>{group.title}<br /><span>in practice.</span></h3><div className="heavy-skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div><p>Learning through hands-on projects, iteration, debugging, and shipping useful features.</p></div>)}
            <div className="heavy-toolkit-watermark"><Cpu size={120} strokeWidth={.6} /></div>
          </div>
        </div>
        <Link to="/about" className="heavy-about-link">More about my journey <ArrowRight size={16} /></Link>
      </motion.section>

      <section className="heavy-contact">
        <div className="heavy-contact-grid" aria-hidden="true" />
        <div className="heavy-contact-inner section-wrap">
          <p className="heavy-section-label">04 / WHAT'S NEXT?</p>
          <h2>Have a good<br /><span>problem to solve?</span></h2>
          <p>I'm always open to learning from people who build, exploring ideas, and collaborating on meaningful projects.</p>
          <div className="heavy-actions"><Link className="heavy-btn heavy-btn-primary" to="/contact">Let's talk <ArrowUpRight size={17} /></Link><a className="heavy-btn heavy-btn-secondary" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> Connect on LinkedIn</a></div>
          <div className="heavy-contact-signature"><span>ASHUTOSH KUMAR SHARMA</span><span>BUILT WITH CURIOSITY <Sparkles size={13} /></span></div>
        </div>
      </section>
    </main>
  )
}
