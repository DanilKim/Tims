import { HelloStore } from "./helloStore";

export class RootStore{
  helloStore;

  constructor() {
    this.helloStore = new HelloStore(this);
  }
}