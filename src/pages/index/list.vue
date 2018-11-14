<template>
  <div class="goods_list">
    <div class="i_cell i_cell_bd_start" v-for="item in payingGoods" :key='item.id'>
      <div class="i_cell_hd">
        <img :src="item.src" class="img_icon order_pic" alt="" />
      </div>
      <div class="i_cell_bd list_content">
        <div class="content_info">
          <div class="title">{{item.brand_title}}</div>
          <div class="order_content">{{item.title}}</div>
        </div>
      </div>
      <div class="i_cell_fr">
        <div>￥{{item.price}} x {{item.num}}</div>
      </div>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['payingGoods'])
  },
  methods: {}
}
</script>
<style scoped lang="less">
.goods_list{
  padding-top: 10px;
  background-color: #F8F8F8;
  height: 100%;
  .i_cell{
    background-color: #fff;
    .img_icon {
      border: 1rpx solid #e5e5e5;
      width: 70px;
      height: 70px;
    }
  }
  .order_pic {
    border-radius: 4px;
  }
  .list_content{
    .content_info{
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .order_content {
      font-size: 12px;
      color: #666;
      line-height: 1;
    }
  }
  
}

</style>