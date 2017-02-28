<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="logo-bg" :style="bgStyle"></div>
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64"/>
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description + ' / ' + seller.deliveryTime + '分钟送达'}}
                </div>
                <div class="attraction" v-if="seller.attractions">
                    <span class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                <div class="attraction-count" v-if="seller.supports">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="count-arrow"></i>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <i class="bulletin-title"></i>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="bulletin-arrow"></i>
        </div>
        <transition name="fade">
            <div v-if="isDetailShow" class="detail">
                <div class="detail-wrapper">
                    <div class="detail-body">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <Star :size="48" :score="seller.score"/>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="attraction">
                            <li key="$index" class="attraction-item" v-for="item in seller.supports">
                                <icon :type="item.type"/>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"> </div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">{{seller.bulletin}}</div>
                    </div>
                    <div class="detail-close" @click="hideDetail">
                        <i class="icon-close">&times;</i>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass" modules>
    @import "../../styles/mixins/responsive";
    .header{
        position: relative;
        background: rgba(7,12,27,0.5);
        color: #fff;
        overflow: hidden;
        .content-wrapper{
            position: relative;
            display: flex;
            padding: 24px 12px 18px 24px;
            font-size: 12px;
            .logo-bg{
                filter: blur(10px);
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
            }
            .avatar{
                img{
                    border-radius: 2px;
                }
            }
            .content{
                margin-left: 16px;
                .title{
                    margin: 2px 0 8px 0;
                    font-size: 16px;
                    .brand{
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                        @include bg-img-responsive('brand');
                    }
                    .name{
                        margin-left: 6px;
                        font-size: 16px;
                        font-weight: bold;
                        line-height: 18px;
                    }
                }
                .description{
                    font-size: 12px;
                    margin-bottom: 10px;
                }
                .attraction{
                    .icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        &.decrement{
                            @include bg-img-responsive('decrease_1');
                        }
                        &.discount{
                            @include bg-img-responsive('discount_1');
                        }
                        &.insurance{
                            @include bg-img-responsive('guarantee_1');
                        }
                        &.invoice{
                            @include bg-img-responsive('invoice_1');
                        }
                        &.special{
                            @include bg-img-responsive('special_1');
                        }
                    }
                    .text{
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
                .attraction-count{
                    position: absolute;
                    right: 12px;
                    bottom: 18px;
                    padding: 0 8px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 14px;
                    background-color: rgba(0,0,0,0.2);
                    text-align: center;
                    .count{
                        font-size: 10px;
                    }
                    .count-arrow{
                        font-size: 10px;
                        margin-left: 2px;
                        line-height: 24px;
                    }
                }
            }
        }
        .bulletin-wrapper{
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: rgba(7,12,27,0.2);
            .bulletin-title{
                display: inline-block;
                margin-top: 8px;
                width: 22px;
                height: 12px;
                background-size: 100% 100%;
                background-repeat:no-repeat ;
                @include bg-img-responsive('bulletin');
            }
            .bulletin-text{
                font-size: 10px;
                margin: 0 4px;
            }
            .bulletin-arrow{
                position: absolute;
                font-size: 10px;
                right: 12px;
                top: 8px;
            }
        }
    }
    .detail{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1001;
        width: 100%;
        height: 100%;
        background-color: rgba(7,12,27,0.8);
        .detail-wrapper{
            width: 100%;
            min-height: 100%;
            .detail-body{
                margin: 64px 0;
                .name{
                    font-size: 16px;
                    font-weight: 700;
                    width: 100%;
                    color: #fff;
                    line-height: 16px;
                    text-align: center;
                }
                .star-wrapper{
                    margin: 16px 0 24px 0;
                    text-align: center;
                }
                .title{
                    display: flex;
                    width: 80%;
                    margin: 0 auto 24px auto;
                    .line{
                        display: inline-block;
                        flex: 1;
                        height: 1px;
                        background: rgba(255,255,255,0.25);
                        margin: auto;
                    }
                    .text{
                        display: inline-block;
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                .attraction{
                    padding: 0 0 28px 36px;
                    .attraction-item{
                        color: #fff;
                        font-size: 12px;
                        padding: 0 6px 12px 16px;
                        .icon{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            margin-right: 6px;
                            background-size: 100% 100%;
                            &.decrement{
                                @include bg-img-responsive('decrease_2');
                            }
                            &.discount{
                                @include bg-img-responsive('discount_2');
                            }
                            &.insurance{
                                @include bg-img-responsive('guarantee_2');
                            }
                            &.invoice{
                                @include bg-img-responsive('invoice_2');
                            }
                            &.special{
                                @include bg-img-responsive('special_2');
                            }
                        }
                    }
                }
                .bulletin{
                    text-indent: 2em;
                    padding: 0 48px;
                    font-size: 12px;
                    font-weight: 200;
                    color: #fff;
                    line-height: 24px;
                }
            }
            .detail-close{
                position: relative;
                width: 32px;
                height: 32px;
                margin: 64px auto 0 auto;
                clear: both;
                font-size: 32px;
                color: #fff;
                i,span{
                    font-style: normal;
                }
            }
        }
        &.fade-enter-active, &.fade-leave-active{
            transition: opacity .5s;
        }
        &.fade-enter, &.fade-leave-active{
            opacity: 0;
        }
    }
</style>
<script>
    import Star from 'components/star/star';
    import Icon from 'components/icon';
    export default {
      props: {
        seller: Object
      },
      components: {
        Star,
        icon: Icon
      },
      data () {
        return {
          isDetailShow: false
        }
      },
      computed: {
        bgStyle () {
          return {
            'background-image': `url(${this.seller.avatar})`
          }
        }
      },
      methods: {
        showDetail () {
          this.isDetailShow = true;
        },
        hideDetail () {
          this.isDetailShow = false;
        }
      }
    }
</script>
