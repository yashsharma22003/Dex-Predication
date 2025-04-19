import { useState } from 'react'
import './App.css'

export default function App() {
  return (
    <div className="portal-container">
      <section className="hero-section">
        <div className="glow-arc"></div>
        <h1 className="hero-title">PORTAL</h1>
        <p className="hero-subtitle">EXPERIENCE THE FUTURE</p>
        <button className="portal-button">Enter Portal</button>
      </section>

      <section className="content-section">
        {/* Additional content can go here */}
      </section>
    </div>
  )
}