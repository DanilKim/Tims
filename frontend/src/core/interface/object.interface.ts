export interface IObject {
  id: number;
  name: string;
  type: string;
  path: string;
  display: boolean;
}

export interface IVector3 {
  x: number;
  y: number;
  z: number;
}

export interface ITransform {
  position: IVector3;
  scale: IVector3;
  rotation: IVector3;
}

export interface ITransformArray {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}
    