import { useEffect, useRef, useState } from 'react';

export default function PortfolioVideo({ children, ...props }) {
    const videoRef = useRef(null);
    const [nearViewport, setNearViewport] = useState(false);

    useEffect(() => {
        if (!('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setNearViewport(true);
                observer.disconnect();
            }
        }, { rootMargin: '200px' });
        observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <video {...props} ref={videoRef} playsInline preload={nearViewport ? 'metadata' : 'none'}>
            {children}
        </video>
    );
}
