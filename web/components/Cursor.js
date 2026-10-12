import { useState, useEffect } from "react"
import styles from './cursor.module.scss'

// This functional component represents a custom cursor with a flare effect.
function Cursor() {
  // State to track the current cursor position (x, y coordinates).
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State to track whether the cursor is over a clickable element.
  const [isPointer, setIsPointer] = useState(false);

  // Event handler for the mousemove event.
  const handleMouseMove = (e) => {
    // Update the cursor position based on the mouse coordinates.
    setPosition({ x: e.clientX, y: e.clientY });

    // Get the target element that the cursor is currently over.
    const target = e.target;

    // Check if the cursor is over a clickable element by inspecting the cursor style.
    setIsPointer(
      window.getComputedStyle(target).getPropertyValue("cursor") === "pointer"
    );
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const flareSize = isPointer ? 0 : 1.5;
  const cursorStyle = isPointer ? { left: "-100px", top: "-100px" } : {};

  return (
    <div
      className={`${styles.cursor} ${isPointer ? "pointer" : ""}`}
      style={{
        ...cursorStyle,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${flareSize}rem`,
        height: `${flareSize}rem`,
      }}
    >
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="url(#paint0_linear_308_532)" />
        <defs>
          <linearGradient id="paint0_linear_308_532" x1="8" y1="7.5" x2="42" y2="46" gradientUnits="userSpaceOnUse">
            <stop stop-color="#73FF48" />
            <stop offset="1" stop-color="#FFF964" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  );
}

export default Cursor;