<template>
	<div>
		<nav>
			<router-link to="/home">
				<i class="iconfont icon-home"></i>
				<span>首页</span>
			</router-link>
			<router-link to="/list">
				<i class="iconfont icon-liebiao"></i>
				<span>列表</span>
			</router-link>
			<router-link to="/collect">
				<i class="iconfont icon-shoucang"></i>
				<span>收藏</span>
			</router-link>
			<router-link to="/add">
				<i class="iconfont icon-zan"></i>
				<span>添加</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	export	default{
		name:"Nav"
	}
</script>

<style scoped="scoped" lang="less" >
@n_hight:60px;
nav{
    width:100%;
    display: flex;
    position: fixed;
    bottom: 0;
    left:0;
    background-color: #fff;
    border-top:1px solid #ccc ;
    height: @n_hight;
    align-items: center; 
    a{
		display: flex;
        flex: 1;
       /*text-align: center;*/
        align-items: center;    /* 上下左右居中 */
        flex-direction: column;    /* 子标签列布局 */
        /*column:2;*/
       i{
       	font-size:@n_hight/2.8;
       }
    }
}	.active{
   		color:orangered;
    }
	
</style>