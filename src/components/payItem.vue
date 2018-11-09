<template>
  <div class="good_item">
    <div class="lable">购物清单</div>
    <div class="content" v-for="(item, index) in payList" :key="index">
      <div class="good_detail">
        <img :src="item.src" alt="">
        <span>{{item.title}}</span>
      </div>
      <div class="good_price">
        {{item.num + 'x' + item.price + '元'}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iClass: String,
    item: Object,
    payList: Array
  },
  data() {
    return {
    }
  },
  methods: {}
}
</script>
<style lang="less">
  .good_item {
    .lable {
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      // font-weight: 600;
    }
    .content {
      padding: 0 15px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top:  1px solid #f0f0f0;
      .good_detail {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px; 
        }
        span {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
      }
      
    }
  }

</style>