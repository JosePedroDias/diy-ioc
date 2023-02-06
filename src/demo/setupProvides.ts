import { provide } from '../ioc/index.js';

import { John } from './John.js';
// import { Joe } from './Joe.js';

import { Particle } from './Particle.js';

export function setupProvides() {
    provide('IChat', John, [42]);
    //provide('IChat', Joe);

    provide('IParticle', Particle);
}
