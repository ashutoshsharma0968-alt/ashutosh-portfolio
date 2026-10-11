import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { profile } from '../data'
export default function Contact() {
  const contacts = [
    { title: 'Email me', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { title: 'LinkedIn', value: 'Connect professionally', href: profile.linkedin, icon: Linkedin },
    { title: 'GitHub', value: 'Explore my code', href: profile.github, icon: Github },
  ]
  return <section className="section-wrap page-content contact-page"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><p className="eyebrow">03 — CONTACT</p><h1 className="page-title">Good things start<br/>with a <span className="gradient-text">conversation.</span></h1><p className="page-lead">Have a project idea, an opportunity, or just want to talk about tech? Feel free to reach out. I’m always happy to connect and learn.</p></motion.div>
    <div className="contact-layout"><div className="contact-list">{contacts.map(({ title, value, href, icon: Icon }) => <a className="contact-card" key={title} href={href} target={title === 'Email me' ? undefined : '_blank'} rel="noreferrer"><span className="contact-icon"><Icon size={20}/></span><span className="contact-text"><strong>{title}</strong><small>{value}</small></span><ArrowUpRight className="contact-arrow" size={19}/></a>)}</div><aside className="contact-note"><MessageCircle size={23}/><h3>Currently open to</h3><p>Learning opportunities, beginner-friendly collaborations, internships, and meaningful projects.</p><div className="availability-line"><span className="availability-dot"/> Reply time varies during college hours</div></aside></div>
    <p className="small-note">Before publishing, replace the placeholder email and GitHub URL in <code>src/data.js</code>.</p>
  </section>
}
