import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { projects } from '../data'
import ProjectCard from '../components/ProjectCard'
export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const filters = ['All', 'Full-stack', 'AI / Web']
  const filtered = useMemo(() => projects.filter(p => (filter === 'All' || p.category === filter) && `${p.title} ${p.description} ${p.stack.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  return <section className="section-wrap page-content"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><p className="eyebrow">A FEW THINGS I'VE BEEN EXPLORING</p><h1 className="page-title">Selected <span className="gradient-text">projects.</span></h1><p className="page-lead">A growing collection of ideas, prototypes, and applications. Project status is labelled honestly—I'll update these as the work evolves.</p></motion.div>
    <div className="project-controls"><div className="filter-row">{filters.map(item => <button key={item} className={filter === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects or tech..." aria-label="Search projects"/></label></div>
    {filtered.length ? <div className="project-grid">{filtered.map((project, index) => <ProjectCard key={project.number} project={project} index={index}/>)}</div> : <div className="empty-state">No projects match that search. Try another keyword.</div>}
  </section>
}
