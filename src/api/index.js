//1. 引入axios;     不支持jsonp,需要下载第三方库
import axios from 'axios';

export function getSliders(){
	return axios.get('/api/slider');
}
//一个接口对应一个 api;
export function getHot(){
	return axios.get('/api/hot');
}
export function getBookList(){
	return axios.get('/api/booklist');
}
//删除某一本书
export function removeBook(id){    
	return axios.delete("/api/booklist?id="+id);
}
// 添加图书，需要传递一个data数据
export function addBook(data){    //data:指添加的内容
	return axios.post('/api/booklist',data);
}
