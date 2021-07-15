import { VNode } from 'vue';
import svgToVueComponent from '../../utils/svgToVueComponent';

describe('svgToVueComponent', () => {
  const svg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
><path
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  d="M6 18L18 6M6 6l12 12"
/></svg>`;

  it('should return a Vnode from an SVG string', () => {
    const component: VNode = svgToVueComponent(svg);
    expect(component.type).toBe('svg');

    expect(svgToVueComponent(svg).type).toBe('svg');
  });

  it('handle html element values', () => {
    const div = document.createElement('div');
    div.innerHTML = 'Hello World';

    const component: VNode = svgToVueComponent(div);

    expect(component.type).toBe('DIV');
  });

  it('handles invalid element values', () => {
    const component: VNode = svgToVueComponent('sfsd');

    expect(component.type).toBe('span');
  });
});
