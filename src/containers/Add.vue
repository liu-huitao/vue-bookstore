<template>
	<div>
		<pheader headerData="添加内容"></pheader>    <!-- 注意与其他页面不同 -->
		<div class="add">
			<div class="group">
				<label for="bookName">bookName : </label>
				<input type="text" placeholder="请输入书名" id="bookName" v-model="book.bookName"/>
			</div>
			<div class="group">
				<label for="bookCover">bookCover : </label>
				<input type="text" placeholder="请输入书的封面" id="bookCover" v-model="book.bookCover"/>
			</div>
			<div class="group">
				<label for="bookDetCont">content : </label>
				<input type="text" placeholder="请输入书的详细内容" id="content" v-model="book.content"/>
			</div>
			<div class="group">
				<button @click="add">Add Book</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Pheader from 'components/Pheader'
	import {addBook} from 'api'
	
	export default{
		data(){
			return{
				//声明一个book对象
				book:{
					/*bookName:'',
					bookCover:'',
					bookDetCont:''*/
				}
			}
		},
		components:{
			"pheader":Pheader
		},
		methods:{
			add(){
				addBook(this.book).then(res=>{
					//添加成功后的逻辑；跑到列表页
					this.$router.push('/list');
				}).catch(err=>{
					console.log(err);
				});
			}
//			async add(){
//				await addBook();
//				this.$router.push('/list');
//			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.add{
		display: flex;
		flex-direction: column;
		.group{
			margin:.5rem 1rem ;
			display: flex;
			flex-direction:column ;
		}
		& label{
			margin:0 0 .2rem .2rem;
		}
		& input{
			border:1px solid #ccc;
			padding:.5rem;
			border-radius: .3rem;
		}
		& button{
			height:2rem;
			background-color: #fff;	
			border-color:#ccc;	
			/*text-decoration: none;*/
			text-shadow: .1rem .1rem .1rem  rgba(0,0,0,0.5);
			font-size:1rem;
		}
	}
</style>