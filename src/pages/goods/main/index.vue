<template>
    <div class="goods">
        <ul class="goods-nav">
            <li v-for="(good, index) in goods"
                @click="selectTab(index)"
                :class="{'active': activeIndex === index}">
                <span>{{good.name}}</span>
            </li>
        </ul>
        <div class="goods-list">
            <scroll-list ref="scroller" :onRefresh="onRefresh">
                <ul>
                    <li v-for="good in goods">
                        <h3 class="category">{{good.name}}</h3>
                        <ul class="goods-detail-list">
                            <li class="detail-item" :key="detail.id"
                                v-for="detail in good.foods"
                                @click.prevent="selectDetail(detail)">
                                <div class="wrapper">
                                    <div class="thumbnail">
                                        <img :src="detail.icon" />
                                    </div>
                                    <div class="content">
                                        <h5 class="name">{{detail.name}}</h5>
                                        <div class="sales">
                                            <span class="count">月售:{{detail.sellCount}}</span>
                                            <span class="ratio">好评率:{{detail.rating}}%</span>
                                        </div>
                                        <div class="price">
                                            <div class="num">¥{{detail.price}}</div>
                                            <div class="add">
                                                <shop-control :food="detail"
                                                              :onDecrement="removeFood"
                                                              :onIncrement="addFood"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </scroll-list>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass">
    $height:178px;
    .goods{
        height: 558px;
        display:flex;
        .goods-nav{
            background-color: #f1f1f1;
            flex: 1;
            &>li{
                &.active{
                    background-color: #ffffff;
                }
                text-align: center;
                padding:0 8px;
                font-size: 12px;
                &>span{
                    display: block;
                    padding: 12px 0;
                    border-bottom: 1px solid #d5d5d5;
                }
            }
        }
        .goods-list{
            position: relative;
            background-color: #ffffff;
            flex: 4;
            .category{
                padding:8px 0;
                text-indent: 2em;
                margin: 0;
                color: #c6c6c6;
                background-color: #f1f1f1;
                font-size: 12px;
                font-weight: normal;
                border-left: 2px solid #c6c6c6;
                box-sizing: border-box;
            }
            .goods-detail-list{
                &>li{
                    padding: 0 14px;
                    .wrapper{
                        display: flex;
                        padding: 18px 0;
                        border-bottom: 1px solid #f1f1f1;
                        &:not(:last-of-type){
                            border-bottom: none;
                        }
                        .thumbnail{
                            flex: 1;
                            height: 56px;
                            width: 56px;
                            margin-right: 12px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .content{
                            position: relative;
                            flex: 3;
                            .name{
                                font-size: 16px;
                                font-weight: normal;
                                margin: 2px 0 8px 0;
                            }
                            .sales{
                                color: #c6c6c6;
                                font-size: 14px;
                                .count{
                                    margin-right: 8px;
                                }
                            }
                            .price{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .num{
                                    flex: 1;
                                    color: #f01414;
                                    font-size: 14px;
                                }
                                .add{
                                    flex: 1;
                                    text-align: right;
                                    color: #00a0dc;
                                    font-size: 24px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<script>
    import ScrollList from 'v-scroll-list';
    import ShopControl from 'components/shop-control';
    import {mapState, mapMutations} from 'vuex';
    import {GOODS_INCREMENT, GOODS_DECREMENT, GOODS_CLEAR, GOODS_SELECTED} from 'store/mutation-types';
    export default {
      data () {
        return {
          activeIndex: 0
        }
      },
      components: {
        'shop-control': ShopControl,
        'scroll-list': ScrollList
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
          const id = detail.id;
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
      mounted () {
        this.fetchData();
      }
    }
</script>
