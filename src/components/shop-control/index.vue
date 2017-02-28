<template>
    <div class="shop-control">
        <transition name="fade-rotate">
            <div class="decrement" v-show="isPurchased" @click.stop="removeFood">
                <i class="o-icon o-icon-remove"></i>
            </div>
        </transition>
        <div class="count" v-show="isPurchased">{{food.count}}</div>
        <div class="increment" @click.stop="addFood">
            <i class="o-icon o-icon-add-circle"></i>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass">
    .shop-control{
        line-height: 24px;
        .decrement{
            display: inline-block;
            .o-icon{
                font-size: 24px;
                color: #00a0dc;
            }
            &.fade-rotate-enter-active,
            &.fade-rotate-leave-active{
                transition: 0.4s linear;
                transform: translate3d(0,0,0);
                .o-icon{
                    display: inline-block;
                    transform: rotate(0deg);
                }
            }
            &.fade-rotate-enter,
            &.fade-rotate-leave-active{
                transform: translate3d(24px, 0, 0);
                opacity: 0;
                .o-icon{
                    transform: rotate(180deg);
                }
            }
        }
        .count{
            transition: 0.4s linear;
            display: inline-block;
            font-size: 12px;
            padding: 0 6px;
            color: rgb(147, 153, 159);
            vertical-align: bottom;
        }
        .increment{
            position: relative;
            display: inline-block;
            font-size: 24px;
            color: #00a0dc;
        }
    }
</style>
<script>
    export default {
      props: {
        food: {
          type: Object,
          required: true
        },
        onIncrement: {
          type: Function
        },
        onDecrement: {
          type: Function
        }
      },
      computed: {
        isPurchased () {
          return !!this.food.count && this.food.count > 0;
        }
      },
      methods: {
        addFood () {
          if (this.food.count === undefined) {
            this.$set(this.food, 'count', 0);
          }
          this.food.count += 1;
          this.onIncrement(this.food);
        },
        removeFood () {
          if (!this.food.count) return;
          this.food.count -= 1;
          this.onDecrement(this.food);
        }
      }
    }
</script>
