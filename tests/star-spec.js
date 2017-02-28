import Star from 'components/star/star';

const getRenderInst = (Component, propsData) => {
    const Constructor = Vue.extend(Component);
    const vm = new Constructor({propsData});
    return vm;
};

describe('Component => Start', () => {
    it('is render correctly', () => {
        const vm = getRenderInst(Star, {
            score:4.8,
            size:48
        });
        expect(vm.$el.querySelectorAll('.on').length === 4);
        expect(vm.$el.querySelectorAll('.half').length === 1);
    })
})