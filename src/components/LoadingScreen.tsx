import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[var(--background)] z-50 flex items-center justify-center transition-opacity duration-500">
      <div className="loading-dot" />
    </div>
  );
};

export default LoadingScreen;