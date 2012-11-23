// JavaScript Document

var Effect = function(target)
{
	this._target = target;
	this._base = 'effect';
	$('<div>').attr('id',this._base).appendTo('#wrapper');
	
	this._sound = new Sound();
}

Effect.prototype =
{
	shake:function(target){
		var mv = 10;
		var dl = 50;
		$(this._target).animate({
			marginLeft:'10px'
		},mv).delay(dl).animate({ 
			marginLeft:'-10px'
		},mv).delay(dl).animate({ 
			marginLeft:'6px'
		},mv).delay(dl).animate({ 
			marginLeft:'-6px'
		},mv).delay(dl).animate({ 
			marginLeft:'3px'
		},mv).delay(dl).animate({ 
			marginLeft:'-3px'
		},mv).delay(dl).animate({ 
			marginLeft:'0'
		},mv);
	},
	generateCanvas:function(target,img,length){
		var w = img.width;
		var h = img.height;
		var top = 0;
		var left = 0;
		if(w>h){
			var adjW = 100;
			var adjH = h/(w/100);
		}else{
			var adjW = w/(h/100);
			var adjH = 100;
		}
		var base ='#'+this._base;
		
		for(var i=0;i<length;i++){
			
			$('<div id="'+target+i+'Wrap"><div id="'+target+i+'WrapInner"><canvas id="'+target+i+'" width="'+adjW+'" height="'+adjH+'" style=""></canvas></div></div>').appendTo(base);
			
			var canvas = $('#'+target+i)[0];
			if(!canvas||!canvas.getContext){return false;};
			
			var ctx = canvas.getContext('2d');
			
			ctx.beginPath();
			if(adjW>adjH){
				ctx.arc(adjH/2, adjH/2, adjH/2, 0, Math.PI * 2, false);
			}else{
				ctx.arc(adjW/2, adjW/2, adjW/2, 0, Math.PI * 2, false);
			}
			ctx.clip();
			
			ctx.drawImage(img,0,0,w,h,left,top,adjW,adjH);
		}
  	},
	generateCanvasMagic:function(target,img,length){
		var w = img.width;
		var h = img.height;
		var top = 0;
		var left = 0;
		if(w>h){
			var adjW = 100;
			var adjH = h/(w/100);
		}else{
			var adjW = w/(h/100);
			var adjH = 100;
		}
		var base ='#'+this._base;
		
		for(var i=0;i<length;i++){
			
			$('<div id="'+target+i+'Wrap"><div id="'+target+i+'WrapInner"><canvas id="'+target+i+'" width="'+adjW+'" height="'+adjH+'" style=""></canvas></div></div>').appendTo(base);
			
			var canvas = $('#'+target+i)[0];
			if(!canvas||!canvas.getContext){return false;};
			
			var ctx = canvas.getContext('2d');
			
			ctx.beginPath();
			
			ctx.moveTo(Math.floor(Math.random()*adjW), 0)
			ctx.lineTo(adjW, Math.floor(Math.random()*adjH))
			ctx.lineTo(Math.floor(Math.random()*adjW), adjH)
			ctx.lineTo(0, Math.floor(Math.random()*adjH))
			ctx.closePath();
			
			ctx.fill();
			
			ctx.clip();
			
			ctx.drawImage(img,0,0,w,h,left,top,adjW,adjH);
		}
  	},
	attack:function(imgSrc){
		this.set('attack');
		var f = this.generateCanvas;
		var o = this;
		var length = 3;
		var target = this._base+'C'
		var img = imgSrc
		
		f.call(o,target,img,length);
		
		for(var i=0;i<length;i++){
			$('#'+target+i+'Wrap').css({
				'-moz-transform':'skew(-45deg)',
				'opacity':0,
			}).delay(50*i).animate({
				opacity:'1'
			},10).animate({
				top:'80%',
				right:'80%',
				width:50,
				height:50,
				opacity:0
			},300);
		}
		
		o._sound.play(o._sound._id.attack)
	},
	magic:function(imgSrc){
		this.set('magic');
		var f = this.generateCanvasMagic;
		var o = this;
		var length = 10;
		var target = this._base+'C'
		var img = imgSrc;
		
		f.call(o,target,img,length);
		
		for(var i=0; i<length; i++)
		{
			var targetH = $('#'+target+i+'Wrap').height()
			
			var baseTop = ($("#wrapper").height() - targetH)/2
			var baseMargin = targetH/2*(Math.sin(45*i))
			
			var top = baseTop - baseMargin
			var left =  $('#'+target+i+'Wrap').width()*i;
			
			$('#'+target+i+'Wrap').css({"top":top, "left":left, "width":30/i, "height":30/i, "opacity":0})
			
			$('#'+target+i+'Wrap').delay(50*i).animate({
				'opacity':1
			}, 300).animate({
				'opacity':0
			}, 800)
		}
			
			
		o._sound.play(o._sound._id.magic)
	},
	heal:function(imgSrc){
		this.set('heal');
		var f = this.generateCanvas;
		var o = this;
		var length = 6;
		var target = this._base+'C'
		var img = imgSrc;
		
		f.call(o,target,img,length);
		
		for(var i=0;i<length;i++){
			var scaleNum = ((Math.floor(Math.random()*5))+5)/10;//0-4
			var bottomNum = Math.floor(Math.random()*10)+5;//0-5
			var leftNum = Math.floor(Math.random()*10-5)
			var dlyNum = Math.floor(Math.random()*15)*10;
			$('#'+target+i+'Wrap').css({
				'-moz-transform':'scale('+scaleNum+')',
				'bottom':bottomNum+'%',
				'left':15*i+leftNum+'%',
				'opacity':0
			}).delay(dlyNum).animate({
				opacity:'1'
			},10).animate({
				bottom:'50%',
				opacity:0
			},800);
		}
		
		o._sound.play(o._sound._id.heal)
	},
	set:function(addCls){
		$('#'+this._base).attr('class','').addClass(addCls).empty();
	},
	animRotate:function(target,start,end,time){
		intervalID = setInterval(function(){animRotateCoa()},100);
	},
	animRotateCoa:function(target,start,end,time){
		if($('#wrapper')){
			$(target).css('-moz-transform','rotate('+scaleNum+')');
		}else{
			clearInterval(intervalID);
		}
	}
}