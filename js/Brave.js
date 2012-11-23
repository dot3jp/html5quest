// JavaScript Document

var Brave = function(nameStr, hp, lv)
{	
	this._name = nameStr
	
	this._maxHp = hp;
	this._hp = this._maxHp;
	
	this._lv = lv
	
	this._action = ""
	this._power = 0;
	
	this._img = ""
	
	this._inputOffset = 10000//100000;
	
	$("#status dl dt").text(this._name)
	$("#hp").text("HP:"+this._hp)
	$("#lv").text("LV:"+this._lv)
	
	this.checkStatusColor();
}

Brave.prototype = 
{	
	setAction:function(type, num, imgSrc)
	{
		this._img = imgSrc
		
		switch(type)
		{
			case "image/jpeg":
			this._action = "attack";
			this._power = Math.floor(num/this._inputOffset);
			return "こうげき を せんたく！";
			break;
			
			case "image/gif":
			this._action = "magic";
			this._power = Math.floor(num/this._inputOffset);
			return "まほう を せんたく！";
			break;
			
			case "image/png":
			this._action = "heal";
			this._power = Math.floor(num/this._inputOffset)*2;
			return "かいふく を せんたく！";
			break;
			
			default:
			this._action = "";
			return "？？？ を せんたく！";
			break;
		}
	},
	
	action:function()
	{
		return this._action;
	},
	
	attack:function()
	{
		return this._power;
	},
	
	magic:function()
	{
		var dice = Math.floor(Math.random()*10)
		
		var outPut = {}
		//outPut.power = 0;
		if(dice%3){
			outPut.power = Math.floor(this._power/2)
			outPut.lucky = false
		}
		else
		{
			outPut.power = this._power*4
			outPut.lucky = true
		}
		
		return outPut
	},
	
	heal:function()
	{
		this._hp += this._power
		
		if(this._hp > this._maxHp){this._hp = this._maxHp}
		
		this.checkStatusColor();
		
		$("#hp").text("HP:"+this._hp)
		
		return this._power
	},
	
	damaged:function(damage)
	{
		this._hp -= damage;
		
		this.checkStatusColor();
		
		$("#hp").text("HP:"+this._hp)
		
		return this._hp;
	},
	
	checkStatusColor:function()
	{
		var dom = $("body")
		
		if(this._hp <= 0){dom.removeClass("pinch").addClass("die"); this._hp = 0}
		else if(this._hp < this._maxHp/3){dom.addClass("pinch");}
		else{dom.removeClass("pinch").removeClass("die");}
	}
}