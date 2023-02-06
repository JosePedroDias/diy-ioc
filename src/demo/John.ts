import { IChat } from "./IChat";

export class John implements IChat {
    age: number;

    constructor(age: number) {
        //console.warn('GOT THIS PARAM', age);
        this.age = age;
    }

    chat(): string {
        return `Hi. I am John and I am ${this.age} years old!`;
    }
}
