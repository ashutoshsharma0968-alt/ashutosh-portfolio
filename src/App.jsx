import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
function AnimatedRoutes() {
  const location = useLocation()
  return <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .2 }}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes></motion.div></AnimatePresence>
}
export default function App() { return <Layout><AnimatedRoutes/></Layout> }
