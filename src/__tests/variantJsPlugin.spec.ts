/* eslint-disable vue/one-component-per-file */
import { createApp } from 'vue';
import variantJsPlugin, { VariantJSConfiguration } from '..';
import Emitter from '../utils/emitter';

describe('plugin installer', () => {
  it('adds the configuration to the provides', () => {
    const app = createApp({});

    const configuration: VariantJSConfiguration = {
      TInput: {
        placeholder: 'Wharever',
      },
    };

    app.use(variantJsPlugin, configuration);

    const component = app.component('Example', {});

    // eslint-disable-next-line no-underscore-dangle
    expect(component._context.provides.configuration).toEqual(configuration);
  });

  it('handles an empty configuration', () => {
    const app = createApp({});

    app.use(variantJsPlugin);

    const component = app.component('Example', {});

    // eslint-disable-next-line no-underscore-dangle
    expect(component._context.provides.configuration).toEqual({});
  });

  it('adds an emitter as a global property', () => {
    const app = createApp({});

    app.use(variantJsPlugin);

    // eslint-disable-next-line no-underscore-dangle
    expect(app.config.globalProperties.emitter).toBeInstanceOf(Emitter);
  });
});
