import { useCanvasAnimationFrame, useWindowSize } from "../../../hooks";
import FireWorks from "../../../objects/2d/fireworks/Fireworks";

const FireFoxView = () => {
    const { width, height } = useWindowSize();
    const canvasRef = useCanvasAnimationFrame<{
        fireworks: FireWorks | null,
    }>({
        fireworks: null,
        width,
        height,
        init() {
            this.fireworks = new FireWorks({
                width: this.width!,
                height: this.height!,
            })
        },
        update() {
            this.fireworks?.update();
        },
        show() {
            if (this.context) {
                this.context.clearRect(0, 0, this.width!, this.height!);
                this.context.fillStyle = `hsla(0,0,0,1)`;
                this.context.fillRect(0, 0, this.width!, this.height!);
                this.fireworks?.show(this.context);
            }
        }
    })

    return <canvas ref={canvasRef} width={width} height={height} />;
}

export default FireFoxView;