<template>
    <div class="comments">
        <div class="profile">
            <div class="comprehension">
                <div class="wrapper">
                    <h3 class="score">{{score}}</h3>
                    <p>综合评分</p>
                    <div class="greater">高于周边商家{{rank}}%</div>
                </div>
            </div>
            <div class="stars">
                <ul class="score-list">
                    <li>
                        <span class="text">服务态度</span>
                        <star class="star" :score="serviceScore" :size="36"></star>
                        <span class="score">{{serviceScore}}</span>
                    </li>
                    <li>
                        <span class="text">商品评分</span>
                        <star class="star" :score="foodScore" :size="36"></star>
                        <span class="score">{{foodScore}}</span>
                    </li>
                    <li>
                        <span class="text">送达时间</span>
                        <span class="time">{{deliveryTime}}分钟</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="comments-detail">
            <div class="control">
                <button class="all" @click.prevent.stop="switchType(-1)">全部{{positiveComments.length + negativeComments.length}}</button>
                <button class="satisfied" @click.prevent.stop="switchType(0)">满意{{positiveComments.length}}</button>
                <button class="unsatisfied" @click.prevent.stop="switchType(1)">不满意{{negativeComments.length}}</button>
            </div>
            <div class="only">

            </div>
            <div class="list">
                <scroll-list :onRefresh="onRefresh">
                    <ul class="comments-list">
                        <li v-for="comment in comments">
                            <div class="thumbnail">
                                <img :src="comment.avatar"/>
                            </div>
                            <div class="content">
                                <div class="info">
                                    <h6 class="username">{{comment.username}}</h6>
                                    <div class="time">{{comment.rateTime | clock('YYYY-MM-DD hh:mm:ss')}}</div>
                                </div>
                                <div class="markup">
                                    <span class="score">{{comment.score}}</span>
                                </div>
                                <div class="note">{{comment.text}}</div>
                                <div class="suggestions">
                                    <span class="item" v-for="item in comment.recommend">{{item}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </scroll-list>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass">
    .comments{
        .profile{
            display: flex;
            border-bottom: 1px solid #c6c6c6;
            background-color: #ffffff;
            .comprehension{
                flex: 1;
                padding: 18px 12px;
                .wrapper{
                    box-sizing: border-box;
                    border-right: 1px solid #f1f1f1;
                    .score{
                        font-size: 18px;
                        margin: 0;
                        padding: 0;
                        color: #f90;
                        text-align: center;
                    }
                    p{
                        font-size: 12px;
                        margin: 12px 0 8px 0;
                        text-align: center;
                    }
                    .greater{
                        font-size: 12px;
                        color: #c3c3c3;
                    }
                }
            }
            .stars{
                flex: 2;
                .score-list{
                    margin: 18px 12px;
                    &>li{
                        .text{
                            font-size: 12px;
                            line-height: 16px;
                            display: inline-block;
                            vertical-align: top;
                        }
                        &:not(:last-of-type){
                            margin-bottom: 12px;
                        }
                        .star{
                            display: inline-block;
                        }
                        .score{
                            line-height: 16px;
                            vertical-align: middle;
                            padding: 12px;
                            font-size: 12px;
                            color: #f90;
                        }
                        .time{
                            display: inline-block;
                            line-height: 16px;
                            vertical-align: middle;
                            font-size: 12px;
                            color: #c3c3c3;
                            padding-left: 24px;
                        }
                    }
                }
            }
        }
        .comments-detail{
            background-color: #ffffff;
            margin-top: 5%;
            border-top: 1px solid #c6c6c6;
            .control{
                margin: 0 12px;
                border-bottom: 1px solid #c6c6c6;
                box-sizing: border-box;
                padding: 12px 0;
                button{
                    border: none;
                    padding: 8px 12px;
                    text-align: center;
                    outline: none;
                    &:not(:last-of-type){
                        margin-right: 12px;
                    }
                    &.all{
                        background-color: #00a0dc;
                        color: #ffffff;
                    }
                    &.satisfied{
                        background-color: lightblue;
                        color: #2b333b;
                    }
                    &.unsatisfied{
                        background-color: #c6c6c6;
                        color: #2b333b;
                    }
                }
            }
            .only{
                padding: 12px;
                color: #c3c3c3;
                box-sizing: border-box;
                border-bottom: 1px solid #c6c6c6;
            }
            .list{
                position: relative;
                height: 500px;
            }
            .comments-list{
                &>li{
                    padding: 12px 0;
                    margin: 0 12px;
                    display: flex;
                    box-sizing: border-box;
                    &:not(:last-of-type){
                        border-bottom: 1px solid #c6c6c6;
                    }
                    .thumbnail{
                        flex: 1;
                        img{
                            border-radius: 50%;
                            width: 36px;
                            height: 36px;
                        }
                    }
                    .content{
                        flex: 5;
                        .info{
                            font-size: 12px;
                            padding: 0;
                            margin: 0 0 8px 0;
                            display: flex;
                            .username{
                                flex: 1;
                                text-align: left;
                                margin: 0;
                            }
                            .time{
                                flex: 1;
                                color: #c3c3c3;
                                text-align: right;
                            }
                        }
                        .markup{
                            margin-bottom: 8px;
                            font-size: 10px;
                            color: #c3c3c3;
                        }
                        .note{
                            margin-bottom: 8px;
                            font-size: 12px;
                            line-height: 16px;
                        }
                        .suggestions{
                            color: #c3c3c3;
                            .item{
                                display: inline-block;
                                font-size: 12px;
                                padding: 4px;
                                border: 1px solid #c6c6c6;
                                color: #c3c3c3;
                                margin-bottom: 4px;
                                &:not(:last-of-type){
                                    margin-right: 6px;
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
    import {mapActions, mapState, mapGetters} from 'vuex';
    import Scroller from 'v-scroll-list';
    import Star from 'components/star/star';

    export default {
      data () {
        return {
          showType: -1
        }
      },
      computed: {
        comments () {
          if (this.showType === 0) {
            return this.positiveComments;
          } else if (this.showType === 1) {
            return this.negativeComments;
          } else {
            return this.$store.state.comments.all;
          }
        },
        ...mapState({
          score: state => state.app.seller.score,
          rank: state => state.app.seller.rankRate,
          serviceScore: state => state.app.seller.serviceScore,
          foodScore: state => state.app.seller.foodScore,
          deliveryTime: state => state.app.seller.deliveryTime
        }),
        ...mapGetters([
          'positiveComments',
          'negativeComments'
        ])
      },
      methods: {
        ...mapActions(['fetchComments']),
        async onRefresh (done) {
          await this.fetchComments();
          done();
        },
        switchType (type) {
          this.showType = type;
        }
      },
      mounted () {
        this.fetchComments();
      },
      components: {
        'scroll-list': Scroller,
        'star': Star
      },
      filters: {
        clock (input, format) {
          const datetime = new Date(input);
          const year = datetime.getUTCFullYear();
          const month = datetime.getUTCMonth();
          const day = datetime.getUTCDate();
          const hour = datetime.getUTCHours();
          const min = datetime.getUTCMinutes();
          const sec = datetime.getUTCSeconds();
          return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
        }
      }
    }
</script>
