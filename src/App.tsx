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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
      })

      gsap.from('.platform-features', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'back.out'
      })

      // Animate sections on scroll
      const sections = [liquidityRef, swapRef, predictionRef]
      sections.forEach(ref => {
        gsap.from(ref.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          duration: 0.8
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} className="portal-container">
      <section className="hero-section">
        <h1 className="hero-title">
          {Array.from("WEB3 PORTAL").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </h1>
        <div className="platform-features">
          <div className="feature-card">
            <h3>🔄 Decentralized Exchange</h3>
            <p>Experience seamless token swaps with our advanced DEX powered by automated market makers</p>
          </div>
          <div className="feature-card">
            <h3>💧 Liquidity Pools</h3>
            <p>Earn passive income by providing liquidity to our diverse range of token pairs</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Prediction Markets</h3>
            <p>Participate in decentralized market predictions with transparent outcomes</p>
          </div>
        </div>
      </section>

      <section className="liquidity-section" ref={liquidityRef}>
        <div className="content-wrapper">
          <div className="text-content">
            <h2>Liquidity Provision</h2>
            <div className="info-box">
              <h3>Why Provide Liquidity?</h3>
              <ul>
                <li>Earn trading fees from every swap in your pool</li>
                <li>Participate in yield farming opportunities</li>
                <li>Help maintain market stability and efficiency</li>
              </ul>
              <div className="rewards-info">
                <span className="highlight">Average APR: 8-15%</span>
                <span className="highlight">Fee Share: 0.3% per trade</span>
              </div>
            </div>
          </div>
          <div className="input-content">
            <div className="input-box">
              <h3>Add Liquidity</h3>
              <input type="text" placeholder="Token Amount A" />
              <input type="text" placeholder="Token Amount B" />
              <button className="action-button">Provide Liquidity</button>
            </div>
          </div>
        </div>
      </section>

      <section className="swap-section" ref={swapRef}>
        <div className="content-wrapper">
          <div className="text-content">
            <h2>Token Swap</h2>
            <div className="info-box">
              <h3>Advanced Trading Features</h3>
              <ul>
                <li>Multi-route splitting for better prices</li>
                <li>Price impact protection</li>
                <li>MEV protection against front-running</li>
              </ul>
              <div className="stats-info">
                <span className="highlight">24h Volume: $2.5M</span>
                <span className="highlight">Total Pairs: 150+</span>
              </div>
            </div>
          </div>
          <div className="input-content">
            <div className="input-box">
              <h3>Swap Tokens</h3>
              <input type="text" placeholder="From Token" />
              <div className="swap-arrow">↓</div>
              <input type="text" placeholder="To Token" />
              <button className="action-button">Swap Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="prediction-section" ref={predictionRef}>
        <div className="content-wrapper">
          <div className="text-content">
            <h2>Prediction Markets</h2>
            <div className="info-box">
              <h3>Market Insights</h3>
              <ul>
                <li>Real-time price feeds from Chainlink oracles</li>
                <li>Transparent resolution mechanism</li>
                <li>Multiple market categories</li>
              </ul>
            </div>
          </div>
          <div className="prediction-content">
            <div className="prediction-card">
              <h3>Active Market</h3>
              <div className="market-details">
                <p>FLR Price Movement</p>
                <p className="prediction-question">Will FLR exceed $0.50 by March 31st?</p>
                <div className="market-stats">
                  <span>Pool Size: 25,000 FLR</span>
                  <span>Participants: 156</span>
                </div>
              </div>
              <div className="prediction-buttons">
                <button className="yes-button">Yes (1.8x)</button>
                <button className="no-button">No (2.2x)</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}