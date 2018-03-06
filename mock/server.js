//后台只提供接口，  前端只调用接口；

let http =  require('http');
let fs = require('fs');
let url  = require('url');
let sliders = require('./slider');     /*将导出的数据拿到*/
// console.log(sliders)
// console.log(fs);

//------------读方法--------------
function read(callback){
	fs.readFile('./book.json','utf8',function(err,data){
		data = data.length===0  ?[]  : JSON.parse(data)
		callback(data)
	})
}
/*read(function(data){
	console.log(data);       //测试是否得到数据
})*/
//----------------------------
//-------------写方法---------------
/*
 data:data是要写的内容,是  Object 类型
 callback:写入成功后的回调；
*/
function write(data,callback){     //fs.writeFile() 由于是异步的:解决方法   -------
	fs.writeFile('./book.json',JSON.stringify(data),callback)
}

//--------------------------------

//创建服务
http.createServer(function(req,res){
  //接口1：
	let { pathname, query } = url.parse(req.url, true);     //url.parse() 方法会解析一个 URL 字符串并返回一个 URL 对象。
//let pathname = url.parse(req.url).pathname;
	let id = query.id;     //如果有id就把id保留下来；
  if(pathname === '/api/slider'){
    return res.end(JSON.stringify(sliders));
  }
  if(pathname === '/api/hot'){
  	read(function(data){     //data 表示读到的数据
  		var books = data.reverse().slice(0,6);
		res.end(JSON.stringify(books))	//把 book 扔给前端；
  		
  		// 模拟 loading 加载,只是测试，开发绝对不用；
  		/*setTimeout(function(){
  			res.end(JSON.stringify(books))	//把book扔给前端；
  		},2000)*/
  	});
  	return;
  }
  
  // 图书的增删查改
  if(pathname === '/api/booklist'){
  	switch(req.method){                //req.method  方法
  		case 'GET':
  			read(function(data){     //data 代表所有数据
				res.end(JSON.stringify(data))
  				
  				/*setTimeout(function(){
  					res.end(JSON.stringify(data))
  					
  				},3000)*/
  			})
  		break;
  		case  'POST':
  		//axios -->jquery传过来的数据默认是 json格式;    a=b&c=n
  		//post 发送过来的请求体 默认是就是对象格式{}
  			var str='';
  			//数据读取都是 buffer ?????????????
  			req.on('data',function(data){
  				str+= data;
  				console.log(str)
  			})
  			//因为是异步的，所以在结束后执行；
  			req.on('end',function(){
  				var aNewBook = JSON.parse(str);      //将字符串类型变为 Json类型，返回值 Object 对应给定的JSON文本。  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
  				// 而JSON.stringify(value[, replacer [, space]]) value:将要序列化成 一个JSON 字符串的值。返回的是 一个表示给定值的JSON字符串。   
  				read(function(books){   //读取所有的书 获取最后一项的 id   累加
  					aNewBook.id = books.length>0 ?books[books.length-1].id+1:1;      //获取最后一项的id,+1
  					
  					books.push(aNewBook); // 将新书放到进去；   ===》再将新的booklist写到json文件中，所以要用一个write方法；
  					write(books,function(){   //写入成功后显示添加的那一项
  						res.end(JSON.stringify(aNewBook))
  					})
  					
  				})
  			})
  			
  		break;
  		case 'DELETE':
  		//    /api/booklist?id=x  
			read(function(books){
				books.filter(item=>item.id!=id);
				write(books,function(){
					res.end(JSON.stringify({}));
				})
			})
  		break;
  		case 'PUT':
  		break;
  	}
  }
  
}).listen(3000);

/* 可以访问：http://localhost:3000/api/hot 查看数据 */