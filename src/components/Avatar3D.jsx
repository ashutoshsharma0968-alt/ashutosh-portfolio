import { profile } from '../data'

export default function Avatar3D() {
  return (
    <div className="avatar3d-stage" aria-label="Ashutosh's profile photo in a cinematic portfolio frame">
      <div className="avatar3d-vignette" />
      <div className="avatar3d-grain" />
      <div className="avatar3d-topline">
        <div className="avatar3d-orbit-label"><span /> DIGITAL IDENTITY / 2026</div>
        <div className="avatar3d-live-tag">● AVAILABLE TO LEARN</div>
      </div>
      <div className="avatar3d-canvas avatar3d-photo-wrap">
        <div className="avatar3d-photo-glow" />
        <img
          className="avatar3d-profile-photo"
          src="/profile.png"
          alt={profile.name}
          fetchPriority="high"
        />
      </div>
      <div className="avatar3d-side-data avatar3d-side-left">
        <span className="avatar3d-index">01 / PROFILE</span>
        <strong>THE BUILDER</strong>
        <span className="avatar3d-rule" />
        <span>Curious mind.</span>
        <span>Building the future.</span>
      </div>
      <div className="avatar3d-side-data avatar3d-side-right">
        <span className="avatar3d-index">02 / CURRENTLY</span>
        <strong>B.TECH</strong>
        <span>Computer Science</span>
        <span>& Technology</span>
        <span className="avatar3d-rule" />
        <span>ARKA JAIN</span>
        <span>UNIVERSITY</span>
      </div>
      <div className="avatar3d-student-card">
        <div className="avatar3d-student-monogram">AS<span>✦</span></div>
        <div className="avatar3d-student-info">
          <span className="avatar3d-index">STUDENT / DEVELOPER</span>
          <strong>{profile.name}</strong>
          <span>B.Tech · Computer Science & Technology</span>
          <span>Arka Jain University · Batch 2025–29</span>
        </div>
        <div className="avatar3d-student-status"><i /> LEARNING</div>
      </div>
      <div className="avatar3d-contact-strip">
        <a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        <a href={`mailto:${profile.email}`}>EMAIL ↗</a>
      </div>
      <div className="avatar3d-coordinate">JAMSHEDPUR, INDIA · FIG. 01</div>
    </div>
  )
}
