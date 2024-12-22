import React, { useEffect, useState } from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % 9);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isHovering]);

    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
            <div className="max-w-md text-center">
                <div
                    className="grid grid-cols-3 gap-3 mb-8 relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`
                aspect-square rounded-2xl 
                transition-all duration-500 ease-in-out
                cursor-pointer
                transform hover:scale-105
                ${i === activeIndex || (isHovering && i === activeIndex)
                                    ? 'bg-primary shadow-lg scale-105'
                                    : 'bg-primary/10 hover:bg-primary/20'}
                ${i % 2 === 0 ? 'hover:rotate-3' : 'hover:-rotate-3'}
              `}
                            onMouseEnter={() => isHovering && setActiveIndex(i)}
                            style={{
                                animation: i === activeIndex && !isHovering
                                    ? 'bounce 0.5s ease-in-out'
                                    : 'none'
                            }}
                        />
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4 transition-opacity duration-300">
                    {title}
                </h2>
                <p className="text-base-content/60 transition-opacity duration-300">
                    {subtitle}
                </p>
            </div>
            <style>
                {`
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `}
            </style>
        </div>
    );
};

export default AuthImagePattern;