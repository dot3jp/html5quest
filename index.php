<?php include('./lib/config.php'); ?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="keywords" content="dot3,戦う制作,html5,css3,html,css,javascript,drag,drop,fileapi">
<meta name="description" content="HTML5を用いたファイルドラッグアンドドロップ型コマンド入力戦闘RPG。Dir:szkid ME:kzms2 Pg:szkid,kzms2 D:natchonbrike。">
<title>HTML5であそんでみたクエスト - dot3</title>
<!--[if lte IE 8]><script type="text/javascript" src="http://dot3.jp/cmn/js/html5.js"></script><![endif]-->
<link rel="icon" href="http://dot3.jp/img/favicon.ico" type="image/x-icon">
<link rel="stylesheet" href="css/master.css" media="all">
</head>
<?php
//sbm php include
//$sbm = include('/home/team-3/www/cmn/php/getSbm.php');
$catch = '<h1><img src="img/title.png" width="400" height="142" alt="HTML5で遊んでみたQUEST"></h1><object width="450" height="361"><param name="movie" value="http://www.youtube.com/v/Sn61Lh3wfCM&hl=ja_JP&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/Sn61Lh3wfCM&hl=ja_JP&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="450" height="361"></embed></object>';

$sbm = '<ul id="sbm"><li id="sbmH"><a href="http://b.hatena.ne.jp/append?http://dot3.jp/html5quest/" target="new"><img src="img/ic_b.png" alt="はてなブックマーク" title="はてなブックマーク" /></a><a href="http://b.hatena.ne.jp/entry/http://dot3.jp/html5quest/" target="new"><img src="http://b.hatena.ne.jp/entry/image/http://dot3.jp/html5quest/"></a></li><li id="sbmT"><a href="http://twitter.com/home?status=RT+【HTML5であそんでみたクエスト】+http%3A%2F%2Fbit.ly/dot3-html5quest" target="new"><img src="img/ic_t.png" alt="Twitter" title="このサイトをTwitterでみんなに教える。" /></a><a rel="nofollow" href="http://tweetbuzz.jp/redirect?url=http://dot3.jp/html5quest/" bitly="BITLY_PROCESSED" target="new"><img alt="" src="http://tools.tweetbuzz.jp/imgcount/?url=http://dot3.jp/html5quest/"></a></li><li id="sbmD"><a href="http://del.icio.us/post?v=4;url=http://dot3.jp/html5quest/?;title=HTML5であそんでみたクエスト" title="delicious" target="new"><img src="img/ic_d.png" alt="delicious" /></a></li></ul>';

$footer = '<footer>(c)<a href="http://dot3.jp" target="new" class="lnk">.3</a> All Rights Reserved. music by <a href="http://maoudamashii.jokersounds.com/" class="lnk" target="new">まおうだましい</a></footer>';

//fx3.6以上の場合
$html_gt_fx36 = '<body class="ng">
<div id="wrapAll">
	<div id="wrapper">
		<section id="title"><h1><img src="img/title.png" width="500" height="177" alt="HTML5で遊んでみたQUEST" class="lnk"></h1><ul><li id="start">&lt;&lt;&nbsp;<span class="lnk">ゲームスタート</span>&nbsp;&gt;&gt;</li><li id="sound2">sound:&nbsp;<span class="lnk" id="on">on</span>/<span class="lnk" id="off">off</span></li></ul>
		'.$sbm.'
		'.$footer.'
		</section>
		<noscript><section id="ngTitle">'
		.$catch.'
			<fieldset class="bx">
				<legend>JavascriptがONじゃなきゃダメ。ぜったい。</legend>
				<p>おつかいのかんきょうでは、HTML5であそんでみたクエストはあそべません。<br>
せっていからJavascriptをONにしてください。</p>
			</fieldset>

			'.$sbm.'
			'.$footer.'
		</section><style type="text/css">#title,#sound{display:none;}</style></noscript>
	</div>
	<div id="sound">♪sound:<span class="lnk">on</span></div>
	<aside id="audio">
		<audio id="gameStart_click_audio">
			<source src="sound/gameStart_click.ogg">
		</audio>
		<audio id="gameStart_over_audio">
			<source src="sound/gameStart_over.ogg">
		</audio>
		<audio id="nameInput_click_audio">
			<source src="sound/nameInput_click.ogg">
		</audio>
		<audio id="inputName_audio">
			<source src="sound/inputName.ogg">
		</audio>
		<audio id="battle01_audio">
			<source src="sound/battle01.ogg">
		</audio>
		<audio id="battle02_audio">
			<source src="sound/battle02.ogg">
		</audio>
		<audio id="battle03_audio">
			<source src="sound/battle03.ogg">
		</audio>
		<audio id="attack_audio">
			<source src="sound/attack.ogg">
		</audio>
		<audio id="heal_audio">
			<source src="sound/heal.ogg">
		</audio>
		<audio id="magic_audio">
			<source src="sound/magic.ogg">
		</audio>
		<audio id="damaged_audio">
			<source src="sound/damaged.ogg">
		</audio>
		<audio id="win_audio">
			<source src="sound/win.ogg">
		</audio>
		<audio id="lose_audio">
			<source src="sound/lose.ogg">
		</audio>
		<audio id="epilogue_audio">
			<source src="sound/epilogue.ogg">
		</audio>
	</aside>
</div>
<script type="text/javascript" src="js/master.min.js"></script>
';

//fx3.6未満の場合
$html_lt_fx36 = '<body class="ng">
<div id="wrapAll">
	<div id="wrapper">
		<section id="ngTitle">'
		.$catch.'
			<fieldset id="ngDtl" class="bx">
				<legend>FirefoxかChromeじゃなきゃダメ。ぜったい。</legend>
				<p>おつかいのブラウザでは、HTML5であそんでみたクエストはあそべません。<br>
したのダウンロードボタンから、さいしんのFirefoxかChromeをダウンロードしてください。</p>
				<p class="btn">→<a href="http://getfirefox.jp/" target="new">GET Firefox</a></p>
				<p class="btn">→<a href="http://www.google.co.jp/chrome/" target="new">GET Chrome</a></p>
			</fieldset>
			<noscript><fieldset class="bx">
				<legend>JavascriptがONじゃなきゃダメ。ぜったい。</legend>
				<p>おつかいのかんきょうでは、HTML5であそんでみたクエストであそべません。<br>
せっていからJavascriptをONにしてください。</p>
			</fieldset><style type="text/css">#ngDtl{display:none;}</style></noscript>

			'.$sbm.'
			'.$footer.'
		</section>
	</div>
</div>';
//fx以外の場合
$html_not_fx = $html_lt_fx36;

$browser = getBrowser();
if($browser['name']=='Mozilla Firefox'||$browser['name']=='Google Chrome'){
	if($browser['version']>=3.6){
		echo $html_gt_fx36;
	}else{
		echo $html_lt_fx36;
	}
}else{
	echo $html_not_fx;
	//echo $html_gt_fx36;
}
?>
<script>var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script>
<script>try {var pageTracker = _gat._getTracker("UA-15912797-3");pageTracker._trackPageview();} catch(err) {}</script>
</body>
</html>
