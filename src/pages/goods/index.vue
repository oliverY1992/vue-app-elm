<template>
    <div>
        <transition name="page-slide">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <shop-cart :onIncrement="addFood"
                   :onDecrement="removeFood"
                   :onClear="clearFood"
                   :selectedGoods="selectedGoods"
                   :minPrice="minPrice"
                   :deliveryPrice="deliveryPrice" />
    </div>
</template>
<style>
    .page-slide-enter-active,
    .page-slide-leave-active{
        transition-duration: 400ms;
    }
    .page-slide-enter{
        transform: translate(100%, 0);
    }
    .page-slide-leave-active{
        transform: translate(0, 0);
    }
</style>
<script>
    import ShopCart from 'components/shop-cart';
    import {mapState, mapMutations} from 'vuex';
    import {GOODS_INCREMENT, GOODS_DECREMENT, GOODS_CLEAR, GOODS_SELECTED} from 'store/mutation-types';
    export default {
      data () {
        return {
          activeIndex: 0
        }
      },
      components: {
        'shop-cart': ShopCart
      },
      computed: {
        ...mapState({
          goods: state => state.goods.goods,
          selectedGoods: state => state.goods.selectedGoods,
          minPrice: state => state.app.seller.minPrice,
          deliveryPrice: state => state.app.seller.deliveryPrice
        })
      },
      watch: {
        activeIndex (newVal) {
          const itemHeight = this.$el.querySelector('.detail-item').clientHeight;
          const categoryHeight = this.$el.querySelector('.category').clientHeight;
          let dist = 0;
          this.goods.forEach((c, i) => {
            if (i < newVal) {
              dist += categoryHeight;
              dist += itemHeight * c.foods.length;
            }
          });
          this.$refs.scroller.scrollTo(-dist);
        }
      },
      methods: {
        onRefresh (done) {
          done();
        },
        fetchData () {
          this.$store.dispatch('fetchGoods');
        },
        selectDetail (detail) {
          const id = this.$route.params.id;
          this.$store.commit(GOODS_SELECTED, detail);
          window.location.hash = `/goods/${id}`;
        },
        ...mapMutations({
          addFood: GOODS_INCREMENT,
          removeFood: GOODS_DECREMENT,
          clearFood: GOODS_CLEAR
        }),
        selectTab (index) {
          this.activeIndex = index;
        }
      },
      created () {
        this.fetchData();
      }
    }

</script>
