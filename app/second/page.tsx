'use client';

import { useEffect, useState } from 'react';

const CONFETTI_COLORS = [
  '#ff4500',
  '#ffd700',
  '#1e90ff',
  '#32cd32',
  '#ff69b4',
  '#00ced1',
  '#ffa500',
];

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export default function Home() {
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const letterTimer = setTimeout(() => {
      setShowLetter(true);
    }, 3000);

    return () => clearTimeout(letterTimer);
  }, []);

  useEffect(() => {
    const CONFETTI_COUNT = 100;
    const layer = document.getElementById('confetti-layer');
    if (!layer) return;

    layer.innerHTML = '';

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const node = document.createElement('div');
      node.className = 'confetti';

      const size = randomBetween(8, 16);
      const startX = randomBetween(0, 100);
      const drift = randomBetween(-40, 40);
      const spin = randomBetween(0, 720);
      const scale = randomBetween(0.8, 1.2);
      const delay = randomBetween(0, 5);
      const dur = randomBetween(6, 9);

      node.style.background =
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      node.style.width = `${size}px`;
      node.style.height = `${size}px`;

      node.style.setProperty('--x', `${startX}vw`);
      node.style.setProperty('--dx', `${drift}vw`);
      node.style.setProperty('--spin', `${spin}deg`);
      node.style.setProperty('--scale', `${scale}`);
      node.style.animation = `fall ${dur}s linear infinite`;
      node.style.animationDelay = `${delay}s`;

      layer.appendChild(node);
    }
  }, []);

  return (
    <>
      <style global jsx>{`
        #confetti-layer {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 50;
        }

        .confetti {
          position: absolute;
          top: -10vh;
          border-radius: 3px;
          opacity: 0.9;
        }

        @keyframes fall {
          0% {
            transform: translate3d(var(--x), -10vh, 0)
              rotate(var(--spin)) scale(var(--scale));
            opacity: 1;
          }
          100% {
            transform: translate3d(calc(var(--x) + var(--dx)), 110vh, 0)
              rotate(calc(var(--spin) + 360deg)) scale(var(--scale));
            opacity: 0.5;
          }
        }

        @keyframes pop-up {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes slide-out {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-pop-up {
          animation: pop-up 0.5s ease-out forwards;
        }

        .animate-slide-out {
          animation: slide-out 0.6s ease forwards;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }

        .envelope {
          position: relative;
          width: 24rem;
          height: 15rem;
          background: #d6336c;
          border: 5px solid #b02a58;
          border-radius: 1rem;
          box-shadow: 0 8px 16px rgba(214, 51, 108, 0.5);
          overflow: hidden;
          cursor: pointer;
          transform-origin: center;
          padding: 1.5rem;
        }

        .envelope::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 7.5rem 12rem 0 12rem;
          border-color: #b02a58 transparent transparent transparent;
          transition: transform 0.3s ease;
          transform-origin: center bottom;
          z-index: 5;
        }

        .letter {
          position: absolute;
          top: 2.25rem;
          left: 2.25rem;
          right: 2.25rem;
          height: 12rem;
          background: #ffe4e6; /* soft pink */
          border: 3px solid #ccc;
          border-radius: 0.375rem;
          box-shadow: 0 3px 9px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transform: translateY(20px);
          z-index: 10;
          padding: 1rem 1.25rem;
          overflow-y: auto;
          font-family: 'Arial', sans-serif;
          color: #5a2a37;
          font-size: 0.9rem;
          line-height: 1.4;
          white-space: pre-wrap;
        }
      `}</style>

      <div id="confetti-layer" />

      <main className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#ffdcdc] z-10">
        <div className="envelope animate-pop-up">
          {showLetter && (
            <div className="letter animate-slide-out">
              HAPPY BIRTHDAY NICOLAS!!!{' '}
              <br />
              {`Happy turn to 24 years old. Now I can call you uncle hahahah.
Anyway I will just wish shortly. I hope you always in good health.
Alsooo I wish you goodluck on your study software engineering ⭐ Get all A for ittt. Last, I wish you success in your career life and love life. And again Happy Birthday ~`}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
