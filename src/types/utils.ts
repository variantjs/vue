type EmitterFunction = (...args : unknown[]) => void;

type EmitterEvents = {
  [key: string]: EmitterFunction[]
};

interface EmitterInterface {
  on(name: keyof EmitterEvents, callback: EmitterFunction): void;
  once(name: keyof EmitterEvents, callback: EmitterFunction): void;
  emit(name: keyof EmitterEvents, ...args: unknown[]): void;
  emit(name: keyof EmitterEvents, ...args: unknown[]): void;
  off(name: keyof EmitterEvents, callback: EmitterFunction): void;
}

export { EmitterEvents, EmitterFunction, EmitterInterface };
