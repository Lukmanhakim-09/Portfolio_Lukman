import { useRef, useState, useEffect } from 'react';

export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoverSupported, setIsHoverSupported] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setIsHoverSupported(mediaQuery.matches);
    const handler = (e) => setIsHoverSupported(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (!isHoverSupported || !ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance from cursor to center of element
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    // Apply strength factor
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    if (!isHoverSupported) return;
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: isHoverSupported ? `translate3d(${position.x}px, ${position.y}px, 0)` : 'none',
      }}
    >
      {children}
    </div>
  );
}
