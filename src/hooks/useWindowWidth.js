import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    // Initialize state with a default value of 0 (or use a specific value if preferred)
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        let timeout;
        /**
         * Only access `window` on the client side
         * setTimeout to add the debounce effect
         */
        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 300)
        };

        // Set initial width on client-side only
        handleResize();

        /**
         * Add resize event listener
         * Must use the text 'resize' as it is a standard event emitted by the browser when the window is resized
         */
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => {
            clearTimeout(timeout)
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowWidth;
};

export default useWindowWidth;