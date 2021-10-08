/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { EmitterEvents, EmitterFunction, EmitterInterface } from '../types';

export class Emitter implements EmitterInterface {
  private events: EmitterEvents = {};

  on(name: keyof EmitterEvents, callback: EmitterFunction): void {
    if (this.events[name] === undefined) {
      this.events[name] = [callback];
    } else {
      this.events[name].push(callback);
    }
  }

  once(name: keyof EmitterEvents, callback: EmitterFunction): void {
    const listener = (...args: any[]) => {
      callback(...args);
      this.off(name, listener);
    };

    return this.on(name, listener);
  }

  emit(name: keyof EmitterEvents, ...args: any[]): void {
    const events = this.events[name];

    if (events === undefined) {
      return;
    }

    events.forEach((callback) => {
      callback(...args);
    });
  }

  off(name: keyof EmitterEvents, callback: EmitterFunction): void {
    const events = this.events[name];

    if (events === undefined) {
      return;
    }

    const index = events.findIndex((c) => c === callback);

    if (index < 0) {
      return;
    }

    events.splice(index, 1);
    this.events[name] = events;
  }
}
