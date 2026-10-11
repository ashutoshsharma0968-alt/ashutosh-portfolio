import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
export default function ProjectCard({ project, index = 0 }) {
  return <motion.article className="project-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .45, delay: index * .08 }}>
    <div className="project-top"><span className="project-number">{project.number} / PROJECT</span><span className="status"><i/> {project.status}</span></div>
    <div className="project-visual"><div className="visual-grid"/><div className="visual-orb"/><span className="visual-title">{project.title}<b>.</b></span><span className="visual-tag">{project.category}</span></div>
    <div className="project-body"><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-bottom"><span>{project.impact}</span><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}><Github size={17}/></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}><ArrowUpRight size={18}/></a>}</div></div></div>
  </motion.article>
}
