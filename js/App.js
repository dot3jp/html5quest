// JavaScript Document

$(function(){
	
	$("#wrapAll").bind("dragover", function(e){e.preventDefault();})
	$("#wrapAll").bind("drop", function(e){e.preventDefault();})
	
	var scene = new Scene();
	scene.prologue();
})