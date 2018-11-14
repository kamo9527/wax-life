<template>
  <div :class="['i_cell', iClass]">
    <i-radio i-class="my_radio" :color="color" :disabled="item.disabled" :checked="item.select" @change="radioChange"></i-radio>
    <div class="i_cell_hd">
      <img :src="item.src" class="goods_pic" alt="" />
    </div>
    <div class="i_cell_bd">
      <div class="title pb10">{{item.brand_title}}</div>
      <div><span class="goods_style">{{item.title}}</span></div>
      <div class="goods_pay">
        <div class="item_count">
          <img src="/static/icon/minus.png" class="count_icon" @click.stop="minus" alt="">
          <span class="count_num">{{item.num}}</span>
          <img src="/static/icon/add.png" class="count_icon" @click.stop="add" alt="">
        </div>
        <div class="goods_price">￥{{item.price * item.num}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iClass: String,
    color: String,
    disabled: Boolean,
    item: Object
  },
  data() {
    return {
    }
  },
  methods: {
    radioChange(e) {
      this.item.select = e.target.current
      // this.$emit('onChange', this.item)
    },
    add() {
      this.item.num++
      // this.$emit('onChange', this.item)
    },
    minus() {
      if (this.item.num > 1) this.item.num--
      // this.$emit('onChange', this.item)
    }
  }
}
</script>
<style lang="less">
.my_radio{
  transform:scale(0.8);
}
.pb10{
    padding-top: 2px;
  }
.goods_pic {
    vertical-align: middle;
    width: 70px;
    height: 70px;
    margin-left: 5px;
    margin-right: 16px;
    border-radius: 4px;
  }
.goods_style{
  font-size: 12px;
  padding: 4px;
  background-color: #F8F8F8;
  border-radius: 4px;
  position: relative;
  // &::after{
  //   content: "";
  //   position: absolute;
  //   top: 4px;
  //   right: 6px;
  //   display: inline-block;
  //   vertical-align: middle;
  //   transform: rotate(135deg);
  //   width: 8px;
  //   height: 8px;
  //   border-width: 1px 1px 0 0;
  //   border-color: #a0a0a0;
  //   border-style: solid;
  // }
}
.goods_pay{
  overflow: hidden;
  .item_count{
    padding-top: 4px; 
    float: right;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    vertical-align: middle; 
    overflow: hidden;
    .count_num{
    float: left;
    text-align: center;
    width: 30px;
    color: #999;
  }
  .count_icon {
    float: left;
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  }
  
  .goods_price{
    padding-top: 2px;
    font-size: 16px;
    color: #ea9b5a;
  }
}

</style>