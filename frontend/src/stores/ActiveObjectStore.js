import { action, makeObservable, observable } from "mobx";

export class ActiveObjectStore {
  rootStore;

  active = false;
  name = null;

  constructor(root) {
    makeObservable(this, {
      active : observable,
      name : observable,
      setActive: action,
      inActive: action
    })

    this.rootStore = root;
  }

  setActive = (name) => {
    this.active = true;
    this.name = name;
  }

  inActive = () => {
    this.active = false;
    this.name = null;
  }

}
