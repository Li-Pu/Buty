import { between } from "../../../utils";

export default class HSL {

    static formatH(h: number) {
        return Math.floor(h % 360);
    }

    static formatS(s: number) {
        return between(s, 0, 100);
    }

    static formatL(l: number) {
        return between(l, 0, 100);
    }

    #h: number;
    #s: number;
    #l: number;

    constructor(h: number, s: number, l: number) {
        this.#h = HSL.formatH(h);
        this.#s = HSL.formatH(s);
        this.#l = HSL.formatH(l);
    }

    get h() { return this.#h; }

    set h(h: number) {
        this.#h = Math.floor(h % 360);
    }

    get s() { return this.#s; }

    set s(s: number) {
        this.#s = HSL.formatS(s);
    }

    get l() { return this.#l; }

    set l(l: number) {
        this.#l = HSL.formatL(l);
    }

    toString() {
        return `hsl(${this.#h}, ${this.#s}%, ${this.#l}%)`
    }
}