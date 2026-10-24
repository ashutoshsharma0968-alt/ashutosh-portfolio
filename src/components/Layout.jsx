import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { profile } from '../data'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  return <div className="site-shell"><div className="stadium-backdrop" aria-hidden="true" />
    <header className="topbar">
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">A<span>.</span></span><span>ashutosh<span className="muted">/dev</span></span></Link>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        {links.map(link => <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)}>{link.label}</NavLink>)}
        <a className="nav-cta" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15}/></a>
      </nav>
    </header>
    <main>{children}</main>
    <footer className="footer"><span>© {new Date().getFullYear()} {profile.shortName}</span><span>Built with code <span className="accent">✳</span> powered by cricket energy</span><a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</a></footer>
  </div>
}
