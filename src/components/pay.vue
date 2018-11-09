<template>
  <div :class="['i_cell', 'i_cell_accounts', iClass]">
    <div class="i_cell_bd">
      <div class="title">付款
        <span class="all_price">￥{{money}}</span>
      </div>
    </div>
    <div class="i_cell_btn" @click.stop="topay">
      <span>去支付</span>
      <span class="snajiao"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iClass: String,
    money: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    topay() {
      this.$emit('to-pay')
    }
  }
}
</script>
<style lang="less">
.i_cell_accounts{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 0 0 0 15px;
  background-color: #fff;
  &:before {left: 0;}
  .all_price{
    font-size: 13px;
    color: #d4237a;
  }
  .i_cell_btn{
    background-color: #ea9b5a;
    padding: 15px 35px;
    color: #fff;
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    span{display: inline-block;}
    .snajiao{
      margin-left: 10px;
      width:0;
      height:0;
      border-width:6px 0 6px 10px;
      border-style:solid;
      border-color:transparent transparent transparent #fff;/*透明 透明 透明 灰*/
    }
  }
}
</style>