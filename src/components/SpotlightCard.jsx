import { useRef, useState } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.08)', // Indigo-colored glow
  borderColor = 'var(--card-border)',
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-2xl border bg-[var(--card-bg)] backdrop-blur-md transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-500/10 ${className}`}
      style={{
        borderColor: isFocused ? 'transparent' : borderColor,
        ...props.style,
      }}
      {...props}
    >
      {/* Spotlight border glow */}
      {isFocused && (
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl transition duration-300"
          style={{
            background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(129, 140, 248, 0.35), transparent 70%)`,
            zIndex: 0,
          }}
        />
      )}

      {/* Spotlight background glow */}
      <div
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          background: isFocused
            ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`
            : '',
          zIndex: 0,
        }}
      />

      {/* Inner Content */}
      <div className="relative z-10 h-full w-full flex flex-col flex-grow min-w-0">
        {children}
      </div>
    </div>
  );
}
