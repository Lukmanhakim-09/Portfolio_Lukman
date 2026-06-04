import { useEffect, useState, useRef } from 'react';

export default function DecryptedText({
  text,
  speed = 50,
  delay = 200,
  maxIterations = 10,
  className = '',
  encryptedClassName = '',
  sequential = true,
  revealDirection = 'start', // 'start' | 'end' | 'center'
  useHover = false,
  triggerOnScroll = true,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef(null);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]:;<>,.?/~';

  useEffect(() => {
    if (!triggerOnScroll) {
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnScroll]);

  useEffect(() => {
    if (!hasTriggered) return;
    let timeoutId;
    let intervalId;

    if (useHover && !isHovered) {
      setDisplayText(text);
      return;
    }

    const startAnimation = () => {
      let currentIteration = 0;
      const textLength = text.length;

      intervalId = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              
              let isRevealedChar = false;
              if (sequential) {
                if (revealDirection === 'start') {
                  isRevealedChar = currentIteration > index;
                } else if (revealDirection === 'end') {
                  isRevealedChar = currentIteration > (textLength - index);
                } else {
                  // center
                  const center = textLength / 2;
                  const dist = Math.abs(index - center);
                  isRevealedChar = currentIteration > (center - dist) * 2;
                }
              } else {
                isRevealedChar = currentIteration > maxIterations;
              }

              if (isRevealedChar) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });

        currentIteration++;
        if (currentIteration > (sequential ? textLength + 5 : maxIterations)) {
          clearInterval(intervalId);
          setDisplayText(text);
          setIsRevealed(true);
        }
      }, speed);
    };

    timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay, maxIterations, sequential, isHovered, useHover, hasTriggered, revealDirection]);

  return (
    <span
      ref={containerRef}
      className={`${isRevealed ? className : encryptedClassName || className} transition-all duration-300`}
      onMouseEnter={() => useHover && setIsHovered(true)}
      onMouseLeave={() => useHover && setIsHovered(false)}
      {...props}
    >
      {displayText}
    </span>
  );
}
