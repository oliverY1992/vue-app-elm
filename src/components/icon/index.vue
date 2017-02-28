<template>
    <i :class="mapIcon" class="img-icon"></i>
</template>
<style rel="stylesheet/scss" lang="sass">
    @import "../../styles/mixins/responsive";
    .img-icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        background-size: 100%;
        &.decrement{
            @include bg-img-responsive('decrease_4');
        }
        &.discount{
            @include bg-img-responsive('discount_4');
        }
        &.insurance{
            @include bg-img-responsive('guarantee_4');
        }
        &.invoice{
            @include bg-img-responsive('invoice_4');
        }
        &.special{
            @include bg-img-responsive('special_4');
        }
    }
</style>
<script>
    export default {
      props: {
        type: {
          validator (val) {
            return [0, 1, 2, 3, 4, 5].indexOf(val) !== -1;
          },
          required: true
        },
        size: {
          validator (val) {
                    // 0小，1大
            return [0, 1].indexOf(val) !== -1;
          },
          default: 1
        }
      },
      computed: {
        mapIcon () {
          return ['decrease', 'discount', 'special', 'invoice', 'guarantee'][this.type]
        }
      }
    }
</script>
