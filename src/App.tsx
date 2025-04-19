
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const liquidityTextRef = useRef(null);
  const liquidityFormRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(liquidityTextRef.current, {
        scrollTrigger: {
          trigger: liquidityTextRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });

      gsap.from(liquidityFormRef.current, {
        scrollTrigger: {
          trigger: liquidityFormRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={liquidityTextRef} className="space-y-6">
            <div className="inline-block">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Provide Liquidity
              </h2>
            </div>
            <p className="text-lg text-gray-300">
              Earn fees by depositing token pairs into our smart pool. Set your own price range and position. Powered by Uniswap V3-style liquidity math.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span>Custom Ranges</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Oracle-Validated Pricing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>LP Token Rewards</span>
              </div>
            </div>
          </div>

          <div ref={liquidityFormRef} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Token A</label>
                  <select className="w-full bg-dark border border-primary/30 rounded-lg p-3 focus:outline-none focus:border-primary hover:border-primary/60 transition-colors">
                    <option>Select Token</option>
                    <option>FLR</option>
                    <option>SGB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Token B</label>
                  <select className="w-full bg-dark border border-primary/30 rounded-lg p-3 focus:outline-none focus:border-primary hover:border-primary/60 transition-colors">
                    <option>Select Token</option>
                    <option>USDT</option>
                    <option>USDC</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount A</label>
                  <input type="number" className="w-full bg-dark border border-primary/30 rounded-lg p-3 focus:outline-none focus:border-primary hover:border-primary/60 transition-colors" placeholder="0.0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Amount B</label>
                  <input type="number" className="w-full bg-dark border border-primary/30 rounded-lg p-3 focus:outline-none focus:border-primary hover:border-primary/60 transition-colors" placeholder="0.0" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4">Price Range</label>
                <input type="range" className="w-full accent-primary" min="0" max="100" />
                <div className="flex justify-between text-sm mt-2">
                  <span>Min Price</span>
                  <span>Max Price</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-primary to-secondary py-4 px-8 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(0,163,255,0.5)] transition-shadow animate-glow">
                Connect Wallet to Add Liquidity
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
