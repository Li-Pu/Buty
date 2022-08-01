export const between = (v: number, min: number, max: number) => {
    if (min > max) {
        [min, max] = [max, min];
    }
    if (v < min) v = min;
    if (v > max) v = max;
    return v;
}

export const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}