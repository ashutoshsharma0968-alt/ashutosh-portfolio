import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Code2, Trophy } from 'lucide-react'
import { profile } from '../data'

export default function Contact() {
  const contacts = [
    { title: 'Email me', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { title: 'LinkedIn', value: 'Connect professionally', href: profile.linkedin, icon: Linkedin },
    { title: 'GitHub', value: 'Explore my code', href: profile.github, icon: Github },
  ]
  return <section className="section-wrap page-content contact-page contact-page-v2">
    <motion.div className="contact-intro-v2" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
      <div className="about-index-line"><span>OPEN CHANNEL</span><span>GOOD PEOPLE · GOOD IDEAS</span></div>
      <p className="eyebrow">CONTACT / LET’S CONNECT</p>
      <h1 className="page-title">Let’s make<br/>something <span className="gradient-text">count.</span></h1>
      <p className="page-lead">Have a project idea, internship opportunity, useful feedback, or just want to talk tech (or cricket)? I’m a CS student who’s always up for learning from people who build.</p>
      <div className="contact-personal-tags"><span><Code2 size={15}/> Talk code</span><span><Trophy size={15}/> Talk cricket</span><span><MessageCircle size={15}/> Share ideas</span></div>
    </motion.div>
    <div className="contact-layout"><div className="contact-list">{contacts.map(({ title, value, href, icon: Icon }) => <a className="contact-card" key={title} href={href} target={title === 'Email me' ? undefined : '_blank'} rel="noreferrer"><span className="contact-icon"><Icon size={20}/></span><span className="contact-text"><strong>{title}</strong><small>{value}</small></span><ArrowUpRight className="contact-arrow" size={19}/></a>)}</div><aside className="contact-note contact-note-v2"><div className="contact-note-symbol"><MessageCircle size={23}/></div><p className="eyebrow">CURRENTLY OPEN TO</p><h3>Good conversations.<br/>Real learning.</h3><p>Beginner-friendly collaborations, internships, learning opportunities, and meaningful projects are welcome.</p><div className="availability-line"><span className="availability-dot"/> Reply time varies during college hours</div><div className="contact-note-bottom">OFF THE PITCH. ON THE KEYBOARD. <Trophy size={14}/></div></aside></div>
  </section>
}
