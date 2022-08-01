import { useEffect, useState } from "react";

const useWindowSize = ({ width = window.innerWidth, height = window.innerHeight } = {}) => {
    const [windowWidth, setWindowWidth] = useState(width);
    const [windowHeight, setWindowHeight] = useState(height);

    useEffect(() => {
        const handler = (evt: Event) => {
            setWindowWidth((evt.target! as any).innerWidth);
            setWindowHeight((evt.target! as any).innerHeight);
            console.log((evt.target! as any).innerWidth, (evt.target! as any).innerHeight);

        };
        window.addEventListener('resize', handler)

        return () => {
            window.removeEventListener('resize', handler);
        }
    }, [])


    return { width: windowWidth, height: windowHeight };
}

export default useWindowSize;