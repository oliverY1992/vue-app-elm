<template>
    <div class="seller">
        <div class="base">
            <div class="banner">
                <div class="left">
                    <h3 class="name">{{name}}</h3>
                    <div>
                        <star :size="36" :score="score" style="display: inline-block"></star>
                        <span class="count">({{commentCount}})</span>
                        <span class="sales">{{sales}}</span>
                    </div>
                </div>
                <div class="right">
                    <div class="heart"
                         @click="toggleFavorite"
                         :class="{'favorite': isFavorite}"
                    >
                        <i class="o-icon o-icon-favorite"></i>
                    </div>
                    <span>收藏</span>
                </div>
            </div>
            <div class="info">
                <div class="min-price">
                    <div class="text">起送价</div>
                    <div class="data"><b>{{minPrice}}</b>元</div>
                </div>
                <div class="delivery-price">
                    <div class="text">商家配送</div>
                    <div class="data"><b>{{deliveryPrice}}</b>元</div>
                </div>
                <div class="delivery-time">
                    <div class="text">平均配送时间</div>
                    <div class="data"><b>{{deliveryTime}}</b>分钟</div>
                </div>
            </div>
        </div>
        <div class="activities">
            <div class="public">
                <h5>公告与活动</h5>
                <p class="text">{{bulletin}}</p>
            </div>
            <ul class="activities-list">
                <li v-for="support in supports">
                    <icon :type="support.type"/>
                    <span class="description">{{support.description}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass">
    .seller{
        border-bottom: 1px solid #c6c6c6;
        .base{
            background-color: #ffffff;
            padding: 12px;
            box-sizing: border-box;
            border-bottom: 1px solid #c6c6c6;
            margin-bottom: 5%;
            .banner{
                display: flex;
                box-sizing: border-box;
                padding: 12px 0;
                border-bottom: 1px solid #f1f1f1;
                .left{
                    flex:5;
                    font-size: 12px;
                    line-height: 16px;
                    vertical-align: middle;
                    .name{
                        margin: 0 0 6px 0;
                        font-size: 14px;
                    }
                    .count{
                        padding: 0 12px;
                    }
                }
                .right{
                    flex: 1;
                    text-align: center;
                    .heart{
                        color: #c3c3c3;
                        font-size: 18px;
                        &.favorite{
                            color: #f01414;
                        }
                    }
                    &>span{
                        font-size: 12px;
                    }
                }
            }
            .info{
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 12px 0;
                .text{
                    color: #c6c6c6;
                    font-size: 12px;
                }
                .data{
                    font-size: 12px;
                    padding-top: 12px;
                    &>b{
                        font-size: 18px;
                    }
                }
                .min-price{
                    flex: 1;
                    border-right: 1px solid #f1f1f1;
                }
                .delivery-price{
                    flex: 1;
                    border-right: 1px solid #f1f1f1;
                }
                .delivery-time{
                    flex: 1;
                }
            }
        }
        .activities{
            background-color: #ffffff;
            padding: 5% 12px;
            border-top: 1px solid #c6c6c6;
            .public{
                &>h5{
                    margin: 0;
                }
                .text{
                    color: #f01414;
                    font-size: 12px;
                    line-height: 24px;
                    padding: 0 12px;
                }
            }
            .activities-list{
                &>li{
                    padding: 12px 0;
                    font-size: 12px;
                    &:not(:last-of-type){
                        border-bottom: 1px solid #f1f1f1;
                    }
                    .description{
                        padding-left: 12px;
                    }
                }
            }
        }
    }
</style>
<script>
    import {mapState} from 'vuex';
    import star from 'components/star/star';
    import icon from 'components/icon';
    export default {
      data () {
        return {
          isFavorite: false
        }
      },
      computed: mapState({
        minPrice: state => state.app.seller.minPrice,
        deliveryPrice: state => state.app.seller.deliveryPrice,
        deliveryTime: state => state.app.seller.deliveryTime,
        score: state => state.app.seller.score,
        name: state => state.app.seller.name,
        sales: state => state.app.seller.sellCount,
        bulletin: state => state.app.seller.bulletin,
        supports: state => state.app.seller.supports,
        commentCount: state => state.app.seller.ratingCount
      }),
      methods: {
        toggleFavorite () {
          this.isFavorite = !this.isFavorite;
        }
      },
      components: {
        icon,
        star
      }
    }
</script>
