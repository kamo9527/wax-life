<template>
  <div class="pay_list">
    <div class="lable">购物清单</div>
    <div class="content">
      <div class="pay_img_list">
        <img v-for="item in list" class="img_item" :src="item" alt="">
      </div>
      <div class="pay_num">共{{list.length}}件</div>
      <div class="with_arrow"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iClass: String,
    list: Array
  },
  data() {
    return {
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
  .pay_list {
    padding: 0 14px 10px;
    .lable {
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      text-align: center;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pay_img_list {
        flex: 1;
        .img_item {
          vertical-align: middle;
          width: 60px;
          height: 60px;
          margin-right: 14px;
          border: 1rpx solid #e5e5e5;
          border-radius: 4px;
        }
      }
      .pay_num{

      }
    }
  }

</style>