<template>
  <div id="app">
  	<!--<router-view/>-->
  	<!-- 解决懒加载：在tab切换时，避免页面在此进行加载；保持缓存页面， 在浏览器Network ----/-> XHR 中查看      -->

		<keep-alive>
		<!-- 谁加动画，给谁加 transition -->
		<transition name="trans">
  			<router-view class="view"></router-view>
		</transition>
  	</keep-alive>
  	
    
    <!--
    	导航一般在下面
    -->
    <onav></onav>
  </div>
</template>

<script>
	import Tab from "components/Tab"
export default {
  name: 'App',
  components:{
  	"onav":Tab
  }
}
</script>

<style scoped="scoped" lang="less">
.trans-enter{
	transform:translate(100%)
}
.trans-enter-active{
	transition:0.2s linear;
}
.trans-leave-active{
	transition:0.2s linear;
	transform:translate(-100%);
}
.view{
	position:absolute;
	width:100%;
	top:0;
	left:0;
	bottom:65px;
}

</style>
