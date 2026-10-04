import React, { useEffect, useState } from 'react';

const CustomCursor = ({ mode = 'default' }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorType, setCursorType] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'transform 0.08s ease-out, width 0.2s, height 0.2s, background-color 0.2s',
      }}
    >
      {cursorType === 'peach-arrow' ? (
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#EE9068',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(238, 144, 104, 0.4)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      ) : (
        <div
          style={{
            width: isHovered ? '24px' : '10px',
            height: isHovered ? '24px' : '10px',
            borderRadius: '50%',
            backgroundColor: '#1E1B18',
            opacity: 0.75,
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;