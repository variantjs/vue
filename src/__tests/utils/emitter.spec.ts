import { Emitter } from '../../utils/emitter';

describe('Emitter', () => {
  let emitter: Emitter;

  beforeEach(() => {
    emitter = new Emitter();
  });

  it('calls the function every time when a registered event is called every', () => {
    const eventFn = jest.fn();
    emitter.on('event-name', eventFn);
    expect(eventFn).not.toHaveBeenCalled();
    emitter.emit('event-name');
    expect(eventFn).toHaveBeenCalledTimes(1);
    emitter.emit('event-name');
    expect(eventFn).toHaveBeenCalledTimes(2);
  });

  it('calls the function only once on an event that is registered once', () => {
    const eventFn = jest.fn();
    emitter.once('event-name', eventFn);
    expect(eventFn).not.toHaveBeenCalled();
    emitter.emit('event-name');
    emitter.emit('event-name');
    expect(eventFn).toHaveBeenCalledTimes(1);
  });

  it('stops running a method when calling the off method', () => {
    const eventFn = jest.fn();
    const eventFn2 = jest.fn();
    emitter.on('event-name', eventFn);
    emitter.on('event-name', eventFn2);
    emitter.emit('event-name');
    expect(eventFn).toHaveBeenCalled();
    expect(eventFn2).toHaveBeenCalled();
    emitter.off('event-name', eventFn2);

    emitter.emit('event-name');
    expect(eventFn).toHaveBeenCalledTimes(2);
    expect(eventFn2).toHaveBeenCalledTimes(1);
  });

  it('handles unexisting events when emitting', () => {
    expect(() => {
      emitter.emit('event-name');
    }).not.toThrowError();
  });

  it('handles unexisting events when removing', () => {
    expect(() => {
      emitter.off('event-name', () => {});
    }).not.toThrowError();
  });

  it('handles unexisting events methods when removing', () => {
    expect(() => {
      emitter.on('event-name', () => {});
      emitter.off('event-name', () => {});
    }).not.toThrowError();
  });
});
