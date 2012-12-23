$(document).ready(function() {
	// Slider
	$('.bxslider').bxSlider({
		pager: false,
		auto: true
	});

	// Menu
	$("header #menu li>a").live({
		
			mouseenter: function() {
				if(! $(this).hasClass("active")) {
					$(this).find("span.main").animate({
						'marginTop': '-43px'
					}, 200);
				}
			},
			mouseleave: function() {
				$(this).find("span.main").stop(true, true).animate({
					'margin-top': '0px'
				}, 200);
			}
	});

	// Scroll - Back to top
	$("#back-to-top").hide();

	$(window).scroll(function() {
		if ($(this).scrollTop() > 200) {
			$("#back-to-top").fadeIn();
		} 
		else {
			$("#back-to-top").fadeOut();
		}
	});
	$("#back-to-top").click(function () {
		$("body,html").animate({
			scrollTop: 0
		}, 800);
	});

	// Displaying articles (JSON & AJAX)
	$.ajax({
		url: "ajax/article.json.txt",
		success: function(data) {
			var json = eval(data);
			/**** Displaying article's extracts of each category (webdesign, jquery, php, html5&css3 ****/
			$.each(json, function(index, article) {
				if(article.category == "webdesign") {
					$("#article-webdesign").append("<section class='content article'><article class='article'><div class='date'><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></div><h3>"+article.title+"</h3><img src='images/articles/small/"+article.image+"' alt='' /><p>"+article.extract+"<br /><a href='#' class='green' id='"+article.id+"'>Lire la suite</a></p></article></section>");
				}
				if(article.category == "jquery") {
					$("#article-jquery").append("<section class='content article'><article class='article'><div class='date'><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></div><h3>"+article.title+"</h3><img src='images/articles/small/"+article.image+"' alt='' /><p class='extract'>"+article.extract+"<br /><a href='#' class='green' id='"+article.id+"'>Lire la suite</a></p></article></section>");
				}
			});
			/**** Displaying only one article ("Lire la suite") ****/
			$("#article-webdesign section.content article.article p a").click(function() {
				var id = $(this).attr("id");
				$.each(json, function(index, article) {
					if(article.category == "webdesign" && article.id == id) {
						$("#article-webdesign").html("<section class='content article'><article class='article'><div class='date'><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></div><h3>"+article.title+"</h3><img src='images/articles/"+article.image+"' alt='' /><p>"+article.text+"<strong>"+article.author+"</strong></p></article></section>");
					}
				});
			});
			$("#article-jquery section.content article.article p a").click(function() {
				var id = $(this).attr("id");
				$.each(json, function(index, article) {
					if(article.category == "jquery" && article.id == id) {
						$("#article-jquery").html("<section class='content article'><article class='article'><div class='date'><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></div><h3>"+article.title+"</h3><img src='images/articles/"+article.image+"' alt='' /><p>"+article.text+"<strong>"+article.author+"</strong></p></article></section>");
					}
				});
			});
		}
	});

	// Citations
	var citation = $("#citation-content div:first-child");
	var length = $('#citation-content > div').length;
	var i = 1;
	setInterval(function() {
		citation.fadeOut("slow", function () {
			citation.addClass("hidden").fadeOut("slow");
			citation.next().fadeIn("slow").removeClass("hidden");
			citation = citation.next();
			i++;
			if(i > length) {
				citation = $("#citation-content div:first-child");
				citation.fadeIn("slow").removeClass("hidden");
				i = 1;
			}
		});
	}, 15000);

	// Fake placeholder attribute - IE browser compatibility
	$("form div.placeholder").each(function() {
		var label = $(this).find("label");
		var input = $(this).find("input, textarea");
		if(input.val() != "") {
			label.stop().hide();
		}
		input.focus(function() {
			if(input.val() == "") {
				label.stop().fadeTo(500, 0.5);
			}
		});
		input.blur(function() {
			if(input.val() == "") {
				label.stop().fadeTo(500, 1);
			}
		});
		input.keypress(function() {
			label.stop().hide();
		});
		input.keyup(function() {
			if(input.val() == "") {
				label.stop().fadeTo(500, 0.5);
			}
		});
		// Reset button
		$("#contact-form form div input.reset").click(function() {
			label.stop().fadeTo(500, 1);
		});
	});

	// Fancybox - contact form
	$('.fancybox').fancybox({
		padding: 0,
		openEffect : 'fade',
		openSpeed  : 500,

		closeEffect : 'fade',
		closeSpeed  : 200,

		closeClick : false
    });

	// Twitter - get last tweets
	function loadLatestTweet() {
		var numTweets = 1;
		var _urlK = 'https://api.twitter.com/1/statuses/user_timeline/kaymorey.json?callback=?&count='+numTweets+'&include_rts=1';
		var _urlA = 'https://api.twitter.com/1/statuses/user_timeline/agouenee.json?callback=?&count='+numTweets+'&include_rts=1';
		$.getJSON(_urlK, function(data) {
			for(var i = 0; i< data.length; i++) {
				var tweet = data[i].text;
				tweet = tweet.parseURL().parseUsername().parseHashtag();
				$("#twitter .katia-list").append('<p>'+tweet+'</p>');
			}
		});
		$.getJSON(_urlA, function(data) {
			for(var i = 0; i< data.length; i++) {
				var tweet = data[i].text;
				tweet = tweet.parseURL().parseUsername().parseHashtag();
				$("#twitter .audrey-list").append('<p>'+tweet+'</p>');
			}
		});
	}
	loadLatestTweet();

	// Twitter Parsers
	String.prototype.parseURL = function() {
		return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
			return url.link(url);
		});
	};
	String.prototype.parseUsername = function() {
		return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
			var username = u.replace("@","");
			return u.link("http://twitter.com/"+username);
		});
	};
	String.prototype.parseHashtag = function() {
		return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
			var tag = t.replace("#","%23");
			return t.link("http://search.twitter.com/search?q="+tag);
		});
	};
});