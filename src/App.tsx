
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const mainRef = useRef(null)
  const liquidityRef = useRef(null)
  const swapRef = useRef(null)
  const predictionRef = useRef(null)
  const descriptionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation with enhanced effects
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
      })

      gsap.from('.hero-subtitle', {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'elastic.out'
      })

      gsap.from('.portal-description', {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: 'back.out'
      })

      // Liquidity section
      gsap.from(liquidityRef.current, {
        scrollTrigger: {
          trigger: liquidityRef.current,
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -100,
        duration: 1
      })

      // Swap section
      gsap.from(swapRef.current, {
        scrollTrigger: {
          trigger: swapRef.current,
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -100,
        duration: 1
      })

      // Prediction section
      gsap.from(predictionRef.current, {
        scrollTrigger: {
          trigger: predictionRef.current,
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -100,
        duration: 1
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} className="portal-container">
      <video autoPlay muted loop className="background-video">
        <source src="150517-798441456_medium.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <section className="hero-section">
        <h1 className="hero-title">
          {Array.from("WEB3 PORTAL").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </h1>
        <p className="hero-subtitle">DEX + Prediction Market</p>
        <div className="portal-description" ref={descriptionRef}>
          <p>Welcome to the future of decentralized finance. Our Web3 Portal combines the power of a 
             decentralized exchange with an innovative prediction market platform.</p>
          <div className="feature-grid">
            <div className="feature-item">
              <h3>🔒 Secure Trading</h3>
              <p>Built on blockchain technology for maximum security and transparency</p>
            </div>
            <div className="feature-item">
              <h3>⚡ Lightning Fast</h3>
              <p>Experience near-instant transactions with minimal fees</p>
            </div>
            <div className="feature-item">
              <h3>🎯 Smart Predictions</h3>
              <p>Make informed decisions with our advanced prediction markets</p>
            </div>
            <div className="feature-item">
              <h3>💧 Deep Liquidity</h3>
              <p>Access deep liquidity pools for seamless trading</p>
            </div>
          </div>
        </div>
      </section>

      <section className="liquidity-section" ref={liquidityRef}>
        <div className="content-wrapper">
          <div className="text-content animate-content">
            <h2>Add Liquidity to the Pool</h2>
            <p className="main-description">Become a Liquidity Provider and earn rewards by contributing to our DEX pools. Help build a more efficient and decentralized trading ecosystem.</p>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="icon">💰</span>
                <p>Earn passive income through trading fees</p>
              </div>
              <div className="benefit-item">
                <span className="icon">📈</span>
                <p>Participate in yield farming opportunities</p>
              </div>
              <div className="benefit-item">
                <span className="icon">🔄</span>
                <p>Automatic reward distribution</p>
              </div>
            </div>
          </div>
          <div className="input-content">
            <div className="input-box">
              <input type="text" placeholder="Token Amount" />
              <input type="text" placeholder="Token Amount" />
              <button className="action-button">Add Liquidity</button>
            </div>
          </div>
        </div>
      </section>

      <section className="swap-section" ref={swapRef}>
        <div className="content-wrapper">
          <div className="text-content animate-content">
            <h2>Swap Tokens</h2>
            <p className="main-description">Trade tokens instantly with our advanced DEX. Experience fast, secure, and low-fee transactions powered by smart contracts.</p>
            <div className="features-list">
              <div className="feature-item">
                <span className="icon">⚡</span>
                <p>Lightning-fast transactions</p>
              </div>
              <div className="feature-item">
                <span className="icon">💎</span>
                <p>Best price routing</p>
              </div>
              <div className="feature-item">
                <span className="icon">🛡️</span>
                <p>Anti-slippage protection</p>
              </div>
            </div>
          </div>
          <div className="input-content">
            <div className="input-box">
              <input type="text" placeholder="From Token" />
              <input type="text" placeholder="To Token" />
              <button className="action-button">Swap</button>
            </div>
          </div>
        </div>
      </section>

      <section className="prediction-section" ref={predictionRef}>
        <div className="content-wrapper">
          <div className="text-content">
            <h2>Prediction Market</h2>
            <p>Participate in decentralized predictions for FLR token price movements.</p>
          </div>
          <div className="prediction-content">
            <div className="prediction-card">
              <h3>Will FLR token price increase by 20% this month?</h3>
              <div className="prediction-buttons">
                <button className="yes-button">Yes</button>
                <button className="no-button">No</button>
              </div>
              <div className="prediction-stats">
                <div>Current Pool: 1000 FLR</div>
                <div>Time Left: 5d 12h</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
