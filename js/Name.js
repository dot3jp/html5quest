// JavaScript Document
/*
 * //文字クリックされた文字を取得
 * //取得した文字を表示
 * //次のカーソルへ移動
 * 
 * 「もどる」クリックされたら1文字削除(li.currentの前にliがあれば)
 * 「おわる」クリックされたら名前を保存
 * Scene.js　のchapter1を叩けばおｋ！
*/

var Name = function(sound)
{
	this._domDisp = $('#set');
	this._domTxt = $('#edit');
	this._nowTxt = '<blink>*</blink>';
	
	this._sound = sound
}

Name.prototype =
{
	init:function()
	{
		this.getTxt();
		this._sound.play(this._sound._id.inputName, true)
	},
	getTxt:function()
	{
		var o = this;
		var li = this._domTxt.find('li:not(#end)');
		var disp = this.addTxt;
		var dlt = this.deleteTxt;
		li.click(function(){
			//console.debug($(this).text());
			if(this.id!='return'){
				disp.call(o,$(this).text());
			}else{
				dlt.call(o);
			}
		});
	},
	addTxt:function(txt)
	{
		var o = this;
		var target = this._domDisp.find('li.current + li');
		this._domDisp.find('li.current').html(txt).removeClass('current').addClass('ok');
		this.gotoNextTxt(target);
		//console.debug(this.getBraveName());
	},
	deleteTxt:function()
	{
		if(this._domDisp.find('li:first').hasClass('ok')){
			this._domDisp.find('li.current').html('_').removeClass('current');
			var target = this._domDisp.find('li.ok:last').addClass('current').removeClass('ok');
			target.html(this._nowTxt);
		}
	},
	getBraveName:function()
	{
		var tpmName = '';
		$('#set ul li.ok').each(function(){
			tpmName += $(this).text();
		});
		if(tpmName==''){
			tpmName = 'ゆうしゃ';
		}
		return tpmName;
	},
	gotoNextTxt:function(target)
	{
		target.addClass('current').html(this._nowTxt);
	}
}