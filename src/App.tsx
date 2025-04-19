import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const mainRef = useRef(null)
  const descriptionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text span', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      })

      gsap.from('.hero-description', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
      })

      gsap.from('.section-card', {
        scrollTrigger: {
          trigger: '.section-card',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} className="app-container">
      <video autoPlay muted loop className="background-video">
        <source src="150517-798441456_medium.mp4" type="video/mp4" />
      </video>

      <div className="content-container">
        <header className="hero">
          <h1 className="hero-text">
            {Array.from("WEB3 PORTAL").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </h1>
          <p className="hero-description">
            Experience the future of decentralized finance with our cutting-edge platform
          </p>
        </header>

        <div className="features-grid">
          <div className="section-card">
            <div className="card-content">
              <h2>Add Liquidity</h2>
              <p>Provide liquidity to earn passive income through trading fees and rewards</p>
              <div className="card-actions">
                <input type="text" placeholder="Token Amount" />
                <input type="text" placeholder="Token Amount" />
                <button className="action-btn">Add Liquidity</button>
              </div>
              <div className="card-stats">
                <div className="stat">
                  <span className="value">$2.5M</span>
                  <span className="label">Total Locked</span>
                </div>
                <div className="stat">
                  <span className="value">12%</span>
                  <span className="label">APY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <div className="card-content">
              <h2>Swap Tokens</h2>
              <p>Trade tokens instantly with optimal pricing and minimal slippage</p>
              <div className="card-actions">
                <input type="text" placeholder="From Token" />
                <div className="swap-arrow">↓</div>
                <input type="text" placeholder="To Token" />
                <button className="action-btn">Swap Now</button>
              </div>
              <div className="card-stats">
                <div className="stat">
                  <span className="value">0.1%</span>
                  <span className="label">Fee</span>
                </div>
                <div className="stat">
                  <span className="value">$1M+</span>
                  <span className="label">Volume 24h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <div className="card-content">
              <h2>Prediction Market</h2>
              <p>Trade on future price movements with AI-powered insights</p>
              <div className="prediction-box">
                <h3>FLR Price Prediction</h3>
                <div className="prediction-actions">
                  <button className="up-btn">Up ↑</button>
                  <button className="down-btn">Down ↓</button>
                </div>
                <div className="prediction-info">
                  <span>Prize Pool: 1000 FLR</span>
                  <span>Ends in: 5h 30m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}