import { random } from "../../../utils";
import { HSLA } from "../../common/color";
import { EXPLODE_COUNT, EXPLODE_VELOCITY } from "./constants";
import FireWorkPartical from "./Partical";

export interface FireWorkOptions {
    x: number; // 横向位置
    y: number; // 纵向位置
    vx?: number; // 横向速度
    vy: number; // 纵向速度
    car?: number; // 空气阻力系数
    color?: HSLA; // 颜色
    explodeCount?: number; // 爆炸后的粒子数量
}

export default class FireWork {
    isExploded: boolean
    explodeV: number;
    explodeCount: number;
    partials: Array<FireWorkPartical>
    burnOff: boolean;

    constructor(options: FireWorkOptions) {
        const { explodeCount = EXPLODE_COUNT, ...rest } = options
        this.isExploded = false;
        this.explodeV = EXPLODE_VELOCITY;
        this.explodeCount = explodeCount;
        this.partials = [];
        this.partials.push(new FireWorkPartical({
            ...rest,
            burnOffCondition: (p: FireWorkPartical) => {
                return p.vy >= 0;
            }
        }));
        this.burnOff = false;
    }

    update() {
        if (this.burnOff) {
            return;
        }
        this.partials.forEach(p => p.update());
        if (!this.isExploded) {
            const partial = this.partials[0];
            if (partial.burnOff) {
                this.isExploded = true;
                const { x, y, color } = partial;
                this.partials = [];
                for (let i = 0; i < this.explodeCount; i++) {
                    const h = Math.floor(color.h + 20 * (Math.random() - 0.5));
                    const l = random(50, 80);
                    const randomEdge = Math.PI * 2 * Math.random();
                    const explodeV = Math.random() * this.explodeV;
                    this.partials.push(new FireWorkPartical({
                        x,
                        y,
                        vx: explodeV * Math.cos(randomEdge),
                        vy: explodeV * Math.sin(randomEdge),
                        color: new HSLA(h, color.s, l, color.a),
                        decay: random(0.015, 0.03),
                        coordinatesCount: 5,
                        burnOffCondition: (p: FireWorkPartical) => {
                            return p.color.a < p.decay;
                        }
                    }))
                }
            }
        } else {
            this.partials = this.partials.filter(p => !p.burnOff);
            if (this.partials.length === 0) {
                this.burnOff = true;
            }
        }
    }

    show(ctx: CanvasRenderingContext2D) {
        if (this.burnOff) {
            return;
        }
        this.partials.forEach(partial => partial.show(ctx));
    }
}