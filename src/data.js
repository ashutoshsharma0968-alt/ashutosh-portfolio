
export const profile = {
  name: 'Ashutosh Kumar Sharma',
  shortName: 'Ashutosh Sharma',
  role: 'B.Tech Student at Arka Jain University · Aspiring Full-Stack Developer',
  location: 'Jamshedpur, Jharkhand, India',
  email: 'ashutoshsharma0968@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ashutoshsharma45/',
  github: 'https://github.com/ashutoshsharma0968-alt',
  resume: '/resume.pdf',
  intro: 'I build clean, useful digital experiences and explore how AI can solve real-world problems.',
}


export const projects = [
  {
    number: '01', title: 'ClassHub', category: 'Full-stack', status: 'In development',
    description: 'A university-focused student hub for attendance, notes, assignments, timetables, announcements, and faculty communication.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    impact: 'Designed around everyday student workflows.',
    github: 'https://github.com/ashutoshsharma0968-alt', live: '',
  },
  {
    number: '02', title: 'SmartCare AI', category: 'AI / Web', status: 'Live prototype',
    description: 'A full-stack healthcare companion designed to bring everyday health tools into one responsive interface. Flow: register or log in with secure JWT authentication (including email OTP password reset) → explore health tests and diagnostics → search nearby hospitals → calculate BMI and save personal health records → ask the AI health assistant for general information or upload a wound photo for cautious, Gemini-powered guidance. The Workout Coach uses the browser camera and MediaPipe pose tracking to show basic form cues and count reps for squats, push-ups, and biceps curls; camera video is processed locally in the browser.',
    stack: ['React', 'Vite', 'Express.js', 'PostgreSQL', 'JWT', 'Gemini AI', 'MediaPipe', 'OpenStreetMap'],
    impact: 'One place to explore care, keep health information organised, and try AI-assisted guidance. Provider bookings are not integrated yet; health guidance is educational, not a medical diagnosis.',
    github: 'https://github.com/ashutoshsharma0968-alt/smartcare-ai', live: 'https://smartcare-ai-ivory.vercel.app',
  },
  {
    number: '03', title: 'AgroAI', category: 'AI / Web', status: 'Concept / prototype',
    description: 'An agriculture support concept featuring weather, mandi-price information, and conversational assistance for farmers.',
    stack: ['JavaScript', 'APIs', 'AI concept'],
    impact: 'Explores accessible digital tools for agriculture.',
    github: 'https://github.com/ashutoshsharma0968-alt', live: '',
  },
]

export const skillGroups = [
  { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive UI'] },
  { title: 'Backend & data', items: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'JWT authentication'] },
  { title: 'Programming', items: ['C', 'Java', 'Object-oriented programming', 'Data structures'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Debugging'] },
]
