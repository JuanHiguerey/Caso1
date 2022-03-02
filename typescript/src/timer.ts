import { Console } from "console";

export class Timer {
    private start;

    constructor() {
        this.start = new Date().getMilliseconds();
    }

    Start() {
        
    }

    GetTime() {
        return new Date().getMilliseconds() - this.start;
    }
}