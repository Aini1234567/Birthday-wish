'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function HappyBirthdayPage() {
  const [showBirthday, setShowBirthday] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBirthday(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const CONFETTI_COUNT = 120;
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

  // Redirect after 6 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/second');
    }, 6000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="stage">
      <div id="confetti-layer" className="confetti-layer" aria-hidden="true" />

      <div className="headline">
        <h1 className="happy-text popout">🎉 HAPPY</h1>
        {showBirthday && <h1 className="birthday-text popout">BIRTHDAY!! 🎂✨</h1>}
      </div>

      <style jsx>{`
        .stage {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffdcdc, #d0f0ff);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 0 20px;
        }

        .headline {
          z-index: 2;
          text-align: center;
        }

        h1 {
          font-family: 'Luckiest Guy', cursive;
          font-size: 5rem;
          background: linear-gradient(90deg, #00b3b3, #800080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.6));
          margin: 0;
        }

        .birthday-text {
          margin-top: 0.3em;
          animation-delay: 0.1s;
        }

        .popout {
          animation: popout 1.5s ease-out forwards;
          opacity: 0;
          transform-origin: center;
        }

        @keyframes popout {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .confetti-layer {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1;
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

        @media (max-width: 600px) {
          h1 {
            font-size: 3rem;
          }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
