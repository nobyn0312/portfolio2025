"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const bigBallRef = useRef<HTMLDivElement | null>(null);
  const smallBallRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bigBall = bigBallRef.current;
    const smallBall = smallBallRef.current;
    const hoverables = document.querySelectorAll(".hoverable");

    if (!bigBall || !smallBall) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(bigBall, { x: e.pageX - 15, y: e.pageY - 15, duration: 0.4 });
      gsap.to(smallBall, { x: e.pageX - 5, y: e.pageY - 7, duration: 0.1 });
    };

    const onMouseHover = () => {
      gsap.to(bigBall, { scale: 4, duration: 0.3 });
    };

    const onMouseHoverOut = () => {
      gsap.to(bigBall, { scale: 1, duration: 0.3 });
    };

    document.body.addEventListener("mousemove", onMouseMove);
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseHover);
      el.addEventListener("mouseleave", onMouseHoverOut);
    });

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseHover);
        el.removeEventListener("mouseleave", onMouseHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor">
        <div className="cursor__ball cursor__ball--big" ref={bigBallRef}>
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
          </svg>
        </div>

        <div className="cursor__ball cursor__ball--small" ref={smallBallRef}>
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
          </svg>
        </div>
      </div>

      <div className="left">
        <h1>Hello</h1>
        <p>Check out this link:</p>
        <a className="hoverable">Hover meh</a>
      </div>

      <div className="right">
        <h1>Hello</h1>
        <p>Check out this link:</p>
        <a className="hoverable">Hover meh</a>
      </div>
    </>
  );
}
