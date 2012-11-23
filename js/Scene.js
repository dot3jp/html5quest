// JavaScript Document

var Scene = function()
{
	this._sound = new Sound();
}

Scene.prototype = {
	
	prologue:function()
	{
		var o = this;
		
		$('body').removeClass('ng');
		
		$("#wrapper").append('<div id="imgDummy"/>')
		//$("#imgDummy").append('<img src="img/monster/zako.png" width="0" height="0"><img src="img/monster/kanbu.png" width="0" height="0"><img src="img/monster/boss.png" width="0" height="0">')
		
		$("#title>h1>img,li#start > span.lnk").click(function(){
			o._sound.play(o._sound._id.gameStart_click);
			
			$("#title").fadeOut(1000)
			setTimeout(function(){o.chapter1.call(o); },2000)
			//setTimeout(function(){o.instruction.call(o); },2000)
			
			$("#imgDummy").remove();
		})
		
		$("#start>.lnk").hover(
			function(){o._sound.play(o._sound._id.gameStart_over)},
			function(){return false}
		)
		
		$("#sound2>#off").css("color", "#999999")
		$("#sound").css("display", "none")
		
		<!--$("#help").click(function(){o.instruction.call(o)})-->
	},
	
	instruction:function()
	{
		var o = this;
		$("#tutorial").remove()
		$("#wrapper").children().fadeOut(500, function(){
			
			$("#wrapper").append('<section id="tutorial"><h2>ちゅーとりある　がめん</h2><article><p id="tutorial_ttl">-&nbsp;あそびかた&nbsp;-</p><p id="tutorial_img"><img src="img/tutorial.jpg" alt="ローカルの画像を「コマンド」枠にいれてね" width="435" height="304"/></p><p id="tutorial_next"><a href="javascript:void(0);">とじる</a></p></article></section>').hide().fadeIn(500);
			
			$("#tutorial_next").click(function(e){
				e.preventDefault();
				
				$("#tutorial").fadeOut(500, function(){
				$("#tutorial").remove();
				$("#wrapper").children().css("display","block")})
			})
		})
	},
	
	chapter1:function()
	{
		$("#wrapper").html('<section id="name"><h2>なまえにゅうりょく　がめん</h2><article id="set"><fieldset class="bx"><legend>クリックして　なまえを　いれてください</legend><ul><li class="current"><blink>*</blink></li><li>_</li><li>_</li><li>_</li><li>_</li><li>_</li><li>_</li><li>_</li></ul> </fieldset></article><article id="edit" class="bx"><div><ul><li>A</li><li>B</li><li>C</li><li>D</li><li>E</li></ul><ul><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li></ul><ul><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li></ul><ul><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li></ul><ul><li>あ</li><li>い</li><li>う</li><li>え</li><li>お</li></ul><ul><li>か</li><li>き</li><li>く</li><li>け</li><li>こ</li></ul><ul><li>さ</li><li>し</li><li>す</li><li>せ</li><li>そ</li></ul><ul><li>た</li><li>ち</li><li>つ</li><li>て</li><li>と</li></ul><ul><li>な</li><li>に</li><li>ぬ</li><li>ね</li><li>の</li></ul><ul><li>っ</li><li>ゃ</li><li>ゅ</li><li>ょ</li><li>”</li></ul></div><div><ul><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li></ul><ul><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li></ul><ul><li>Z</li><li>.</li><li>,</li><li>^</li><li>-</li></ul><ul><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li></ul><ul><li>は</li><li>ひ</li><li>ふ</li><li>へ</li><li>ほ</li></ul><ul><li>ま</li><li>み</li><li>む</li><li>め</li><li>も</li></ul><ul><li>や</li><li>　</li><li>ゆ</li><li>　</li><li>よ</li></ul><ul><li>ら</li><li>り</li><li>る</li><li>れ</li><li>ろ</li></ul><ul><li>わ</li><li>　</li><li>を</li><li>　</li><li>ん</li></ul><ul><li>゜</li><li id="return">もどる</li><li id="end">けってい</li></ul></div></article></section>');
		
		$("#sound").css("display", "block")
		$("#helpWrap").hide()
		var zako = new Image();
		zako.src='img/monster/zako.png';
		
		var o = this;
		var sound = this._sound
		
		var name = new Name(sound);
		name.init();
		
		$("li:not(#end):not(#return)").click(function(){sound.play(sound._id.nameInput_click)})
		
		$("#end").click(function(e){
			e.preventDefault();
			
			sound.pause(sound._id.inputName);
			sound.play(sound._id.gameStart_click);
			
			var braveName = name.getBraveName(); 
			
			$("#name").fadeOut(1000)
			setTimeout(function(){o.chapter2.call(o, braveName)}, 1000)
			//setTimeout(function(){o.epilogue.call(o, braveName)}, 1500)
		})
	},
	
	chapter2:function(nameStr)
	{
		var tag = '<section id="battle"><h2>せんとう　がめん</h2><article id="status" class="bx"><dl><dt>ほげほげ</dt><dd id="hp">HP：100</dd><dd id="lv">LV：1</dd></dl></article><article id="monster"><img src="img/monster/zako.png" alt="" width="65" height="60"></article><article id="select"><div id="action" class="bx"><p>ほげほげ　の　こうげき！<br>30のダメージ</p></div><div id="detail" class="bx"><p><span>コマンド</span></p><ul><li>こうげき(jpg)</li><li>まほう(gif)</li><li>かいふく(png)</li></ul></div></article></section>'
		
		var tag2 = '<section id="save"><h2>せーぶ　がめん</h2><article class="bx"><p id="retry"><span class="lnk">もう&nbsp;いちど&nbsp;たたかう</span></p><p><a href="http://twitter.com/home?status=RT+'+nameStr+' は&nbsp;てきに&nbsp;やぶれた&nbsp;【HTML5であそんでみたクエスト】+http%3A%2F%2Fbit.ly/dot3-html5quest" target="new" class="lnk">twitterに たびの　けっかを　きろくする</a></p></article></section>'
		
		$("#wrapper").html(tag)
		$("#helpWrap").show()
		
		var o = this;
		//var battle = new Battle(new Brave(nameStr, 18, 1),new Zako(20, 5), this._sound, this._sound._id.battle01, Serif.battleZako, true)
		var battle = new Battle(new Brave(nameStr, 18, 1),new Zako(100, 5), this._sound, this._sound._id.battle01, Serif.battleZako, true)
		
		battle.addEventListener("onBattleEnd", o, function(){
			o.chapter3.call(o, nameStr)
		})
		
		battle.addEventListener("onBattleLose", o, function(){
			o.postscript.call(o, "#wrapper", nameStr, tag2, o.chapter2)
		})
		
		battle.start()
	},
	
	chapter3:function(nameStr)
	{
		$("#effect").children().remove();
		
		var tag = '<section id="battle"><h2>せんとう　がめん</h2><article id="status" class="bx"><dl><dt>ほげほげ</dt><dd id="hp">HP：100</dd><dd id="lv">LV：1</dd></dl></article><article id="monster"><img src="img/monster/kanbu.png" alt="" width="215" height="170"></article><article id="select"><div id="action" class="bx"><p>ほげほげ　の　こうげき！<br>30のダメージ</p></div><div id="detail" class="bx"><p><span>コマンド</span></p><ul><li>こうげき(jpg)</li><li>まほう(gif)</li><li>かいふく(png)</li></ul></div></article></section>'
		
		var tag2 = '<section id="save"><h2>せーぶ　がめん</h2><article class="bx"><p id="retry"><span class="lnk">もう&nbsp;いちど&nbsp;たたかう</span></p><p id="restart"><span class="lnk">さいしょ&nbsp;から&nbsp;あそぶ</span></p><p><a href="http://twitter.com/home?status=RT+'+nameStr+' は&nbsp;中ボスに&nbsp;やぶれた&nbsp;【HTML5であそんでみたクエスト】+http%3A%2F%2Fbit.ly/dot3-html5quest" target="new" class="lnk">twitterに たびの　けっかを　きろくする</a></p></article></section>'
		
		$("#wrapper").html(tag)
		
		var o = this;
		//var battle = new Battle(new Brave(nameStr, 86, 23),new Zako(100, 20), this._sound, this._sound._id.battle02, Serif.battleKanbu)
		var battle = new Battle(new Brave(nameStr, 86, 23),new Zako(500, 20), this._sound, this._sound._id.battle02, Serif.battleKanbu)
		
		battle.addEventListener("onBattleEnd", o, function(){
			var kanbu = new Image();
			kanbu.src='img/monster/kanbu.png';
			o.chapter4.call(o, nameStr)
		})
		
		battle.addEventListener("onBattleLose", o, function(){
			o.postscript.call(o, "#wrapper", nameStr, tag2, o.chapter3)
		})
		
		battle.start()
	},
	
	chapter4:function(nameStr)
	{
		$("#effect").children().remove();
		
		var tag = '<section id="battle"><h2>せんとう　がめん</h2><article id="status" class="bx"><dl><dt>ほげほげ</dt><dd id="hp">HP：100</dd><dd id="lv">LV：1</dd></dl></article><article id="monster" class="boss"><img src="img/monster/boss.png" alt="" width="570" height="335"></article><article id="select"><div id="action" class="bx"><p>ほげほげ　の　こうげき！<br>30のダメージ</p></div><div id="detail" class="bx"><p><span>コマンド</span></p><ul><li>こうげき(jpg)</li><li>まほう(gif)</li><li>かいふく(png)</li></ul></div></article></section>'
		
		var tag2 = '<section id="save"><h2>せーぶ　がめん</h2><article class="bx"><p id="retry"><span class="lnk">もう&nbsp;いちど&nbsp;たたかう</span></p><p id="restart"><span class="lnk">さいしょ&nbsp;から&nbsp;あそぶ</span></p><p><a href="http://twitter.com/home?status=RT+'+nameStr+' は&nbsp;ラスボスに&nbsp;やぶれた&nbsp;【HTML5であそんでみたクエスト】+http%3A%2F%2Fbit.ly/dot3-html5quest" target="new" class="lnk">twitterに たびの　けっかを　きろくする</a></p></article></section>'
		
		$("#wrapper").html(tag)
		
		var o = this;
		//var battle = new Battle(new Brave(nameStr, 912, 93),new Zako(444, 200), this._sound, this._sound._id.battle03, Serif.battleBoss)
		var battle = new Battle(new Brave(nameStr, 912, 93),new Zako(1500, 200), this._sound, this._sound._id.battle03, Serif.battleBoss)
		
		battle.addEventListener("onBattleEnd", o, function(){
			var boss = new Image();
			boss.src='img/monster/boss.png';
			o.epilogue.call(o, nameStr)
		})
		
		battle.addEventListener("onBattleLose", o, function(){
			o.postscript.call(o, "#wrapper", nameStr, tag2, o.chapter4)
		})
		
		battle.start()
	},
	
	epilogue:function(nameStr)
	{
		$("#effect").children().remove();
		$("body").removeClass("pinch");
		
		var tag = '<section id="epilogue"><h2>えぴろーぐ　がめん</h2><article><div><p>たたかいはおわった・・</p></div><div><p>じつは&nbsp;まおうの&nbsp;まのてに&nbsp;おびえていた</p><p>せかいの&nbsp;ひとびとに</p><p>へいわが&nbsp;おとずれた・・</p></div><div><p>ありがとう、ゆうしゃよ</p><p>ありがとう、プレイしてくれたあなた</p></div><div><p>へいわよ、えいえんに・・</p></div><div><p>no more war・・ no more IE6・・</p></div></article><article><div><p>&lt;&lt;&nbsp;staff&nbsp;&gt;&gt;</p><p><span>html,css:</span><span>&nbsp;<a href="http://twitter.com/kzms2" target="new" class="lnk">@kzms2</a></span></p><p><span>javascript:</span><span>&nbsp;<a href="http://twitter.com/szkid" target="new" class="lnk">@szkid</a>&nbsp;<a href="http://twitter.com/kzms2" target="new" class="lnk">@kzms2</a></span></p><p><span>charactor:</span><span>&nbsp;<a href="http://twitter.com/natchonbrike" target="new" class="lnk">@natchonbrike</a></span></p><p><span>music:</span><span>&nbsp;<a href="http://maoudamashii.jokersounds.com/" target="new" class="lnk">まおうたましい</a></span></p><p><span>director:</span><span>&nbsp;<a href="http://twitter.com/szkid" target="new" class="lnk">@szkid</a></span></p></div><div><p>created by</p><p>.3</p></div></article></section>'
		
		var tag2 = '<section id="save"><h2>せーぶ　がめん</h2><article class="bx"><p id="restart"><span class="lnk">さいしょ&nbsp;から&nbsp;あそぶ</span></p><p><a href="http://twitter.com/home?status=RT+'+nameStr+' は&nbsp;せかいを&nbsp;すくった！！&nbsp;【HTML5であそんでみたクエスト】+http%3A%2F%2Fbit.ly/dot3-html5quest" target="new" class="lnk">twitterに たびの　けっかを　きろくする</a></p></article></section>'
		
		this._sound.play(this._sound._id.epilogue)
		
		$("#wrapper").html(tag)
		$("#epilogue").css({"margin-top":460})
		
		$("#epilogue article:first").css({"margin-bottom":460})
		$("#epilogue div").css({"margin-bottom":"1.3em"})
		$("#epilogue div p span").css({"display":"inline-block", "width":200, "text-align":"left"})
		$("#epilogue div p span:even").css({"text-align":"right"})
		
		var o = this;
		var epilogueH = $("#epilogue").height()+10;
		
		$("#epilogue").animate(
			{"margin-top":-epilogueH},
			50000,
			"linear",
			function(){
				o.postscript.call(o,"#wrapper",nameStr, tag2)
			}
		)
		
		
	},
	
	postscript:function(targetNameStr, nameStr, msgTag, scene)
	{
		$("#effect").children().remove();
		
		var o = this;
		var targetH = $(targetNameStr).height()+10
		
		setTimeout(function(){
			$(targetNameStr).html(msgTag)
			
			epilogueH = $(targetNameStr).height()+10
			
			//$(targetNameStr).css({"margin-top":230-epilogueH/2, "display":"none"});
			$(targetNameStr).hide().fadeIn("slow")
			
			$("#retry").click(function(){scene.call(o,nameStr)})
			$("#restart").click(function(){o.chapter2.call(o,nameStr)})
		}, 2000)
	}
}