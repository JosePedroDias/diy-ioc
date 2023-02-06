import { IParticle } from "./IParticle.js";

export class Particle implements IParticle {
    position: [number, number] = [0, 0];

    constructor(x: number = 0, y:number = 0) {
        this.position[0] = x;
        this.position[0] = y;
    }
    
    getPosition(): [number, number] {
        return this.position;
    }
}
