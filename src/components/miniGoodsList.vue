<template>
  <div :class="['i_cell', iClass]" @click="onClick">
    <div class="i_cell_bd goods_img_list">
        <image class="goods_img" 
          v-for="item in list" 
          :key="item" 
          :src="item" 
          >
        </image>
    </div>
    <div class="i_goods_num">
      共<span class="goods_num">{{list.length}}</span>件
    </div>
    <div :class="{'with_arrow': isLink || link}"></div>
  </div>
</template>
<script>
// import utils from '@/utils'
export default {
  props: {
    iClass: String,
    list: {
      type: Array,
      default: []
    },
    isLink: {
      type: Boolean,
      default: false
    },
    link: {
      type: [String, Number],
      default: ''
    },
    query: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onClick() {
      if (this.link) {
        let url = {path: this.link, query: this.query}
        this.$router.push(url)
      }
      this.$emit('cellClick')
    }
  }
}
</script>
<style lang="less">
.goods_img_list{
  height: 50px;
  line-height: 50px;
.goods_img{
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
  border: 1rpx solid #e5e5e5;
  box-sizing: border-box;
}
}
.i_goods_num{
   color: #000;
   text-align: right;
  .goods_num{
    padding: 0 5px;
  }
}
</style>