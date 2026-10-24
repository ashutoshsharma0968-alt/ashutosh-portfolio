import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowUpRight, Code2, Trophy } from 'lucide-react'
import { projects } from '../data'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const filters = ['All', 'Full-stack', 'AI / Web']
  const filtered = useMemo(() => projects.filter(p => (filter === 'All' || p.category === filter) && `${p.title} ${p.description} ${p.stack.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  return <section className="section-wrap page-content projects-page-v2">
    <motion.div className="projects-intro-v2" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
      <div className="about-index-line"><span>THE WORKBENCH</span><span>IDEAS → INTERFACES → ITERATION</span></div>
      <p className="eyebrow">PROJECTS / SELECTED WORK</p>
      <h1 className="page-title">Less talk.<br/><span className="gradient-text">More building.</span></h1>
      <p className="page-lead">A growing collection of student-built applications and experiments. Each one is part of the learning curve—status labels are honest, and the goal is always to make the next version better.</p>
      <div className="projects-metrics"><div><Code2/><strong>03</strong><span>FEATURED BUILDS</span></div><div><Trophy/><strong>01</strong><span>GOAL: KEEP IMPROVING</span></div><div><ArrowUpRight/><strong>∞</strong><span>IDEAS TO EXPLORE</span></div></div>
    </motion.div>
    <div className="project-controls project-controls-v2"><div className="filter-row">{filters.map(item => <button key={item} className={filter === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects or tech..." aria-label="Search projects"/></label></div>
    {filtered.length ? <div className="project-grid">{filtered.map((project, index) => <ProjectCard key={project.number} project={project} index={index}/>)}</div> : <div className="empty-state">No projects match that search. Try another keyword.</div>}
    <div className="projects-note-v2"><span className="projects-note-icon"><Code2/></span><div><strong>Built while learning. Improved through feedback.</strong><p>I’m a CS student, so this portfolio reflects a journey—not a claim that the journey is finished. Have an idea or feedback? I’d genuinely like to hear it.</p></div></div>
  </section>
}
