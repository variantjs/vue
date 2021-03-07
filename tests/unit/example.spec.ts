import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/TInput.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    console.log(wrapper.html())
    expect(wrapper.html()).toEqual(msg)
  })
})
