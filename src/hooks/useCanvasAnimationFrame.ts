import useCanvasRef from "./useCanvasRef";

export interface AnimationFrame {
    width?: number;
    height?: number;
    context?: CanvasRenderingContext2D;
    init: () => void;
    update: () => void;
    show: () => void;
}


const useCanvasAnimationFrame = <S = any>(obj: S & AnimationFrame) => {
    const canvasRef = useCanvasRef((ref: HTMLCanvasElement) => {
        const context = ref.getContext("2d")!;
        const { width, height } = canvasRef.current!.getBoundingClientRect();
        obj.context = context;
        obj.width = width;
        obj.height = height;
        obj.init();
        let id: number;
        const timer = () => {
            id = requestAnimationFrame(timer);
            obj.update();
            obj.show();
        }

        timer();
        return () => {
            cancelAnimationFrame(id);
        }
    })

    return canvasRef;
}

export default useCanvasAnimationFrame;