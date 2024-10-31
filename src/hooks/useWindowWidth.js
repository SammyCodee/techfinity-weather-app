import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    // Initialize state with a default value of 0 (or use a specific value if preferred)
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        // Only access `window` on the client side
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Set initial width on client-side only
        handleResize();

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowWidth;
};

export default useWindowWidth;