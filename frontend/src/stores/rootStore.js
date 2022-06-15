import { HelloStore } from "./HelloStore";
import { ActiveObjectStore } from "./ActiveObjectStore";
import { ModeStore } from "./modeStore";

export class RootStore{
  helloStore;
  ActiveObjectStore;
  modeStore;

  constructor() {
    this.HelloStore = new HelloStore(this);
    this.ActiveObjectStore = new ActiveObjectStore(this);
    this.ModeStore = new ModeStore(this);
  }
}