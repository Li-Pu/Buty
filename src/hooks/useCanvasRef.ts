import { useRef, useEffect } from "react";

const useCanvasRef = (fn: (ref: HTMLCanvasElement) => void) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        return fn(ref.current);
    }, [ref.current])

    return ref;
}

export default useCanvasRef;