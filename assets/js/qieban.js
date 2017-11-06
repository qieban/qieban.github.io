
/* 切图移动slicy框架*/
(function($){
	
	var a = function(){
			
		}
		
		var methods = {
			init:function(){
				
			},
			destory: function(){
				
			},
			val:function(){
					
			}
		}
	
	$.fn.QietuMobileJS = function(){
		
		var b= function(){
			alert(3);	
		}
		
	}
	/*QietuMobile.prototype = {
		plugins: {},
		aa: function() {
			
		},
		isSupportTouch: function() {
			
		},
		isSupport3D: function() {
			
		},
		getTranslate: function(f) {
			
		},
		ie8: function() {
		
		}
	};*/
})(jQuery);



function mask(){
	/*遮罩*/
		$('.layout').prepend('<div id="mask"></div>').find('#mask').css({opacity:0.5, 
	cursor:'pointer', background:'black', position:'absolute', zIndex:999, width:'100%', top:0, left:0, 'bottom':0});	
		
		$('#mask').on('click',function(){
				closeDialog();
				removeMask();					   
		})
		
	}
	function removeMask(){
		$('#mask').remove();	
	}
	
	function closeDialog(){
		$('.dialog').removeClass('dialog-selected');	
		removeMask();
	}
	

	
	
	
$(function(){
		   
	
		   
	/*var miqie =  new QietuMobileJS();	
	
	miqie.b();*/
	
	$('#header-tg').click(function(){
		if($('.aside').is(':visible')){
			$('.aside').hide();
		}
		else{
			$('.aside').show();
		}
		return false;
	})
	
	
	
	/*点击菜单以外的任意地方，菜单消失*/
	$(document).bind("click",function(e){
		var target = $(e.target);
		if(target.closest(".layout .aside").length == 0){
			
			$('.aside').hide();
			
		}
	}) 
	
	
	
	$('#back').click(function(){
		history.back();				  
	})
	
	
	
	$('a[rel=dialog]').click(function(){
									 
		mask();
		$($(this).attr('href')).addClass('dialog-selected');
		
	})
	
	
	
	$('#closeDialog').bind('click',function(){
		closeDialog();
		removeMask();										
	})
	
	$('.tab-link').click(function(){
		$(this).parent().find('.tab-link').removeClass('active').eq($(this).index()).addClass('active');		
		
		$('.tabs .tab').slideUp().parent().find($(this).attr('href')).slideDown();
		return false;
	})
	
	
	/*幻灯片*/
	$('.slider li').eq($('.slider .num span.selected').index()).addClass('selected');
		$('.slider .tip').html($('.slider li.selected').attr('title'));
		$('.slider .num span').tap(function(){
			
			if($(this).hasClass('selected')){
				return false;	
			}
			var curr = $('.slider li').eq($(this).index());
			curr.show();
			$('.slider li.selected').stop().fadeOut(1000,function(){
				$(this).removeClass('selected');
				curr.addClass('selected');
			}); 
			
			$('.slider .num span').removeClass('selected');
			$(this).addClass('selected');
			
			/*tip*/
			$('.slider .tip').html(curr.attr('title'));
			
			return false;
		})	
		
		$.extend({
			sliderAutoChange:function(){
				
				var curr = $('.slider li').eq($('.slider .num span.selected').index());
				
				if($('.slider .num span.selected').next().size()==0){
					var next = $('.slider li:first');
					
					// 状态
					$('.slider .num span').removeClass('selected');
					$('.slider .num span:first').addClass('selected');
				}
				else{
					var next = curr.next('li');
					
					// 状态
					var light = $('.slider .num span.selected');
					$('.slider .num span').removeClass('selected');
					light.next().addClass('selected');
				}
				next.show();
				curr.fadeOut(1000,function(){
					curr.removeClass('selected');
					next.addClass('selected');
				}); 
				
			/*tip*/
			$('.slider .tip').html(next.attr('title'));
				
				 
				return false;
				
			}
		})
		_sliderAutoChange = setInterval("$.sliderAutoChange()",3000);
		
		$('.slider').mouseover(function(){
			clearInterval(_sliderAutoChange);
		})
		$('.slider').mouseout(function(){
			_sliderAutoChange = setInterval("$.sliderAutoChange()",3000);					 
		}) 
	
	
	
	if($('.preloader').size()>0){
		setTimeout(function(){
			$('.preloader .layout').fadeIn();
			$('.preloader').removeClass('preloader');
		},
		1000)	
	}
	
	/*验证码*/
	$('#getcode').live('click',function(event){
									
		if($(this).hasClass('disabled')){
				return false;	
			}
			
			$(this).addClass('disabled');
								 
			 var ths = $(this);
			 var val = $(event.target)[0].tagName == 'INPUT' ? ths.val() : ths.html();
			 var isinput = $(event.target)[0].tagName == 'INPUT' ? true : false;
			 var time = 60;
			 
			 if(isinput){
					ths.val(time+ '秒后可重发');		 
				}
				else{
					ths.html(time + '秒后可重发');
				}
				
			 _timeRun = setInterval(function(){
				if(time==1){
					ths.css('cursor','pointer');
					if(isinput){
					
						ths.val(val);		 
					}
					else{
					
						ths.html(val);
					}
					clearInterval(_timeRun);
					ths.removeClass('disabled');
				}
				if(time>1){
					time--;
					//console.log(time);
					ths.css('cursor','default');
					
					
					
					 //alert($(event.target)[0].tagName);
					 if(isinput){
						ths.val(time+ '秒后可重发');		 
					}
					else{
						ths.html(time + '秒后可重发');
					}
				}
				
				
			},1000);
								
		
		return false;											
	})
	
	/*上拉下拉刷新*/
	$(window).bind('scroll',function(bb){
			
			 bb.stopPropagation();
			
			
			var a = $(document).height() - $(window).height();
			
			// 底部
			if(Math.abs($(window).scrollTop()) >= a){
				
				if($('.pull-down').is(':animated')) return false;
				
				$.ajax({
				
					type: "POST",
					
					url: "pullUp.php",
					dataType: "text", 
					
					//data: "page=1,
					
					// 加载中状态
					beforeSend: function(){
						$('.pull-down').slideDown();
					},
					
					// 成功状态
					success: function(msg){
						//模拟延时
						setTimeout(function(){
							//添加数据
							$('#pullList').append(msg);
							$('.pull-down').hide();
						},1000)
					}
				}); 
			}
			
			//顶部
			if(Math.abs($(window).scrollTop()) <= 0){
				if($('.pull-up').is(':animated')) return false;
				
				$.ajax({
				
					type: "POST",
					
					url: "pullUp.php",
					dataType: "text", 
					
					//data: "page=1,
					
					// 加载中状态
					beforeSend: function(){
						$('.pull-up').slideDown();
					},
					
					// 成功状态
					success: function(msg){
						//模拟延时
						setTimeout(function(){
							//添加数据
							$('#pullList').prepend(msg);
							$('.pull-up').hide();
						},1000)
					}
				}); 


//				setTimeout(function(){
//					$('.pull-up').slideUp();
//				},2000)
			}
			//顶部结束
		})
	
	/*加载音乐*/
		if($('#music-audio').size()>0){
			setTimeout(function(){
		        $('#music-audio').get(0).play();
		    },100)
		}
		
		$('#music').click(function(){
			if($(this).hasClass('stopped')){
				$(this).removeClass('stopped');
				$('#music-audio').get(0).play();
			}
			else{
				$(this).addClass('stopped');
				$('#music-audio').get(0).pause();
			}
		})
		
	/*弹幕*/
	$.extend({
		danmaku:function(){
			
			//超过3个隐藏 (css3 nth-child(n+3)写法在360急速模式下不兼容，于是用jq来写)
			$('#danmaku li').show();
			$('#danmaku li:gt(3)').hide();
			
			//动画
			$('#danmaku ul').animate({'marginTop':'-=2'},50, function(){
				
				//定义变量
				var obj = $(this);
				var mgt = parseInt($(this).css('marginTop'));
				var fh = parseInt($('#danmaku li:first').height());
				
				//快到顶部的时候，逐渐消失
				if(-mgt - fh >= -30){
					obj.find('li:first').stop().animate({'opacity':0},'fast',function(){
						
						$(this).css('opacity',1);
					});
				}
				
				//第一个放到最后，循环
				//console.log(mgt+'----'+fh);
				if(-mgt - fh >= 10){
					obj.css('marginTop',0).find('li:first').appendTo(obj);
				}
				
				
			});
		}
	})
	// 函数重复调用，基于jQuery的方法一定要以上面的写法定义，否则这里不会生效
	_danmaku = setInterval("$.danmaku()",50);
	
})