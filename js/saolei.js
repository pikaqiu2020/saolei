var leinumber;
$(document).ready(function (){
	level('1');

	
});

//控制难度

function level(param){
	$('#table').html("");
	var tablestr = "";
	if(param == 1){
		$('#selectedlevel').val('1');
	}
	else if(param == 2){
		$('#selectedlevel').val('2');
	}
	else if(param == 3){
		$('#selectedlevel').val('3');
	}
	else{
		$('#selectedlevel').val('');
	}
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
		// $('#table').append("</tr>"); 
	}
	$('#table').append(tablestr);
	start();
}

//开始

function start(){
	var level = $('#selectedlevel').val();
	$("td").text("");
	var leishu = random(level);
	for(var i =0;i<leishu.length;i++)
	{
		$('#'+leishu[i]).text('lei');
	}
	number(leishu);
	//监听触发事件
	$('td').mousedown(function(e){
		var id = this.id;
		var n = $('#'+id).text();
		var length = $('#selectedlevel').val();
	    if(3 == e.which){
          	if(n == 'lei'){	
				$('#'+id).html('nei');
			}else if(n == 'nei'){
				$('#'+id).html('lei');
			}
			if($('#'+id).css('color') == 'rgb(221, 221, 255)'){
				$('#'+id).css('color','red');
				$('#leinumber').val(--leinumber);
			}else if($('#'+id).css('color') == 'rgb(255, 0, 0)'){
				$('#'+id).css('color','black');
				$('#leinumber').val(++leinumber);
			}
	    }else if(1 == e.which){
	           	
			if(n == 'lei'){
				// for(var i = 0;i<length*100;i++){
				// 	if($('#'+i).text() == 'lei'){
				// 		$('#'+i).css('color','black');
				// 	}
				// }
				alert('游戏结束！');
				refresh();
				//break;
			}else if(n != 0){
				$('#'+id).css('color','black');
			}else{
				$('#'+id).css('color','black');
				zero(id);
			}
	    }
	    //判断游戏成功
	    //for(var i = 0;i<length*100;i++){
	    	//if()
	    //}
	})
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
	var s = parseInt($('#selectedlevel').val()*10);
	i = parseInt(i);
	var flag = true;
	if(i%s != 0)
	{
		digui(i-s-1);
		digui(i-1);
		digui(i+s-1);
	}
	if((i+1)%s != 0)
	{	
		digui(i-s+1);
		digui(i+1);
		digui(i+s+1);
	}
	digui(i-s);
	digui(i+s);
}

//递归空白格

function digui(id){
	if($('#'+id).text() != 'lei' && $('#'+id).css('color') != 'rgb(0, 0, 0)')
	{
		$('#'+id).css('color','black');
		if($('#'+id).text() == '0'){
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
	}
	start();
}