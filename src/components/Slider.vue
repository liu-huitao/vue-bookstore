<template>
	<div>
		<div class="swiper-container">
		    <div class="swiper-wrapper" >
		        <div class="swiper-slide" v-for="value in data"><img :src="value" alt="" width=100%;/></div>
		    </div>
		    <!-- 如果需要分页器 -->
		    <div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<script>
	import 'swiper/dist/css/swiper.css';
	import Swiper from 'swiper';
	
	export default{
		props:['data'],    //接受数据，会挂载在当前组件的实例上；
		mounted(){
			var mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal',
			    loop: true,
			    autoplay : true,
			    // 如果需要分页器
			    pagination: {
			      el: '.swiper-pagination',
			    }
		    })
		}
	}
</script>

<style scoped="scoped" lang="less">

</style>