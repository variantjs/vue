/* eslint-disable @typescript-eslint/no-explicit-any */
type EmitterFunction = (...args : any[]) => void;

type EmitterEvents = {
  [key: string]: EmitterFunction[]
};

interface EmitterInterface {
  on(name: keyof EmitterEvents, callback: EmitterFunction): void;
  once(name: keyof EmitterEvents, callback: EmitterFunction): void;
  emit(name: keyof EmitterEvents, ...args: any[]): void;
  emit(name: keyof EmitterEvents, ...args: any[]): void;
  off(name: keyof EmitterEvents, callback: EmitterFunction): void;
}

export { EmitterEvents, EmitterFunction, EmitterInterface };
