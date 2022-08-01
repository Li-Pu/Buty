import { between } from '../../../utils';
import HSL from './hsl';

export default class HSLA extends HSL {

    static fromatA(a: number) {
        return between(a, 0, 1);

    }

    #a: number;

    constructor(h: number, s: number, l: number, a: number) {
        super(h, s, l);
        this.#a = HSLA.fromatA(a);
    }

    get a() { return this.#a; }

    set a(a: number) { this.#a = HSLA.fromatA(a); }

    toString() {
        return super.toString().replace('hsl', 'hsla').replace(')', `, ${this.#a})`);
    }
}