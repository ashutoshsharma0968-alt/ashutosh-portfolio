import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Github, Linkedin, Sparkles } from 'lucide-react'
import { profile, projects, skillGroups } from '../data'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  return <>
    <section className="hero section-wrap" id="top">
      <div className="hero-copy"><motion.div className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><span className="availability-dot"/> OPEN TO LEARNING & OPPORTUNITIES</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>Building ideas<br/>into <span className="gradient-text">digital reality.</span></motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>Hey, I'm <strong>{profile.name}</strong> — a Computer Science student exploring full-stack development, thoughtful UI, and AI-powered solutions.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}><Link className="button button-primary" to="/projects">Explore my work <ArrowUpRight size={17}/></Link><Link className="button button-ghost" to="/contact">Let's connect <ArrowRight size={16}/></Link></motion.div>
        <div className="social-row"><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={13}/></a><span className="social-separator"/><span className="location-label">⌖ {profile.location}</span></div>
      </div>
      <motion.div className="hero-art" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .15 }} aria-label="Decorative developer illustration"><div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-card"><div className="art-window"><span/><span/><span/><small>ashu.jsx</small></div><div className="code-lines"><p><em>const</em> developer = {'{'}</p><p className="indent"><b>name:</b> <i>'Ashutosh'</i>,</p><p className="indent"><b>focus:</b> <i>'Full-stack'</i>,</p><p className="indent"><b>curiosity:</b> <i>true</i></p><p>{'}'}</p><div className="code-divider"/><p><em>function</em> <strong>buildFuture</strong>() {'{'}</p><p className="indent">return <i>'keep building'</i>;</p><p>{'}'}</p><span className="cursor-block"/></div></div><div className="float-chip chip-code"><Code2 size={17}/> Clean code</div><div className="float-chip chip-spark"><Sparkles size={16}/> Curious by nature</div><div className="art-caption">DESIGN <span>×</span> CODE <span>×</span> IMPACT</div></motion.div>
      <a href="#featured" className="scroll-cue"><ArrowDownRight size={16}/> SCROLL TO EXPLORE</a>
    </section>
    <section className="ticker" aria-label="Areas of interest"><div>FRONTEND DEVELOPMENT <span>✳</span> BACKEND SYSTEMS <span>✳</span> AI EXPERIMENTS <span>✳</span> PROBLEM SOLVING <span>✳</span> FRONTEND DEVELOPMENT <span>✳</span> BACKEND SYSTEMS <span>✳</span></div></section>
    <section className="section-wrap section-block" id="featured"><div className="section-heading"><div><p className="eyebrow">01 — SELECTED WORK</p><h2>Things I'm <span className="gradient-text">building.</span></h2></div><Link className="text-link" to="/projects">All projects <ArrowUpRight size={16}/></Link></div><div className="project-grid">{projects.slice(0, 3).map((project, index) => <ProjectCard key={project.number} project={project} index={index}/>)}</div></section>
    <section className="section-wrap section-block skills-preview"><div className="section-heading"><div><p className="eyebrow">02 — MY TOOLKIT</p><h2>Learning by <span className="gradient-text">building.</span></h2></div><Link className="text-link" to="/about">More about me <ArrowUpRight size={16}/></Link></div><div className="skill-grid">{skillGroups.map((group, i) => <div className="skill-panel" key={group.title}><span className="skill-index">0{i + 1}</span><h3>{group.title}</h3><div className="tag-list">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></section>
    <section className="section-wrap cta-section"><div><p className="eyebrow">HAVE AN IDEA?</p><h2>Let's make something<br/><span className="gradient-text">meaningful.</span></h2></div><Link to="/contact" className="button button-primary">Get in touch <ArrowUpRight size={17}/></Link><div className="cta-glow"/></section>
  </>
}
