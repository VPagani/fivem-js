import { PointF, Vector3 } from '../utils';

export class Scaleform {
  protected handle: number;
  protected name: string;

  constructor(name: string) {
    this.name = name;
    this.handle = RequestScaleformMovie(this.name);
  }

  public get Handle(): number {
    return this.handle;
  }

  public get IsValid(): boolean {
    return this.handle !== 0;
  }

  public get IsLoaded(): boolean {
    return !!HasScaleformMovieLoaded(this.handle);
  }

  public dispose(): void {
    if (this.IsLoaded) {
      SetScaleformMovieAsNoLongerNeeded(this.handle);
    }
  }

  public callFunction(name: string, args: any[]): void {
    BeginScaleformMovieMethod(this.handle, name);
    args.forEach((arg) => {
      switch (typeof arg) {
        case 'number':
          PushScaleformMovieFunctionParameterInt(arg);
          break;
        case 'string':
          PushScaleformMovieFunctionParameterString(arg);
          break;
        case 'boolean':
          PushScaleformMovieFunctionParameterBool(arg);
          break;
        default:
          throw new Error(
            `Unknown argument type [${typeof arg}] passed to scaleform with handle [${
              this.handle
            }]`,
          );
      }
    });
    EndScaleformMovieMethod();
  }

  public render2D(): void {
    DrawScaleformMovieFullscreen(this.handle, 255, 255, 255, 255, 0);
  }

  public render2DScreenSpace(location: PointF, size: PointF): void {
    const x = location.x; /* UI.Screen.Width*/
    const y = location.y; /* UI.Screen.Height*/
    const width = size.x; /* UI.Screen.Width*/
    const height = size.y; /* UI.Screen.Height*/

    DrawScaleformMovie(
      this.handle,
      x + width / 2,
      y + height / 2,
      width,
      height,
      255,
      255,
      255,
      255,
      0,
    );
  }

  public render3D(position: Vector3, rotation: Vector3, scale: Vector3): void {
    DrawScaleformMovie_3dNonAdditive(
      this.handle,
      position.x,
      position.y,
      position.z,
      rotation.x,
      rotation.y,
      rotation.z,
      2,
      2,
      1,
      scale.x,
      scale.y,
      scale.z,
      2,
    );
  }

  public render3DAdditive(position: Vector3, rotation: Vector3, scale: Vector3): void {
    DrawScaleformMovie_3d(
      this.handle,
      position.x,
      position.y,
      position.z,
      rotation.x,
      rotation.y,
      rotation.z,
      2,
      2,
      1,
      scale.x,
      scale.y,
      scale.z,
      2,
    );
  }
}
