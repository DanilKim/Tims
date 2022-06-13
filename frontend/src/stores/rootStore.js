import { HelloStore } from "./HelloStore";
import { ActiveObjectStore } from "./ActiveObjectStore";

export class RootStore{
  helloStore;
  ActiveObjectStore;

  constructor() {
    this.HelloStore = new HelloStore(this);
    this.ActiveObjectStore = new ActiveObjectStore(this);
  }
}