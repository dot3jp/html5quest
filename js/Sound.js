// JavaScript Document

var Sound = function()
{
	this._id = {
	
	gameStart_click:document.getElementById("gameStart_click_audio"),
	gameStart_over:document.getElementById("gameStart_over_audio"),
	
	nameInput_click:document.getElementById("nameInput_click_audio"),
	
	inputName:document.getElementById("inputName_audio"),
	
	battle01:document.getElementById("battle01_audio"),
	battle02:document.getElementById("battle02_audio"),
	battle03:document.getElementById("battle03_audio"),
	
	attack:document.getElementById("attack_audio"),
	magic:document.getElementById("magic_audio"),
	heal:document.getElementById("heal_audio"),
	
	damaged:document.getElementById("damaged_audio"),
	
	win:document.getElementById("win_audio"),
	lose:document.getElementById("lose_audio"),
	
	epilogue:document.getElementById("epilogue_audio")
	}
	
	var sound = this;
	$("#sound span").click(function(){
		sound.mute();
		if($(this).text()=="on"){$(this).text("off")}else{$(this).text("on")}
	})
	
	$("#sound2>#on").click(function(){
		sound.mute();
		
		$("#sound2>#on").css("color", "#fff")
		$("#sound2>#off").css("color", "#999999")
		
		if($("#sound span").text()=="on"){$("#soundBtn").text("off")}else{$("#soundBtn").text("on")}
	})
	
	$("#sound2>#off").click(function(){
		sound.mute();
		
		$("#sound2>#on").css("color", "#999999")
		$("#sound2>#off").css("color", "#fff")
		
		if($("#sound span").text()=="on"){$("#sound span").text("off")}else{$("#sound span").text("on")}
	})
	
	var sounds = this._id
	for(i in sounds)
	{
		sounds[i].volume = 0.2;
	}
}

Sound.prototype =
{
	play:function(sound,loopB)
	{
		sound.currentTime = 0;
		sound.play();
		
		if(loopB)sound.addEventListener("ended", function(e){this.play()}, false);
	},
	
	pause:function(sound)
	{
		sound.pause();
	},
	
	mute:function()
	{
		var sounds = this._id
		
		for(i in sounds)
		{
			sounds[i].muted = !sounds[i].muted;
		}
	}
}