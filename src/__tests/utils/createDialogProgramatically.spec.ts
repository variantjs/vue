import { DialogIcon, DialogType } from '@variantjs/core';
import { VariantJSConfiguration } from '../..';
import createDialogProgramatically from '../../utils/createDialogProgramatically';
import TDialog from '@/components/TDialog.vue';

describe('createDialogProgramatically', () => {
  const configuration: VariantJSConfiguration = {};
  let originalMounted: any;
  let component: any;

  beforeEach(() => {
    originalMounted = TDialog.mounted;

    TDialog.mounted = function () {
      component = this;
    };
  });

  afterEach(() => {
    TDialog.mounted = originalMounted;

    component = undefined;
  });

  it('creates a dialog with a title, text and icon', () => {
    const promise = createDialogProgramatically(
      configuration,
      DialogType.Alert,
      'The title',
      'The text',
      DialogIcon.Error,
    );

    expect(promise).toBeInstanceOf(Promise);

    expect(component.title).toEqual('The title');
    expect(component.text).toEqual('The text');
    expect(component.icon).toEqual(DialogIcon.Error);
    expect(component.type).toEqual(DialogType.Alert);
  });

  it('creates a dialog with configuration', async () => {
    const promise = createDialogProgramatically(
      configuration,
      DialogType.Alert,
      {
        title: 'The title',
        text: 'The text',
        icon: DialogIcon.Error,
      },
    );

    expect(promise).toBeInstanceOf(Promise);

    expect(component.title).toEqual('The title');
    expect(component.text).toEqual('The text');
    expect(component.icon).toEqual(DialogIcon.Error);
    expect(component.type).toEqual(DialogType.Alert);
  });

  it('unmounts the dialog when promise resolved', async () => {
    const unmountMock = jest.fn();
    TDialog.unmounted = unmountMock;

    createDialogProgramatically(
      configuration,
      DialogType.Alert,
      {
        title: 'The title',
        text: 'The text',
        icon: DialogIcon.Error,
        focusOnOpen: false,
        disableBodyScroll: false,
      },
    );

    component.onUnmounted = unmountMock;

    component.onBeforeHide({
      cancel: () => null,
      reason: 'other',
    });

    component.onHidden();

    await component.$nextTick();

    expect(unmountMock).toHaveBeenCalled();
  });

  it('unmounts the dialog when promise rejected', async () => {
    const unmountMock = jest.fn();
    TDialog.unmounted = unmountMock;

    const promise = createDialogProgramatically(
      configuration,
      DialogType.Prompt,
      {
        title: 'The title',
        text: 'The text',
        icon: DialogIcon.Error,
        focusOnOpen: false,
        disableBodyScroll: false,
      },
    );

    promise.catch(() => {
      expect(true).toBe(true);
    });

    component.onUnmounted = unmountMock;

    component.onBeforeHide({
      cancel: () => null,
      reason: 'cancel',
    });

    component.onHidden();

    await component.$nextTick();
    await component.$nextTick();

    expect(unmountMock).toHaveBeenCalled();
  });
});
