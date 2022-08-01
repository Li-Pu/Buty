import { HSLA } from "../../common/color";
import { CAR, GRAVITY } from "./constants";

export interface FireWorkParticalOptions {
    x: number; // 横向位置
    y: number; // 纵向位置
    coordinatesCount?: number; // 焰尾信息存储
    vx?: number; // 横向速度
    vy: number; // 纵向速度
    car?: number; // 空气阻力系数
    color?: HSLA; // 颜色
    decay?: number; // 颜色减淡的速率
    burnOffCondition?: (partical: FireWorkPartical) => boolean; // 监测是否燃烧殆尽
}


class FireWorkPartical {
    x: number;
    y: number;
    coordinates: Array<{ x: number, y: number }>;
    coordinatesCount: number;
    vx: number;
    vy: number;
    car: number; // 空气阻力系数
    gravity: number;
    color: HSLA;
    decay: number; // 颜色减淡的速率
    burnOff: boolean; // 是否燃烧殆尽
    burnOffCondition: () => boolean; // 监测是否燃烧殆尽


    constructor(options: FireWorkParticalOptions) {
        const { x, y, coordinatesCount, vx, vy, car, color, decay, burnOffCondition } = options;
        this.x = x;
        this.y = y;
        this.coordinatesCount = coordinatesCount ?? 3;
        this.coordinates = new Array(this.coordinatesCount).fill(0).map(() => ({ x: this.x, y: this.y }));
        this.vx = vx ?? 0;
        this.vy = vy ?? 0;
        this.car = car ?? CAR;
        this.gravity = GRAVITY;
        this.color = color ?? new HSLA(Math.floor(360 * Math.random()), 100, 50, 1);
        this.decay = decay ?? 0;
        this.burnOff = false;
        this.burnOffCondition = () => {
            if (burnOffCondition) {
                return burnOffCondition(this);
            }
            return false;
        }
    }

    update() {
        if (!this.burnOff) {
            this.coordinates.pop();
            this.coordinates.unshift({
                x: this.x, y: this.y,
            });
            this.vx = this.vx * (1 - this.car);
            this.x += this.vx;
            this.vy = (this.vy + this.gravity) * (1 - this.car);
            this.y += this.vy;
            this.color.a = this.color.a - this.decay;
            if (this.burnOffCondition()) {
                this.burnOff = true;
            }
        }
    }

    show(ctx: CanvasRenderingContext2D) {
        if (!this.burnOff) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = this.color.toString();
            const { x, y } = this.coordinates[this.coordinates.length - 1];
            ctx.moveTo(x, y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }
}

export default FireWorkPartical;