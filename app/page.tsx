"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function BirthdayDatePage() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleButton = (val: string) => {
    if (input.length >= 8) return;
    setInput((prev) => prev + val);
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (input === "28/05") {
      router.push("/first");
    } else {
      alert("Incorrect password!");
    }
    setInput("");
  };

  return (
    <div className="container">
      <BalloonBackground />
      <h1 className={`${pacifico.className} title`}>BIRTHDAY DATE</h1>

      <div className="calc-box">
        <div className="calc-content">
          <div className="calc-oval">
            <img src="/bd.jpg" alt="Birthday Bear" className="oval-image" />
          </div>

          <div className="calc-main">
            <div className="calc-display">
              <LockSVG />
              {input}
            </div>

            <div className="calc-keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button key={n} onClick={() => handleButton(String(n))}>
                  {n}
                </button>
              ))}
              <button onClick={() => handleButton("/")}>/</button>
              <button onClick={() => handleButton("0")}>0</button>
              <button
                onClick={handleDelete}
                className="delete-btn"
                aria-label="Delete"
              >
                <DeleteXSVG />
              </button>
              <button className="enter" onClick={handleEnter}>
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: #fcd6dd;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
        }
        .title {
          font-size: 3.2rem;
          color: #111;
          margin: 2.5rem 0;
          letter-spacing: 2px;
          user-select: none;
          text-align: center;
        }
        .calc-box {
          background: #a088e6;
          border-radius: 32px;
          width: 540px;
          max-width: 98vw;
          padding: 2.5rem 2.2rem;
          box-shadow: 0 8px 32px rgba(50, 30, 80, 0.1);
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .calc-content {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .calc-oval {
          width: 180px;
          height: 240px;
          border-radius: 50% / 55%;
          background: #fff;
          margin-right: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .oval-image {
          width: 92%;
          height: auto;
          object-fit: contain;
          border-radius: 50% / 55%;
        }
        .calc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .calc-display {
          background: #2c296d;
          border-radius: 12px;
          height: 48px;
          width: 220px;
          display: flex;
          align-items: center;
          padding-left: 18px;
          margin-bottom: 1.2rem;
          color: #fff;
          font-family: "Courier New", monospace;
          overflow-x: auto;
        }
        .calc-display svg {
          margin-right: 10px;
        }
        .calc-keypad {
          display: grid;
          grid-template-columns: repeat(3, 64px);
          grid-gap: 18px;
        }
        .calc-keypad button {
          background: #2c296d;
          color: #fff;
          font-size: 1.5rem;
          font-weight: bold;
          border: none;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          cursor: pointer;
          transition: background 0.15s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .calc-keypad button:active {
          background: #4f4c9a;
        }
        .delete-btn {
          background: #e18ca3 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .delete-btn svg {
          display: block;
        }
        .calc-keypad .enter {
          grid-column: span 3;
          border-radius: 18px;
          background: #232043;
          font-size: 1.2rem;
          font-weight: bold;
          height: 60px;
          width: 100%;
          margin-top: 8px;
        }
        @media (max-width: 700px) {
          .calc-box {
            padding: 1.2rem 0.2rem;
            width: 99vw;
          }
          .calc-content {
            flex-direction: column;
          }
          .calc-oval {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

function BalloonBackground() {
  const balloons = [
    [8, 12], [25, 60], [20, 32], [85, 16], [80, 60],
    [73, 40], [45, 90], [15, 80], [70, 80], [30, 78],
    [60, 15], [60, 60], [88, 80],
  ];
  return (
    <>
      {balloons.map(([x, y], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            zIndex: 0,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        >
          <BalloonSVG />
        </div>
      ))}
    </>
  );
}

function BalloonSVG() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
      <ellipse cx="20" cy="24" rx="15" ry="19" fill="#d3b3f7" stroke="#b08ed9" strokeWidth="2" />
      <ellipse cx="38" cy="24" rx="15" ry="19" fill="#f9b7c7" stroke="#e18ca3" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="4" ry="7" fill="#fff" opacity="0.4" />
      <ellipse cx="42" cy="16" rx="4" ry="7" fill="#fff" opacity="0.4" />
      <path d="M20 43 Q15 65 25 78" stroke="#b08ed9" strokeWidth="2" fill="none" />
      <path d="M38 43 Q43 65 33 78" stroke="#e18ca3" strokeWidth="2" fill="none" />
    </svg>
  );
}

function LockSVG() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="10" width="14" height="9" rx="2" fill="#fff" />
      <rect x="9" y="14" width="2" height="3" rx="1" fill="#a088e6" />
      <rect x="13" y="14" width="2" height="3" rx="1" fill="#a088e6" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

// Improved Delete X SVG, perfectly centered
function DeleteXSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#e18ca3" />
      <line x1="9" y1="9" x2="19" y2="19" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="9" x2="9" y2="19" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
