<template>

	<div>
		<pheader :headerData="headerTitle"></pheader>
		<!--  下拉刷新  -->
		<scroller :on-refresh="refresh" ref="scroller" class="m_top">
			<div class="all_display">
				<h3 class="all_book">全部图书</h3>
				<ul>
					<li v-for="hot,index in books" v-bind:key="index">
						<!--<img :src="hot.bookCover" alt="" />
						<div>
							<h3 class="title">{{hot.bookName}}</h3>
							<p class="cont">{{hot.content}}</p>
						</div>-->
						<!-- 上面的代码替换为 :解决懒加载 ：具体表现查看 src路径 加载完的位 lazy="loaded"; 未加载的为 lazy="loading"-->
						<img v-lazy="hot.bookCover" alt="" />
						<div>
							<h3 class="title">{{hot.bookName}}</h3>
							<p class="cont">{{hot.content}}</p>
							<button @click="remove(hot.id)">Delete</button>
						</div>
						<!--<p>{{hot.content.substring(0,20)}} ...</p>-->   <!-- 截取字符串方法一 -->
					</li>
				</ul>
				<loading v-if="isloading"></loading>
			</div>
		</scroller>
	</div>
</template>

<script>
	import {getBookList,removeBook} from 'api'     //当只有一个暴露时，不用写     /index

	import Pheader from 'components/Pheader'

	import Loading from 'components/Loading'
	export default{
		data(){
			return{
				headerTitle:"列表展示",
				books:[],
				isloading:true
			}
		},
		components:{
			"pheader":Pheader,
			"loading":Loading
		},
		created(){
			this.getList();
		},
		methods:{
			async remove(id){
				await removeBook(id).then(res=>{
					//前台删除成功，将此项在页面中移除掉；
					this.books = this.books.filter(item=>item.id!=id);
				});
			},
			refresh(){
				this.getList();
			},
			getList(){
				getBookList().then(res=>{
					this.books = res.data;
					this.isloading = false;
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
		margin-top:50px;
	}
	.all_display{
		.all_book{
			line-height: 3rem;
			color:#222;
			padding-left: 3%;
			font-weight: normal;
			box-shadow: 0 .2rem .2rem 1px rgba(0,200,0,0.5);
		}
		
		& li{
			display:flex;
			border-bottom: 1px solid #ccc;
			margin:1rem 0;
			padding:0 .4rem 1rem;
		}
		& li img{
			width:30%;
			height:40%;
			display: block;
			margin-right:.3rem;
		}
		/*& li:nth-child(2) img{
			width:24%;
			height:40%;
			margin-left:.8rem;
		}*/
		& li div{
			display: flex;
			flex-direction: column;
		}
		& .title{
			font-size:1rem;
			margin:.5rem 0;
			color:#222;
			padding-left: 3%;
			font-weight: normal;
		}
		& .cont{
			font-size:.8rem;
			line-height: 1.2rem;
		}
		& button{
			width:30%;
			background-color: #FF8C69;
			border:none;
			margin: .4rem;
			padding:.2rem 0;
			text-align: center;
			border-radius: 10px;
			display: block;
		}
		/* 测试 lazyload */
		img[lazy="loading"]{
			background: url(../assets/loading.gif) no-repeat center;
			background-size: cover;
			width:35%;
			height: auto;
		}
		@-webkit-keyframes fadeIn{
			from{opacity: 0;}
			to{opacity: 1;}
		}
		img[lazy="loaded"]{
			animation: fadeIn 0.5s;
		}
	}
</style>
