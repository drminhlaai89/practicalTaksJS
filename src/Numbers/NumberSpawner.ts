import { UINumber } from "./UINumber";

export class NumberSpawner{
    private static lifetime = 1;

    static spawn(){
        new UINumber(this.lifetime)
    }
}