<template>
  <div id="map-container"></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { loadScript } from '@/lib/utils'

export default defineComponent({
  // setup() {},
  async created() {
    const key = '6a79873d88e51c907b9caf4f83113cef'
    if (window.AMap) {
      this.initMap()
    } else {
      await loadScript(`https://webapi.amap.com/maps?v=1.4.15&key=${key}`)
      this.initMap()
    }
  },
  methods: {
    initMap() {
      var map = new AMap.Map('map-container', {
        resizeEnable: true,
      })
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition(function (status: string, result: any) {
          if (status == 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        })
      })
      //解析定位结果
      function onComplete(data: any) {
        var str = []
        str.push('定位结果：' + data.position)
        str.push('定位类别：' + data.location_type)
        if (data.accuracy) {
          str.push('精度：' + data.accuracy + ' 米')
        } //如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
        console.log(str.join('\n'))
      }
      //解析定位错误信息
      function onError(data: any) {
        console.error(`定位失败: ${data.message}`)
      }
    },
  },
})
</script>

<style lang="css" scoped>
#map-container {
  height: 100vh;
}
</style>
