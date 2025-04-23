import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const liquiditySectionRef = useRef<HTMLDivElement | null>(null);
  const swapSectionRef = useRef<HTMLDivElement | null>(null);
  const predictionSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Navbar background change on scroll
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 100) {
        nav.style.backgroundColor = "rgba(10, 10, 20, 0.9)";
        (nav.style as any).backdropFilter = "blur(10px)";

      } else {
        nav.style.backgroundColor = "transparent";
        (nav.style as any).backdropFilter = "none";

      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from('.hero-text span', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });

      gsap.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.5,
        repeat: -1,
        yoyo: true
      });

      // Section animations
      ScrollTrigger.create({
        trigger: liquiditySectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.liquidity-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
          gsap.from('.liquidity-card', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      });

      ScrollTrigger.create({
        trigger: swapSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.swap-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
          gsap.from('.swap-card', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      });

      ScrollTrigger.create({
        trigger: predictionSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.prediction-card', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });

    }, mainRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const scrollToSection = (ref :any) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={mainRef} className="app-container">
      {/* Navbar */}
      <nav ref={navRef} className="navbar">
        <div className="nav-content">
          <div className="nav-logo">WEB3</div>
          <div className="nav-links">
            <button onClick={() => scrollToSection(heroRef)}>Home</button>
            <button onClick={() => scrollToSection(liquiditySectionRef)}>Liquidity</button>
            <button onClick={() => scrollToSection(swapSectionRef)}>Swap Tokens</button>
            <button onClick={() => scrollToSection(predictionSectionRef)}>Prediction</button>
          </div>
        </div>
      </nav>

      <video autoPlay muted loop className="background-video">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-woman-using-her-credit-card-41596-large.mp4" type="video/mp4" />
      </video>

      {/* Hero Section */}
      <div ref={heroRef} className="hero-section">
        <div className="content-container">
          <header className="hero">
            <h1 className="hero-text">
              WEB3 REVOLUTION
              {/* {Array.from("WEB3 REVOLUTION").map((char, i) => (
                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
              ))} */}
            </h1>
            <p className="hero-description">
              The next evolution of the internet is here. Experience decentralized finance with our cutting-edge platform.
            </p>
            <div className="scroll-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </header>
        </div>
      </div>

      {/* Liquidity Section */}
      <div ref={liquiditySectionRef} className="section-container">
        <div className="content-container">
          <div className="section-content">
            <div className="liquidity-description">
              <h2>Liquidity Pools</h2>
              <p>
                Provide liquidity to decentralized exchanges and earn passive income through trading fees and yield farming rewards. 
                Our platform offers competitive APYs and minimal impermanent loss protection.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">$42.8B</div>
                  <div className="stat-label">Total Value Locked</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">1.2M</div>
                  <div className="stat-label">Active Providers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">12-48%</div>
                  <div className="stat-label">Average APY</div>
                </div>
              </div>
            </div>
            <div className="liquidity-card section-card">
              <div className="card-content">
                <h2>Add Liquidity</h2>
                <p>Provide liquidity to earn passive income through trading fees and rewards</p>
                <div className="card-actions">
                  <input type="text" placeholder="Token Amount" />
                  <input type="text" placeholder="Token Amount" />
                  <button className="action-btn pulse">Add Liquidity</button>
                </div>
                <div className="card-stats">
                  <div className="stat">
                    <span className="value">$42.8B</span>
                    <span className="label">Total Locked</span>
                  </div>
                  <div className="stat">
                    <span className="value">12-48%</span>
                    <span className="label">APY Range</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Section */}
      <div ref={swapSectionRef} className="section-container">
        <div className="content-container">
          <div className="section-content reverse">
            <div className="swap-description">
              <h2>Token Swaps</h2>
              <p>
                Trade tokens instantly with optimal pricing and minimal slippage. 
                Our advanced routing algorithm scans multiple DEXs to find you the best rates across the entire DeFi ecosystem.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">$1.2B</div>
                  <div className="stat-label">24h Volume</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">0.05%</div>
                  <div className="stat-label">Average Fee</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">12s</div>
                  <div className="stat-label">Avg. Swap Time</div>
                </div>
              </div>
            </div>
            <div className="swap-card section-card">
              <div className="card-content">
                <h2>Swap Tokens</h2>
                <p>Trade tokens instantly with optimal pricing and minimal slippage</p>
                <div className="card-actions">
                  <input type="text" placeholder="From Token" />
                  <div className="swap-arrow">↓</div>
                  <input type="text" placeholder="To Token" />
                  <button className="action-btn pulse">Swap Now</button>
                </div>
                <div className="card-stats">
                  <div className="stat">
                    <span className="value">0.05%</span>
                    <span className="label">Fee</span>
                  </div>
                  <div className="stat">
                    <span className="value">$1.2B</span>
                    <span className="label">Volume 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Section */}
      {/* Prediction Section */}
<div ref={predictionSectionRef} className="section-container full-width">
  <div className="content-container">
    <h2 className="section-title">Prediction Markets</h2>
    <p className="section-subtitle">Trade on future price movements with AI-powered insights</p>
    
    <div className="prediction-cards-container">
      {/* Card 1 - ETH Prediction */}
      <div className="prediction-card">
        <div className="card-content">
          <div className="market-header">
            <h3>ETH/USDT</h3>
            <div className="market-tag live">LIVE</div>
          </div>
          <div className="price-display">
            <span className="current-price">$3,427.52</span>
            <span className="price-change positive">+2.4%</span>
          </div>
          <div className="prediction-actions">
            <button className="up-btn pulse">Up ↑ </button>
            <button className="down-btn pulse">Down ↓</button>
          </div>
          <div className="time-remaining">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <span>Ends in: 3h 45m</span>
          </div>
          <div className="volume-display">
            <span>24h Volume: $1.2B</span>
          </div>
        </div>
      </div>

      {/* Card 2 - BTC Prediction */}
      <div className="prediction-card">
        <div className="card-content">
          <div className="market-header">
            <h3>BTC/USDT</h3>
            <div className="market-tag live">LIVE</div>
          </div>
          <div className="price-display">
            <span className="current-price">$63,851.20</span>
            <span className="price-change positive">+1.8%</span>
          </div>
          <div className="prediction-actions">
            <button className="up-btn pulse">Up ↑ </button>
            <button className="down-btn pulse">Down ↓</button>
          </div>
          <div className="time-remaining">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }}></div>
            </div>
            <span>Ends in: 5h 12m</span>
          </div>
          <div className="volume-display">
            <span>24h Volume: $3.8B</span>
          </div>
        </div>
      </div>

      {/* Card 3 - SOL Prediction */}
      <div className="prediction-card">
        <div className="card-content">
          <div className="market-header">
            <h3>SOL/USDT</h3>
            <div className="market-tag live">LIVE</div>
          </div>
          <div className="price-display">
            <span className="current-price">$142.75</span>
            <span className="price-change negative">-3.2%</span>
          </div>
          <div className="prediction-actions">
            <button className="up-btn pulse">Up ↑ </button>
            <button className="down-btn pulse">Down ↓ </button>
          </div>
          <div className="time-remaining">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '25%' }}></div>
            </div>
            <span>Ends in: 7h 30m</span>
          </div>
          <div className="volume-display">
            <span>24h Volume: $850M</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}