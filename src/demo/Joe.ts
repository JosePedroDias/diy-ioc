import { IChat } from "./IChat";

export class Joe implements IChat {
    chat(): string {
        return 'hi from Joe';
    }
}
