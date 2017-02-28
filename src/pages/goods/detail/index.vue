<template>
    <div class="goods-detail">
        <div class="screen">
            <img :src="detailGoods.image"/>
            <a class="back" @click.prevent.stop="goBack">
                <i class="o-icon o-icon-arrow-lift"></i>
            </a>
        </div>
        <div class="detail-info">
            <h5 class="name">{{detailGoods.name}}</h5>
            <div class="info">
                <span class="sales">月售&nbsp;{{detailGoods.sellCount}}</span>
                <span class="ratio">好评率&nbsp;{{detailGoods.rating}}</span>
            </div>
            <div class="control">
                <div class="price">¥{{detailGoods.price}}</div>
                <shop-control :food="detailGoods"
                              :onIncrement="onIncrement"
                              :onDecrement="onDecrement"
                />
            </div>
        </div>
        <div class="detail-description">
            <h5>商品信息</h5>
            <div class="description">{{detailGoods.info}}</div>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass">
    .goods-detail{
        position: fixed;
        z-index: 999;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .screen{
            position: relative;
            width: 100%;
            img{
                width: 100%;
                height: 100%;
            }
            .back{
                font-size: 24px;
                color: #ffffff;
                width: 24px;
                height: 24px;
                left: 5%;
                top: 5%;
                position: absolute;
            }
        }
        .detail-info{
            padding: 12px;
            border-bottom: 1px solid #c6c6c6;
            background-color: #ffffff;
            margin-bottom: 5%;
            .name{
                margin: 0;
                font-size: 16px;
            }
            .info{
                color: #c3c3c3;
                font-size: 12px;
                margin: 12px 0;
            }
            .control{
                display: flex;
                line-height: 24px;
                .price{
                    flex: 1;
                    color: #f01414;
                    vertical-align: middle;
                }
            }
        }
        .detail-description{
            background-color: #ffffff;
            padding: 12px;
            border-top: 1px solid #c6c6c6;
            border-bottom: 1px solid #c6c6c6;
            h5{
                margin: 0;
                font-size: 16px;
            }
            .description{
                text-indent: 2em;
                margin-top: 12px;
                line-height: 24px;
                font-size: 14px;
                vertical-align: middle;
            }
        }
    }
</style>
<script>
    import ShopControl from 'components/shop-control';
    import {GOODS_INCREMENT, GOODS_DECREMENT} from 'store/mutation-types';
    import {mapMutations} from 'vuex';
    export default {
      computed: {
        detailGoods () {
          return this.$store.state.goods.detailGoods
        }
      },
      methods: {
        ...mapMutations({
          onIncrement: GOODS_INCREMENT,
          onDecrement: GOODS_DECREMENT
        }),
        goBack () {
          window.location.hash = 'goods';
        }
      },
      components: {
        'shop-control': ShopControl
      }
    }
</script>
