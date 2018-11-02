<template>
  <div :class="['i_cell', 'i_cell_accounts', iClass]">
    <i-radio i-class="my_radio" :color="color" :checked="selected" @change="allSelect"></i-radio>
    <div class="i_cell_bd">
      <div class="title">全选 
        <span class="all_price_title">合计</span>
        <span class="all_price">￥{{accounts}}</span>
      </div>
    </div>
    <div class="i_cell_btn" @click.stop="account">
      <span>去结算</span>
      <span class="snajiao"></span>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import store from '@/store/'
export default {
  props: {
    iClass: String,
    selected: Boolean,
    color: String,
    accounts: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    allSelect(e) {
      let checked = e.target.current
      this.UPDATE_GOODS_ALL_SELECT({checked: checked})
    },
    account() {
      if (this.accounts > 0) {
        // 更新结算数据
        const list = this.$store.state.goodslist.cartGoods
        this.$store.commit('UPDATE_PAYING_GOOD', list)
        this.$store.commit('UPDATE_TOPAY_TYPE', 1)

        const url = '../index/paying'
        wx.navigateTo({ url })
      } else {
        wx.showToast({
          title: '请选择产品',
          icon: 'none',
          duration: 1500
        })
      }
    },
    ...mapMutations(['UPDATE_GOODS_ALL_SELECT'])
  }
}
</script>
<style lang="less">
@import '../assets/components/cell.less';
// @import '../assets/components/i_circle.less';
.i_cell_accounts{
  position: fixed;
  padding-left: 20px;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 0 0 0 10px;
  background-color: #fff;
  &:before {left: 0;}
  .my_radio{
    padding-left: 6px;
    transform:scale(0.8);
  }
  .all_price_title{
    margin-left: 10px;
    font-size: 13px;
  }
  .all_price{
    font-size: 13px;
    color: #ea9b5a;
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