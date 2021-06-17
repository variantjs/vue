type EmitterFunction = (...args : unknown[]) => void;

type EmitterEvents = {
  [key: string]: EmitterFunction[]
};

export { EmitterEvents, EmitterFunction };
