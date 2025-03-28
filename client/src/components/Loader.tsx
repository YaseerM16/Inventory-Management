import React, { useState, useEffect } from 'react';

type FireLoadingProps = {
    renders: string; // Define the type for the props
};
const FireLoading: React.FC<FireLoadingProps> = ({ renders }) => {
    const [fireColor, setFireColor] = useState('red');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomColor = Math.floor(Math.random() * 360);
            setFireColor(`hsl(${randomColor}, 100%, 50%)`);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col justify-center align-center h-full items-center flex-grow w-full bg-gray-100">
            {/* Fireball Container */}
            <div className="relative flex justify-center items-center h-40 w-40 animate-pulse">
                {/* Fireball with Random Color, replaced with the image */}
                <div
                    className="absolute rounded-full h-40 w-40 opacity-70 animate-flame"
                    style={{
                        backgroundColor: fireColor,
                        backgroundImage: 'url("/round-image.jpeg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Centered Logo (static position) */}
                <div className="relative h-20 w-20">
                    <img
                        src="/logo.jpeg"
                        alt="Logo"
                        className="rounded-full object-contain"
                        sizes="80px" // Optional: hints for responsive images
                    />
                </div>
            </div>

            {/* Loading Text */}
            <p className="mt-4 text-orange-700 text-lg font-medium">{renders}...</p>

            {/* Tailwind's Animation Classes */}
            <style >{`
        .animate-flame {
          animation: flame 2s infinite ease-in-out;
        }

        @keyframes flame {
          0% {
            transform: scale(1) rotate(0deg) translateY(0);
          }
          50% {
            transform: scale(1.2) rotate(10deg) translateY(-5px);
          }
          100% {
            transform: scale(1) rotate(0deg) translateY(0);
          }
        }
      `}</style>
        </div>
    );
}

export default FireLoading;