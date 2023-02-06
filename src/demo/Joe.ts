import { IChat } from "./Chat";

export class Joe implements IChat {
    chat(): string {
        return 'hi from Joe';
    }
}
