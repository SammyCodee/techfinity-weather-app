import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    // State to hold the window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Function to update the width
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener on component mount
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowWidth;
};

export default useWindowWidth;