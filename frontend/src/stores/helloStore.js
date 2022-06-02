import { makeObservable, observable } from "mobx";

export class HelloStore {
    rootStore;

    hello = null;

    constructor(root) {
        makeObservable(this, {
            hello : observable,
        })

        this.rootStore = root;
    }

}
