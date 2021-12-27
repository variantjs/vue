/* eslint-disable vue/one-component-per-file */
import { createApp } from 'vue';
import { variantJS } from '..';
import { VariantJSConfiguration } from '../types';
import { Emitter } from '../utils/emitter';

describe('plugin installer', () => {
  it('provides the configuration', () => {
    const app = createApp({});

    const configuration: VariantJSConfiguration = {
      TInput: {
        placeholder: 'Whatever',
      },
    };

    app.use(variantJS, configuration);

    const component = app.component('ExampleComponent', {});

    // eslint-disable-next-line no-underscore-dangle
    expect(component._context.provides.configuration).toEqual(configuration);
  });

  it('handles an empty configuration', () => {
    const app = createApp({});

    app.use(variantJS);

    const component = app.component('ExampleComponent', {});

    // eslint-disable-next-line no-underscore-dangle
    expect(component._context.provides.configuration).toEqual({});
  });

  it('provides an emitter ', () => {
    const app = createApp({});

    app.use(variantJS);

    // eslint-disable-next-line no-underscore-dangle
    expect(app._context.provides.emitter).toBeInstanceOf(Emitter);
  });

  it('adds a $modal util as a global property', () => {
    const app = createApp({});

    app.use(variantJS);

    expect(typeof app.config.globalProperties.$modal).toBe('object');

    expect(typeof app.config.globalProperties.$modal.show).toBe('function');

    expect(typeof app.config.globalProperties.$modal.hide).toBe('function');
  });

  it('adds a $dialog util as a global property', () => {
    const app = createApp({});

    app.use(variantJS);

    expect(typeof app.config.globalProperties.$dialog).toBe('object');

    expect(typeof app.config.globalProperties.$dialog.show).toBe('function');

    expect(typeof app.config.globalProperties.$dialog.hide).toBe('function');
    expect(typeof app.config.globalProperties.$dialog.alert).toBe('function');
    expect(typeof app.config.globalProperties.$dialog.prompt).toBe('function');
    expect(typeof app.config.globalProperties.$dialog.confirm).toBe('function');

    expect(typeof app.config.globalProperties.$alert).toBe('function');
    expect(typeof app.config.globalProperties.$prompt).toBe('function');
    expect(typeof app.config.globalProperties.$confirm).toBe('function');
  });

  it('the alert, prompt and confirm methods are callable', () => {
    const app = createApp({});

    app.use(variantJS);

    expect(app.config.globalProperties.$confirm('Title')).toBeInstanceOf(Promise);
    expect(app.config.globalProperties.$alert('Title')).toBeInstanceOf(Promise);
    expect(app.config.globalProperties.$prompt('Title')).toBeInstanceOf(Promise);
  });
});
