
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
      // Hero animation
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
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
      <div className="stars"></div>
      <div className="twinkling"></div>

      <section className="hero-section">
        <h1 className="hero-title">
          {Array.from("WEB3 PORTAL").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </h1>
        <p className="hero-subtitle">DEX + Prediction Market</p>
      </section>

      <section className="liquidity-section" ref={liquidityRef}>
        <div className="content-wrapper">
          <div className="text-content">
            <h2>Add Liquidity to the Pool</h2>
            <p>Become a Liquidity Provider and earn rewards by contributing to our DEX pools. Help build a more efficient and decentralized trading ecosystem.</p>
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
          <div className="text-content">
            <h2>Swap Tokens</h2>
            <p>Trade tokens instantly with our advanced DEX. Experience fast, secure, and low-fee transactions powered by smart contracts.</p>
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
