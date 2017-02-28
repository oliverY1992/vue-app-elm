<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass" modules>
    @import "../../styles/mixins/responsive";
    .star{
        .star-item{
            display: inline-block;
            background: no-repeat;
        }
        &.star-48{
            .star-item{
                width: 20px;
                height: 20px;
                margin-right: 22px;
                background-size: 100% 100%;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-img-responsive('star48_on');
                }
                &.half{
                    @include bg-img-responsive('star48_half');
                }
                &.off{
                    @include bg-img-responsive('star48_off')
                }
            }
        }
        &.star-36{
            .star-item{
                width: 15px;
                height: 15px;
                margin-right: 6px;
                background-size: 100% 100%;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-img-responsive('star36_on');
                }
                &.half{
                    @include bg-img-responsive('star36_half');
                }
                &.off{
                    @include bg-img-responsive('star36_off');
                }
            }
        }
        &.star-24{
            .star-item{
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size: 100% 100%;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-img-responsive('star24_on');
                }
                &.half{
                    @include bg-img-responsive('star24_half');
                }
                &.off{
                    @include bg-img-responsive('star24_off');
                }
            }
        }
    }
</style>
<script>
    const LENGTH = 5;
    const ON = 'on';
    const OFF = 'off';
    const HALF = 'half';

    export default {
      props: {
        size: {
          validator (val) {
            return [24, 36, 48].indexOf(val) !== -1;
          }
        },
        score: {
          validator (val) {
            return val >= 0 && val <= 5;
          }
        }
      },
      computed: {
        starType () {
          return `star-${this.size}`
        },
        itemClasses () {
          let ret = [];
          const int = Math.floor(this.score);
          const isDecimal = this.score % 1 !== 0;
          for (let i = 0; i < int; i++) {
            ret.push(ON);
          }
          if (isDecimal) {
            ret.push(HALF);
          }
          while (ret.length < LENGTH) {
            ret.push(OFF);
          }
          return ret;
        }
      }
    }

</script>
