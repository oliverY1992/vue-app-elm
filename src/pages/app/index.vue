<template>
    <div>
        <app-header :seller="seller"/>
        <div class="tab">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/comments">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass">
    .tab{
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        border-bottom: 1px solid rgba(7,12,27, 0.1);
        .tab-item{
            flex: 1;
            text-align: center;
            a{
                display: block;
                font-size: 14px;
                color: rgb(77, 85, 93);
                &.link-active{
                    font-size: 14px;
                    color: rgb(240, 20, 20);
                }
            }
        }
    }
</style>
<script>
    import {mapState} from 'vuex';
    import AppHeader from 'components/header';
    export default {
      components: {
        'app-header': AppHeader
      },
      computed: mapState({
        seller: state => state.app.seller
      }),
      methods: {
        fetchSeller () {
          this.$store.dispatch('fetchSeller');
        }
      },
      mounted () {
        this.fetchSeller();
      }
    }
</script>
