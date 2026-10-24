import { motion } from 'framer-motion'
import { ArrowUpRight, GraduationCap, Lightbulb, Target, Trophy, Code2, Users, CircleDot } from 'lucide-react'
import { profile, skillGroups } from '../data'

export default function About() {
  return (
    <section className="section-wrap page-content about-page-v2">
      <motion.div className="about-intro-v2" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
        <div className="about-index-line"><span>THE HUMAN BEHIND THE SCREEN</span><span>JAMSHEDPUR, INDIA ↗</span></div>
        <p className="eyebrow">ABOUT / ASHUTOSH</p>
        <h1 className="page-title">Computer science<br />by study. <span className="gradient-text">Cricket by heart.</span></h1>
        <p className="page-lead">I'm <strong>{profile.name}</strong>, a B.Tech Computer Science and Technology student at Arka Jain University. I’m learning by building real projects, breaking things, debugging them, and making each version better.</p>
        <div className="about-pill-row"><span><GraduationCap size={15}/> B.Tech · CST</span><span><Code2 size={15}/> Aspiring full-stack developer</span><span><Trophy size={15}/> Cricket fan</span></div>
      </motion.div>

      <div className="about-story-grid">
        <article className="about-story-card about-story-main"><span className="about-card-index">01 / THE BUILDER</span><Code2 size={25}/><h2>I like ideas that<br/><em>actually work.</em></h2><p>My focus is web development, full-stack applications, and exploring practical AI experiences. Projects like ClassHub and SmartCare AI help me connect classroom concepts with real user problems.</p></article>
        <article className="about-story-card about-story-cricket"><span className="about-card-index">02 / THE FAN</span><Trophy size={25}/><h2>Cricket is more<br/><em>than a game.</em></h2><p>I'm a cricket fan who loves the strategy, the momentum shifts, the pressure moments, and the team effort. That mindset carries into how I learn: stay patient, read the situation, and keep improving.</p><div className="cricket-stumps" aria-hidden="true"><i/><i/><i/><b/></div></article>
        <article className="about-story-card about-story-wide"><span className="about-card-index">03 / THE MINDSET</span><Target size={25}/><h2>Still learning. Always building.</h2><p>I’m not here to pretend I know everything. I’m here to grow strong fundamentals, write better code, collaborate with good people, and become a developer others can rely on.</p><div className="about-values"><span><Lightbulb size={15}/> Curiosity</span><span><Users size={15}/> Teamwork</span><span><CircleDot size={15}/> Consistency</span></div></article>
      </div>

      <div className="about-skills-v2">
        <div className="about-index-line"><span>TOOLS I’M GROWING WITH</span><span>LEARN → BUILD → REFINE</span></div>
        <p className="eyebrow">THE TOOLKIT</p><h2>My current <span className="gradient-text">building blocks.</span></h2>
        <div className="skill-grid">{skillGroups.map((group, i) => <div className="skill-panel" key={group.title}><span className="skill-index">0{i + 1}</span><h3>{group.title}</h3><div className="tag-list">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
      </div>

      <div className="resume-panel"><div><p className="eyebrow">THE QUICK VERSION</p><h3>Want to know what I’ve worked on?</h3><p>My resume brings together my education, skills, and project work.</p></div><a className="button button-ghost" href={profile.resume} target="_blank" rel="noreferrer">View resume <ArrowUpRight size={16}/></a></div>
    </section>
  )
}
