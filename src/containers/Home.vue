<template>
	<div>
		<!-- 如果一个组件过于庞大 会导致难以维护，轮播图组件  可能会被复用 -->
		<!-- header -->
		<pheader :headerData="headerTitle"></pheader>
		<scroller :on-refresh="refresh" ref="scroller" class="m_top">		
		<!-- 轮播图 -->
			<div v-if="sliderArr.length">
				<slider :data="sliderArr"></slider>    <!-- 动态数据绑定 -->
			</div>
			<!-- 不能直接渲染Slider 可能数据没过来就渲染完毕了，导致轮播图不能显示 -->
			
			<!-- book display -->
			<div class="b_display">
				<h3>最新 Vue图书</h3>
				<ul class="hot">
					<li v-for="(hot,index) in hotArr" v-bind:key="index">
						<div><img :src="hot.bookCover" alt="" /></div>
						<p class="title">{{hot.bookName}}</p>
						<p class="cont">{{hot.content}}</p>
						<!--<p>{{hot.content.substring(0,20)}} ...</p>-->   <!-- 截取字符串方法一 --> 
					</li>
				</ul>
				<loading v-if="isloading"></loading>
			</div>
		</scroller>
	</div>
</template>

<script>
	import {getSliders,getHot} from 'api';    //注意引入方式；
//	console.log(getSliders);
	
	import Slider from 'components/Slider'
	import Loading from 'components/Loading'
	import Pheader from 'components/Pheader'
	
	export default {
		data(){
			return {
				sliderArr:[],
				hotArr:[],
				isloading:true,
				headerTitle:"新华书城"
			}
		},
		components:{
			"slider":Slider,
			"loading":Loading,
			"pheader":Pheader
		},
		created(){
			this.getSliderList(),
			this.getHotList()
		},
		methods:{
			refresh(){
				this.getSliderList(),
				this.getHotList()
			},
			getSliderList(){
				getSliders().then(res=>{
	//				console.log(res.data)
					this.sliderArr=res.data;
				}).catch(err=>{
					console.log(err)
				});
			},
			getHotList(){
				getHot().then(res=>{
	//				console.log(res.data)
					this.hotArr = res.data
					this.isloading = false;    //数据加载完成后加载loading
				}).catch(err=>{
					console.log(err)
				})

				//、、、、、、、、、、、、、
				//加载数据后，获取scroller  调用  finishPullToRefresh()  方法；
				this.$refs.scroller.finishPullToRefresh()
				
				//、、、、、、、、、、、、、
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.m_top{
		margin-top:48px;
	}
	.b_display{
		/* $:指  .b_display */
		
		padding:0 10px;
		h3{
			line-height: 3rem;
			color:#222;
			padding-left: 2%;
			font-weight: normal;
		}
		.hot{
			display:flex;
			width:100%;
			flex-wrap:wrap;    /* 默认是不换行的 */
			
		}
		
		/* 浮动 */
		/*& li{
			align-items: center;
			float: left;
			width:49%;
			
		}
		& li:nth-child(odd){
			margin-right: 2%;
		}*/
		
		/* 弹性盒 */
		& li{
			align-items: center;
			/*text-align: center;*/
			width:49%;
			flex-direction: column;
		}
		& li:nth-child(odd){
			margin-right: 2%;
		}
		& div{
			text-align: center;
		}
		& img{
			width:90%;
			margin-bottom: .5rem;
		}
		& .title{       
			line-height: 2rem;
			height:2rem;
			margin-bottom: .1rem;
			color:#444;
			font-size:1rem;
			margin-left:5%;
		}
		& .cont{       
			overflow: hidden; 
			white-space: nowrap; 
			text-overflow: ellipsis;
			line-height: 1.5rem;
			height:1.5rem;
			color:#555;
			margin-bottom: .5rem;
			font-size:.8rem;
			margin-left:5%;
		}
		
	}

</style>