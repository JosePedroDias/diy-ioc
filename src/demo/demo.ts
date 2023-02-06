import { provide, inject, loggedMethod, testAttribute } from '../index.js';
import { IChat } from './Chat.js';

import { John } from './John.js';


// 1. WIRE STUFF

provide('IChat', John, [42]);


// 2. USE IT

class Program {
    //@inject chatty: IChat;

    @testAttribute counter: 32;

    chatty: IChat;

    constructor() {
        this.chatty = new John(44);
    }

    @loggedMethod go(i: number, s: string) {
        console.log( this.chatty.chat() );
        console.log( this.counter );
    }
}

const prog = new Program();
prog.go(1, 'a');
