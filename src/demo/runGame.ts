import { inject, getClass } from '../ioc/index.js';
import { IChat } from './IChat.js';
import { IParticle } from './IParticle.js';

class Program {
    @inject('IChat') chatty: IChat;
    //chatty: IChat = getInstance('IChat');

    go() {
        console.log('result of calling this.chatty.chat()', this.chatty.chat() );

        const Particle = getClass<IParticle>('IParticle');
        // @ts-ignore TODO why a number of args error?
        const p1 = new Particle(2, 1);
        const p2 = new Particle();
        console.log('result of p1.getPosition()', p1.getPosition());
        console.log('result of p2.getPosition()', p2.getPosition());
    }
}

export function runGame() {
    const prog = new Program();
    prog.go();
}
