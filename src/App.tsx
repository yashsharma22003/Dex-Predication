import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const navigationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
      });

      // Features animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="app-container">
      <nav ref={navigationRef} className="navigation">
        <div className="nav-logo">ArgusDEX</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#dex">DEX</a>
          <a href="#predictions">Predictions</a>
          <a href="#blog">Blog</a>
          <a href="#support">Support</a>
          <button className="connect-wallet">Connect Wallet</button>
        </div>
      </nav>

      <section ref={heroRef} className="hero-section">
        <h1 className="hero-title">
          {Array.from("ARGUSDEX").map((char, i) => (
            <span key={i} className="hero-letter">{char}</span>
          ))}
        </h1>
        <p className="hero-subtitle">The Decentralized Exchange That Simply Works</p>
        <motion.button 
          className="launch-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Launch DEX
        </motion.button>
      </section>

      <section ref={featuresRef} className="features-section">
        <div className="feature-card dex-pool">
          <h2>DEX Pool</h2>
          <ul>
            <li>Uniswap V3-style Liquidity</li>
            <li>Real-Time Oracle Pricing</li>
            <li>Custom Tick Ranges</li>
          </ul>
        </div>

        <div className="feature-card predictions">
          <h2>Prediction Market</h2>
          <ul>
            <li>Bet on Price Movements</li>
            <li>Trustless Settlements</li>
            <li>Powered by Flare FTSO</li>
          </ul>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="social-links">
            <a href="#twitter">Twitter</a>
            <a href="#discord">Discord</a>
            <a href="#telegram">Telegram</a>
          </div>
          <p className="disclaimer">
            Trading crypto assets involves significant risk. Always DYOR.
          </p>
          <p className="guarantee">30-day money-back guarantee on trading fees</p>
        </div>
      </footer>
    </div>
  );
}