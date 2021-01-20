var leinumber;	//user雷数
var realnum;	//剩余真实雷数
$(document).ready(function (){
	level('1');
	oncontextmenu = function(){return false};
	realnum = $('#selectedlevel').val()*10;

	//监听触发事件
	$('td').mousedown(function(e){
		var id = this.id;
		var n = $('#'+id).text();
		var usernum = $('#leinumber').val();	//剩余user雷数
	    if(3 == e.which){	
			//右键
			  if($('#' + id).css('color') == 'rgb(221, 221, 255)'){	//空
				if(usernum == 0 && realnum != 0)	//flag已满
					return;
				usernum--;	//剩余user雷数减一
				$('#' + id).addClass('boomClass');	//标记flag
				//如果真是雷，真实雷数减一
				if(n == 'lei'){
					realnum--;
				}
			}else if($('#' + id).hasClass('boomClass')){	//flag
				$('#' + id).removeClass('boomClass');
				usernum++;	//剩余user雷数加一
				//如果真是雷，真实雷数加一
				if(n == 'lei'){
					realnum++;
				}
			}
	    }else if(1 == e.which){
			//左键 为空时才能按下
			if($('#' + id).css('color') == 'rgb(221, 221, 255)'){
				if(n == 'lei'){
					alert('游戏结束！');
					refresh();
					//break;
				}else if(n != 0){
					setNum(id);
				}else{
					setZero(id);
					zero(id);
				}
			}
		}
		$('#leinumber').val(usernum);
		//判断游戏成功
		var endResult = false;
	    for(var i = 0;i<$('#selectedlevel').val()*100;i++){
	    	if($('#'+ i).css('color') == 'rgb(221, 221, 255)'){
				endResult = true;
				break;
			}
		}
		if(!endResult && realnum == 0){
			alert("游戏成功！");
		}
	})
});

//控制难度

function level(param){
	$('#table').html("");
	var tablestr = "";
	$('#selectedlevel').val(param);
	$('#leinumber').val(param*10);
	leinumber = param*10;
	var id = 0;
	for(var i=0;i<10;i++){
		tablestr += "<tr>";
		for(var j = 0;j<param*10;j++){
			tablestr += "<td id='"+id+"'></td>";
			id++;
		}
		tablestr += "</tr>";
	}
	$('#table').append(tablestr);
	start();
}
//开始
function start(){
	var level = $('#selectedlevel').val();
	$('#leinumber').val(level*10);
	$("td").text("");
	var leishu = random(level);
	for(var i =0;i<leishu.length;i++)
	{
		$('#'+leishu[i]).text('lei');
	}
	number(leishu);
	
}

//得到雷的位置

function random(param){
	var array = [];
	var count = 0;
	while(count < param * 10){
		var a = Math.floor(Math.random()*param*100);
		if(array.indexOf(a) <= 0)
		{
			array.push(a);
			count++;
		}
	}
	return array;
}

//显示每格的数字

function number(leishu){
	var s = leishu.length;
	for(var i = 0;i<s*10;i++)
	{
		if(leishu.indexOf(i) < 0)
		{
			var count = 0;
			if(i%s != 0)
			{
				if($('#'+(i-s-1)).text() == 'lei')
				{
					count++;
				}
				if($('#'+(i-1)).text() == 'lei')
				{
					count++;
				}
				if($('#'+(i+s-1)).text() == 'lei')
				{
					count++;
				}
			}
			if((i+1)%s != 0)
			{	
				if($('#'+(i-s+1)).text() == 'lei')
				{
					count++;
				}
				if($('#'+(i+1)).text() == 'lei')
				{
					count++;
				}
				if($('#'+(i+s+1)).text() == 'lei')
				{
					count++;
				}
			}
			if($('#'+(i-s)).text() == 'lei')
			{
				count++;
			}
			if($('#'+(i+s)).text() == 'lei')
			{
				count++;
			}
			$('#'+i).text(count);
		}		
	}
}

//空白格子

function zero(i){
	var s = parseInt($('#selectedlevel').val()*10);	//10, 20 or 30
	i = parseInt(i);

	//不是最上面一排
	if(i >= s){
		digui(i - s);
	}			
	//不是最下面一排
	if(i <= (s - 1) * 10){	
		digui(i + s);
	}
	//不是最左边一排
	if(i % s != 0){
		digui(i - 1);
		digui(i - s - 1);
		digui(i + s - 1);
	}
	//不是最右边一排
	if((i + 1) % s != 0){
		digui(i + 1);
		digui(i - s + 1);
		digui(i + s + 1);
	}
}

//递归空白格

function digui(id){
	if(id < 0){
		return;
	}
	if($('#'+id).text() != 'lei' && !$('#'+id).hasClass('zeroClass'))
	{
		$('#'+id).css('color','black');
		if($('#'+id).text() == '0'){
			setZero(id);
			zero(id);
		}
	}
}

//重置

function refresh(){
	var num = $('#selectedlevel').val();
	for(var i = 0;i<num*100;i++){
		$('#'+i).text('');
		$('#'+i).css('color','#ddf');
		$('#'+i).css('background-color','#ddf');
		$('#'+i).removeClass('zeroClass');
		$('#'+i).removeClass('boomClass');
		$('#'+i).removeClass('numClass');
	}
	start();
}

//0格子的flag
function setZero(id){
	$('#'+id).addClass('zeroClass');
}
//雷格子的flag
function setBoom(id){
	$('#'+id).addClass('boomClass');
}
//已点开格子的flag
function setNum(id){
	$('#'+id).addClass('numClass');
}