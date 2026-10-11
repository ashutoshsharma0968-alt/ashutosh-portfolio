
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  GraduationCap,
  Lightbulb,
  Target,
} from 'lucide-react'
import { profile, skillGroups } from '../data'

export default function About() {
  return (
    <section className="section-wrap page-content">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.img
          src="/profile.png"
          alt="Ashutosh Kumar Sharma"
          className="profile-photo about-profile"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        <p className="eyebrow">A LITTLE ABOUT ME</p>

        <h1 className="page-title">
          Curious mind.
          <br />
          <span className="gradient-text">Builder mindset.</span>
        </h1>

        <p className="page-lead">
          I'm {profile.name}, a B.Tech Computer Science student at Arka Jain
          University. I enjoy turning ideas into practical projects, learning
          how systems work, and creating digital experiences that feel simple
          and useful.
        </p>
      </motion.div>

      <div className="about-cards">
        <article className="info-card">
          <GraduationCap />
          <h3>What I'm studying</h3>
          <p>
            B.Tech in Computer Science and Technology. Currently strengthening
            programming fundamentals, web development, and problem-solving
            skills.
          </p>
        </article>

        <article className="info-card">
          <Lightbulb />
          <h3>What excites me</h3>
          <p>
            Full-stack applications, clean interfaces, AI-assisted experiences,
            and technology that solves everyday problems.
          </p>
        </article>

        <article className="info-card">
          <Target />
          <h3>What I'm working toward</h3>
          <p>
            Building a strong portfolio through real projects, learning
            consistently, collaborating with others, and becoming a dependable
            developer.
          </p>
        </article>
      </div>

      <div className="section-heading about-skills-heading">
        <div>
          <p className="eyebrow">SKILLS IN PROGRESS</p>
          <h2>My current toolkit</h2>
        </div>
      </div>

      <div className="skill-grid">
        {skillGroups.map((group, i) => (
          <div className="skill-panel" key={group.title}>
            <span className="skill-index">0{i + 1}</span>
            <h3>{group.title}</h3>

            <div className="tag-list">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="resume-panel">
        <div>
          <p className="eyebrow">RESUME</p>
          <h3>Want the concise version?</h3>
          <p>View my resume for my education, skills, and projects.</p>
        </div>

        <a
          className="button button-ghost"
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
        >
          View resume <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  )
}
