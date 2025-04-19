
import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [mounted, setMounted] = useState(false);
  const letters = "ARGUS".split("");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="portal-container">
      <nav className="nav-bar">
        <div className="logo">ArgusVPN</div>
        <div className="nav-links">
          <a href="#">Why Argus?</a>
          <a href="#">Goal</a>
          <a href="#">Support</a>
          <a href="#">Blog</a>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="glow-effect">
          <div className="glow-line"></div>
          <div className="glow-circle"></div>
        </div>
        
        <div className="animated-text">
          {letters.map((letter, index) => (
            <span key={index} className={`letter ${mounted ? 'visible' : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
              {letter}
            </span>
          ))}
        </div>

        <h2 className="hero-subtitle">VPN THAT SIMPLY WORKS</h2>
        <button className="install-button">Install ArgusVPN</button>
        <p className="guarantee">30-days money back guarantee</p>
      </section>
    </div>
  )
}
