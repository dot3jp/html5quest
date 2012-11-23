// JavaScript Document

var Battle = function(braveObj, enemyObj, sound, bgm, serifs, instructionFlag)
{
	this._brave = braveObj;
	this._enemy = enemyObj;
	
	this._turnInSec = 3000
	this._cmtSec = 1500;
	this._turnChangeSec = 1500;
	this._serifSec = 3000;
	
	this._sound = sound
	this._bgm = bgm
	this._serifs = serifs
	
	this._instructionFlag = instructionFlag
	
	this._listener = [];
}

Battle.prototype =
{
	start:function()
	{
		$("#action p").html("てき が あらわれた！")
		$("#detail").addClass('off')
		
		this._sound.play(this._bgm,true)
		
		var o = this;
		var f = this.inputCommand
		var f2 = this.showInstruction
		
		var serifs = this._serifs.start
		var serifLength = serifs.length
		var serifNum = 0;
		
		var timer = setInterval(function(){
			var serif = serifs[serifNum].replace("__braveName__", o._brave._name)
			
			$("#action p").html(serif)
			
			serifNum ++;
			
			if(serifNum == serifLength){
				clearInterval(timer); 
				setTimeout(function(){f.call(o);if(o._instructionFlag){setTimeout(function(){f2.call(o)},2000)}},o._turnInSec);
			}
		}, this._serifSec)
	},
	
	inputCommand:function()
	{
		$("#action p").html("コマンドの せんたく！<br/>ローカルの　がぞうを　コマンドわくに　ドロップ！→<br><span style='font-size:75%'>(?:<span id='helpBtn' class='lnk'>あそびかた　を　みる</span>)</span>")
		
		$("#detail").removeClass('off')
				
		var detail = document.getElementById("detail");
		var o = this;
		var f = this.setBraveAction;
		
		
		$("#helpBtn").click(function(){o.showInstruction.call(o)})
		
		detail.addEventListener("dragover",function(e){						  
			e.preventDefault();
			$("body").addClass("dragover")
		},true)
		
		detail.addEventListener("dragleave",function(e){						  
			e.preventDefault();
			$("body").removeClass("dragover")
		},true)
		
		detail.addEventListener("drop",function(e){
			e.preventDefault();
			$("body").removeClass("dragover")
			
			var file = e.dataTransfer.files[0];
			
			if(file.type == "image/jpeg" || file.type == "image/gif" || file.type == "image/png")
			{
				/*
				var img = new Image();
				img.src = file.getAsDataURL();
				img.onload = function(){
					f.call(o, file.type, file.size, img)
				}
				*/
				
				var fr = new FileReader();
				
				fr.onload = function(e)
				{
						var img = new Image();
						img.src =e.target.result;
						img.onload = function(){
							f.call(o, file.type, file.size, img)
						}
				}
				
				fr.readAsDataURL(file);
			}
			else
			{
				f.call(o, file.type, file.size)
			}
			
			
			var detail = document.getElementById("detail");
			detail.removeEventListener("dragover", arguments.callee, true);
			detail.removeEventListener("drop", arguments.callee, true);
			
			$("#detail").addClass('off')
		},true)
	},
	
	setBraveAction:function(type, num, imgSrc)
	{	
		var action = this._brave.setAction(type, num, imgSrc)
		$("#action p").html(action)
		
		var o = this;
		var f = this.turnStart;
		
		setTimeout(function(){f.call(o)}, this._turnInSec)
	},
	
	turnStart:function()
	{
		var dice = Math.floor(Math.random()*10)
		if(dice%2){this.braveTurn(true)}else{this.enemyTurn(true)}
	},
	
	braveTurn:function(initiativeFlag)
	{
		var o = this;
		var brave = this._brave;
		var enemy = this._enemy;
		
		$("#action p").html(brave._name+" の ターン！")
		
		var f1 = this.enemyTurn;
		var f2 = this.turnEnd;
		var f3 = this.win;
		var f4 = this.lose;
		
		var sound = this._sound
		
		var sec = this._turnChangeSec
		var effect = new Effect('#effect');
		
		setTimeout(function()
		{
			switch(brave._action)
			{
				case "attack":
				
				var damage = brave.attack();
				var ehp = enemy.damaged(damage);
				
				effect.attack(brave._img);
				
				setTimeout(function(){
					if(damage>1)
					{
						$("#action p").html("てき に "+damage+"のダメージ")
					}
					else
					{
						$("#action p").html("がぞう　が　かるすぎて　きいて　いない！")
					}
					
					if(enemy._hp<=0)
					{
						setTimeout(function(){f3.call(o,false)}, sec)
					}
					else
					{
						if(initiativeFlag==true)
						{
							setTimeout(function(){f1.call(o,false)}, sec)
						}
						else
						{
							setTimeout(function(){f2.call(o)}, sec)
						}			
					}
				},750)
				
				break;
				
				case "magic":
				
				var damage = brave.magic();
				var ehp = enemy.damaged(damage.power);
				
				effect.magic(brave._img)
				
				setTimeout(function(){
					if(damage.power>1)
					{
						if(damage.lucky)
						{
							$("#action p").html("こうか　は　ばつぐん　だ！<br>てき に "+damage.power+"のダメージ")
						}
						else
						{
							$("#action p").html(brave._name+"は　まほう　を　まちがえた！<br>てき に "+damage.power+"のダメージ")
						}
						
					}
					else
					{
						$("#action p").html("がぞう　が　かるすぎて　きいて　いない！")
					}
					
					if(enemy._hp<=0)
					{
						setTimeout(function(){f3.call(o,false)}, sec)
					}
					else
					{
						if(initiativeFlag==true)
						{
							setTimeout(function(){f1.call(o,false)}, sec)
						}
						else
						{
							setTimeout(function(){f2.call(o)}, sec)
						}			
					}
				},750)
				break;
				
				case "heal":
				var heal = brave.heal();
				
				effect.heal(brave._img)
				
				setTimeout(function(){
					if(heal>1)
					{
						$("#action p").html(brave._name+" は "+heal+"かいふくした！")
					}
					else
					{
						$("#action p").html("がぞうが　かるすぎて　かいふく　できない！")
					}
					
					if(enemy._hp<=0)
					{
						setTimeout(function(){f3.call(o,false)}, sec)
					}
					else
					{
						if(initiativeFlag==true)
						{
							setTimeout(function(){f1.call(o,false)}, sec)
						}
						else
						{
							setTimeout(function(){f2.call(o)}, sec)
						}			
					}
				},750)
				break;
				
				default:
				$("#action p").html(brave._name+" は こんらんしている！")
				
				if(enemy._hp<=0)
				{
					setTimeout(function(){f3.call(o,false)}, sec)
				}
				else
				{
					if(initiativeFlag==true)
					{
						setTimeout(function(){f1.call(o,false)}, sec)
					}
					else
					{
						setTimeout(function(){f2.call(o)}, sec)
					}			
				}
				
				break;
			}
		},
		this._cmtSec)
	},
	
	enemyTurn:function(initiativeFlag)
	{
		$("#action p").html("てき の ターン！")
		
		var o = this;
		
		var brave = this._brave;
		var enemy = this._enemy;
		
		var f1 = this.braveTurn;
		var f2 = this.turnEnd;
		var f3 = this.win;
		var f4 = this.lose;
		
		var sound = this._sound
		
		var sec = this._turnChangeSec
		
		setTimeout(function()
		{
			var damage = enemy.attack();
			var bhp = brave.damaged(damage);
			
			sound.play(sound._id.damaged)
			
			var effect = new Effect('#battle');
			effect.shake();
			
			$("#action p").text(brave._name+" に "+damage+"のダメージ")
			
			if(brave._hp<=0)
			{
				setTimeout(function(){f4.call(o)}, sec)
			}
			else
			{
				if(initiativeFlag==true)
				{
					setTimeout(function(){f1.call(o,false)}, sec)
				}
				else
				{
					setTimeout(function(){f2.call(o)}, sec)
				}			
			}
		},
		this._cmtSec)
	},
	
	turnEnd:function()
	{
		var o = this;
		var f = this.inputCommand
		var s = this._turnChangeSec/2
		
		setTimeout(function(){f.call(o)},s)
	},
	
	win:function()
	{	
		var sound = this._sound;
		var bgm = this._bgm
		
		sound.pause(bgm)
		sound.play(sound._id.win)
		
		$("#monster").fadeOut(1000)
		$("#action p").text("てき を たおした！")
		
		var o = this;
		var f = this.eventDispatch
		
		var serifs = this._serifs.end
		var serifLength = serifs.length
		var serifNum = 0;
		
		var timer = setInterval(function(){
			var serif = serifs[serifNum].replace("__braveName__", o._brave._name)
			
			$("#action p").html(serif)
			
			serifNum ++;
			
			if(serifNum == serifLength){
				clearInterval(timer); 
				setTimeout(function(){f.call(o, "onBattleEnd")},o._turnInSec);
			}
		}, this._serifSec)
	},
	
	lose:function()
	{
		var sound = this._sound;
		var bgm = this._bgm
		
		sound.pause(bgm)
		sound.play(sound._id.lose)
		
		$("#action p").text("ぜんめつした　ｵﾜﾀ")
		
		
		var o = this;
		var f = this.eventDispatch
		
		var braveName = this._brave._name
		
		setTimeout(function(){
			$("#battle").fadeOut(2000, function(){f.call(o, "onBattleLose")})
		},2500)
		
	},
	
	end:function()
	{
	},
	
	showInstruction:function()
	{
		$("#wrapper").append('<section id="help"><h2>へるぴ　がめん</h2><a href="#" id="help_x" class="bx">Xとじる</a><article id="help_img" class="bx"><p><img src="img/tutorial.jpg" alt="ローカルの画像を「コマンド」枠にいれてね" width="380" height="266"/></p><p id="help_ttl">-&nbsp;あそびかた&nbsp;-</p></article></section>')
		$("#help").hide().fadeIn(300)//show();
		
		$("#help #help_x, #help:not(#help_img)").click(function(){$("#help").remove();})
	},
	
	addEventListener:function(evt, obj, method)
	{
		this._listener.push({evt:evt, obj:obj, method:method})
	},
	
	eventDispatch:function(evt, arg)
	{
		var l = this._listener;
		
		for(var i in l)
		{
			if(l[i].evt == evt)l[i].method.call(l[i].obj, arg)
		}
	}
}