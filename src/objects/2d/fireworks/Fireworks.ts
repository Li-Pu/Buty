import FireWork from "./Firework";

export interface FireWorkOptions {
    width: number;
    height: number;
    // minX?: number;
    // maxX?: number;
    // minY?: number;
    // maxY?: number;    
}

export default class FireWorks {
    width: number;
    height: number;
    fireworks: Array<FireWork>
    constructor(options: FireWorkOptions) {
        const { width, height } = options;
        this.width = width;
        this.height = height;
        this.fireworks = [];
    }

    update() {
        if (Math.random() < 0.1) {
            this.fireworks.push(new FireWork({
                x: Math.random() * this.width,
                y: this.height,
                vy: -20 * (0.6 + Math.random()),
                explodeCount: 100 + Math.floor(200 * Math.random())
            }));
        }
        this.fireworks.forEach(v => v.update());
        this.fireworks = this.fireworks.filter(v => !v.burnOff);
    }

    show(ctx: CanvasRenderingContext2D) {
        this.fireworks.forEach(v => v.show(ctx));
    }
}