"use client";

import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 60); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div id="stats-section">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300/20 to-transparent animate-pulse delay-1000"></div>
        
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Total Raised */}
          <div className="group p-6 rounded-2xl hover:bg-white/5 transition-all duration-500 transform hover:scale-105">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent mb-2">
              {isVisible ? <AnimatedCounter end={15.2} prefix="₿" duration={2500} /> : "₿0"}
            </div>
            <div className="text-sm lg:text-base text-pink-900/80 font-semibold uppercase tracking-wider">
              Total Raised
            </div>
            <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto mt-3 rounded-full group-hover:w-16 transition-all duration-300"></div>
          </div>

          {/* Causes Supported */}
          <div className="group p-6 rounded-2xl hover:bg-white/5 transition-all duration-500 transform hover:scale-105">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent mb-2">
              {isVisible ? <AnimatedCounter end={42} duration={2000} /> : "0"}
            </div>
            <div className="text-sm lg:text-base text-purple-900/80 font-semibold uppercase tracking-wider">
              Causes Supported
            </div>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-3 rounded-full group-hover:w-16 transition-all duration-300"></div>
          </div>

          {/* NFTs Collected */}
          <div className="group p-6 rounded-2xl hover:bg-white/5 transition-all duration-500 transform hover:scale-105">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-800 bg-clip-text text-transparent mb-2">
              {isVisible ? <AnimatedCounter end={1250} duration={3000} /> : "0"}
            </div>
            <div className="text-sm lg:text-base text-rose-900/80 font-semibold uppercase tracking-wider">
              NFTs Collected
            </div>
            <div className="w-12 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto mt-3 rounded-full group-hover:w-16 transition-all duration-300"></div>
          </div>

          {/* Direct to Charity */}
          <div className="group p-6 rounded-2xl hover:bg-white/5 transition-all duration-500 transform hover:scale-105">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {isVisible ? <AnimatedCounter end={95} suffix="%" duration={1800} /> : "0%"}
            </div>
            <div className="text-sm lg:text-base text-fuchsia-900/80 font-semibold uppercase tracking-wider">
              Direct to Charity
            </div>
            <div className="w-12 h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 mx-auto mt-3 rounded-full group-hover:w-16 transition-all duration-300"></div>
          </div>
        </div>

  
      </div>
    </div>
  );
}