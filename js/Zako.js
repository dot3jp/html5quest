// JavaScript Document

var Zako = function(hp, power)
{
	this._dom = $("#monster")
	
	this._hp = hp;
	this._power = power;
}

Zako.prototype =
{
	attack:function()
	{
		var p = this._power;
		return Math.floor(Math.random()*p)
	},
	
	damaged:function(damage)
	{
		this._hp -= damage
		
		var dom = this._dom
		var num = 0;
		
		var timer = setInterval(function(){
			if(dom.css("display")=="block")
			{
				dom.css({"display":"none"})
			}
			else
			{
				dom.css({"display":"block"})
			}
			num++
			if(num > 3)clearInterval(timer)
		},100)
		
		return this._hp;
	}
}