<template>
	<div class="header">
		{{headerData}}
	</div>
		
</template>

<script>
	export default{
		props:['headerData'],
		mounted(){
//			console.log(this.headerData)
		}
	}
</script>

<style scoped="scoped" lang="less">
	.header{
		line-height: 3rem;
		height: 3rem;
		text-align: center;
		background-color: #ccc;
		color:green;
		font-weight: bold;
	}
</style>