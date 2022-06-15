import { action, makeObservable, observable } from "mobx";

export class ModeStore {
  rootStore;

  camMode = 'orbit';

  constructor(root) {
    makeObservable(this, {
      camMode: observable,
      setCamMode: action
    })

    this.rootStore = root;
  }

  setCamMode = (camMode) => {
      this.camMode = camMode;
  }

}