import { IChat } from "./Chat";

export class John implements IChat {
    age: number;

    constructor(age: number) {
        this.age = age;
    }

    chat(): string {
        return `Hi. I am John and I am ${this.age} years old!`;
    }
}
