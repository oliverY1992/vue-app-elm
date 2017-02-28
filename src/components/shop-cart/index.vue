<template>
    <div>
        <div class="shop-cart">
            <div class="wrapper">
                <div class="wrapper-left">
                    <div class="cart-wrapper">
                        <div class="outer" :class="cartStatus" @click.prevent.stop="toggleCart">
                            <div class="inner">
                                <span class="cart">
                                    <i class="o-icon o-icon-shopcart"></i>
                                </span>
                                <span class="count">{{totalCount}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="price-wrapper">
                        ¥<span class="price">{{totalPrice}}</span>
                    </div>
                    <div class="info-wrapper">
                        另需配送费¥<span>{{deliveryPrice}}</span>元
                    </div>
                </div>
                <div :class="descriptionClass" class="wrapper-right">
                    {{paymentDescription}}
                </div>
            </div>
        </div>
        <transition name="cart-slide">
            <div class="cart-list" v-show="isShowCart">
                <div class="header">
                    <div class="text">购物车</div>
                    <div class="clear">
                        <a @click.prevent.stop="clear">清空</a>
                    </div>
                </div>
                <ul class="detail-list">
                    <li v-for="item in selectedGoods" :key="item.id">
                        <h5 class="name">{{item.name}}</h5>
                        <div class="control">
                            <span class="price">¥{{item.price}}</span>
                            <shop-control :onIncrement="onIncrement" :onDecrement="onDecrement" :food="item"/>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
        <transition name="modal-fade">
            <div @click.stop.prevent="toggleCart" class="modal" v-show="isShowCart"></div>
        </transition>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass">
    .shop-cart{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 48px;
        z-index: 1001;
        .wrapper{
            display: flex;
            height: 100%;
            line-height: 48px;
            .wrapper-left{
                flex: 4;
                display: flex;
                background-color: #101010;
                .cart-wrapper{
                    position: relative;
                    flex: 1;
                    .outer{
                        position: absolute;
                        top: -12px;
                        left: 20px;
                        border-radius: 50%;
                        border: 4px solid #101010;
                        &.disabled{
                            .inner{
                                background-color:#2b333b;
                                color: #c6c6c6;
                            }
                        }
                        .inner{
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            background-color: #00a0dc;
                            .cart {
                                font-size: 28px;
                                text-align: center;
                                color: #ffffff;
                                display: block;
                                line-height: 40px;
                            }
                            .count{
                                background-color: #f01414;
                                color: #fff;
                                position: absolute;
                                right: -15%;
                                top: -10%;
                                width: 24px;
                                border-radius: 4px;
                                height: 14px;
                                line-height: 14px;
                                font-size: 10px;
                                text-align: center;
                                box-shadow: 2px 2px 12px 0 rgba(0,0 ,0, .2);
                            }
                        }
                    }
                }
                .price-wrapper{
                    flex: 1;
                    text-align: center;
                    color: #c6c6c6;
                }
                .info-wrapper{
                    flex: 3;
                    text-align: center;
                    color: #c6c6c6;
                }
            }
            .wrapper-right{
                flex: 1;
                text-align: center;
                font-size: 12px;
                &.not-enough{
                    background-color: #2b333b;
                    color: #c6c6c6;
                }
                &.enough{
                    background-color: #00b43c;
                    color: #f1f1f1;
                }
            }
        }
    }
    .cart-list{
        position: fixed;
        transition-duration: 0.4s;
        z-index: 1000;
        width: 100%;
        bottom: 48px;
        transform: translate(0, 0);
        overflow: auto;
        max-height: 50%;
        left: 0;
        .header{
            display: flex;
            padding: 12px;
            font-size: 12px;
            background-color: #f1f1f1;
            .text{
                flex: 1;
                text-align: left;
                color: #c6c6c6;
            }
            .clear{
                flex: 1;
                text-align: right;
                &>a{
                    color: #00a0dc;
                }
            }
        }
        .detail-list{
            background-color: #ffffff;
            &>li{
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 12px;
                padding: 8px 0;
                box-sizing: border-box;
                &:not(:last-of-type){
                    border-bottom: 1px solid #f1f1f1;
                }
                .name{
                    flex: 1;
                    font-size: 14px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    margin: 0;
                }
                .control{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .price{
                        flex: 1;
                        font-size: 14px;
                        text-align: center;
                        color: #f01414;
                    }
                    .cart-control{
                        flex:4;
                    }
                }
            }
        }
    }
    .cart-slide-enter-active,
    .cart-slide-leave-active{
        transition-duration: 0.4s;
    }
    .cart-slide-enter,.cart-slide-leave-active{
        transform: translate(0, 100%);
    }
    .modal{
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.6);
    }
    .modal-fade-enter-active,
    .modal-fade-leave-active{
        transition-duration: 0.25s;
    }
    .modal-fade-enter, .modal-fade-leave-active{
        opacity: 0;
    }
</style>
<script>
    import ShopControl from 'components/shop-control';
    export default {
      components: {
        'shop-control': ShopControl
      },
      props: {
        selectedGoods: {
          type: Array
        },
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        },
        onIncrement: Function,
        onDecrement: Function,
        onClear: Function
      },
      data () {
        return {
          showCart: false
        }
      },
      methods: {
        toggleCart () {
          if (this.selectedGoods.length === 0) return;
          this.showCart = !this.showCart;
        },
        clear () {
          this.showCart = false;
          this.onClear();
        }
      },
      computed: {
        isShowCart () {
          return this.selectedGoods.length > 0 && this.showCart;
        },
        cartStatus () {
          return {
            'disabled': this.selectedGoods.length === 0
          }
        },
        totalPrice () {
          let total = 0;
          for (let id in this.selectedGoods) {
            const {price, count} = this.selectedGoods[id];
            total += price * count;
          }
          return total;
        },
        totalCount () {
          let totalCount = 0;
          for (let id in this.selectedGoods) {
            const {count} = this.selectedGoods[id];
            totalCount += count;
          }
          return totalCount;
        },
        paymentDescription () {
          let diff = this.minPrice - this.totalPrice;
          if (!this.totalPrice) {
            return `¥ ${this.minPrice}起送`;
          } else if (diff > 0) {
            return `还差¥${diff}`;
          } else {
            return '去结账';
          }
        },
        descriptionClass () {
          let diff = this.minPrice - this.totalPrice;
          return {
            'not-enough': diff > 0,
            'enough': diff <= 0
          }
        }
      }
    }
</script>
