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
	$("#back-to-top a").hide();

	$(window).scroll(function() {
		if ($(this).scrollTop() > 200) {
			$("#back-to-top a").fadeIn();
		} 
		else {
			$("#back-to-top a").fadeOut();
		}
	});
	$("#back-to-top a").click(function () {
		$("body,html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	// Articles (JSON & AJAX)
	$.ajax({
		url: "ajax/articles.json.txt",
		success: function(data) {
			var json = eval(data);
			// Displaying last article's extracts on home page
			$.each(json, function(index, article) {
				if(article.last_article == true) {
					var content = "<article><a href='#' id='"+article.id+"'><img src='images/articles/last/"+article.image+"' alt='' /><figcaption><p><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></p></figcaption><h3>"+article.title+"</h3>"+article.small_extract+"</a></article></section>";
					if(article.id % 2 == 0) {
						$("#last-articles div").append(content);
					}
					else {
						$("#last-articles").append(content);
					}
				}
			});
			// Hover effect on last article's image
			$("#last-articles article a").hover(
				function() {
					var figcaption = $(this).children("figcaption");
					$(figcaption).css("background-color", "#67b013");
					var p = figcaption.children("p");
					$(p).css("display", "block");
				}, 
				function() {
					var figcaption = $(this).children("figcaption");
					$(figcaption).css("background-color", "transparent");
					var p = figcaption.children("p");
					$(p).css("display", "none");
				}
			);

			// Displaying article's extracts in each category (webdesign, jquery, php, html5&css3)
			$.each(json, function(index, article) {
				if($("#articles-"+article.category).length != 0) {
					var tags = article.tags.split(",");
					var content = "<section class='content article'><article class='article'><div class='date'><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></div><h3>"+article.title+"</h3><img src='images/articles/small/"+article.image+"' alt='' /><p>"+article.extract+"<br /><a href='#' class='green' id='"+article.id+"'>Lire la suite</a><br /><br /></p></article></section>";
					$("#articles-"+article.category).append(content);
					// Displaying tags
					for(i in tags) {
						$(".article:last p").append(
							"<span class='green'>#"+tags[i]+"</span>"
						);
					};
				}
			});

			// Displaying only one article
			$("section article a").click(function() {
				var id = $(this).attr("id");
				$.each(json, function(index, article) {
					if(article.id == id) {
						// Hide sections
						$(".slider").addClass("hidden");
						$("#about").addClass("hidden");
						$("#last-articles").addClass("hidden");
						$("#articles-"+article.category).addClass("hidden");
						// Put class active on article's category in menu
						$("header #menu #"+article.category+" a").addClass("active");
						// Display article
						$("#article-content").html("<section class='content article'><article class='article'><div class='date'><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></div><h3>"+article.title+"</h3><img src='images/articles/"+article.image+"' alt='' /><p>"+article.text+"<strong>"+article.author+"</strong></p></article></section>");
					}
				});
			});

			// Displaying search result(s)
			$("#search").submit(function() {
				var tags = $("form input[name='search']").val();
				// If nothing has been entered, block form sending
				if(tags == "") {
					return false;
				}
				tags = tags.split(" ");
				var results = false;
				// Empty "search-result" each search
				$("#search-result").html("");
				$("#search-result").removeClass("no-result");
				for(i in tags) {
					$.each(json, function(index, article) {
						// Hide sections 
						$(".slider").addClass("hidden");
						$("#about").addClass("hidden");
						$("#last-articles").addClass("hidden");
						$("#article-content").addClass("hidden");
						$("#articles-"+article.category).addClass("hidden");
						var article_tags = article.tags.split(",");
						for(j in article_tags) {
							if(article_tags[j] == tags[i]) {
								results = true;
								// Append search result(s)
								$("#search-result").append("<section class='content article'><article class='article'><div class='date'><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></div><h3>"+article.title+"</h3><img src='images/articles/small/"+article.image+"' alt='' /><p>"+article.extract+"<br /><a href='#' class='green' id='"+article.id+"'>Lire la suite</a><br /><br /></p></article></section>");
								// Displaying tags
								for(k in article_tags) {
									$(".article:last p").append("<span class='green'>#"+article_tags[k]+"</span>");
								}
								break;
							}
						}
					});
				}
				// If nothing has been found, display no result message
				if(!results && tags != "") {
					$("#search-result").append("<section class='content article'><article><strong class='green'>Super Kiwi</strong> n'a trouvé aucun article correspondant à <strong>&laquo;&nbsp;"+tags+"&nbsp;&raquo;</strong>.</article></section>");
					$("#search-result").addClass("no-result");
				}
				// Displaying only one article of the research
				$("#search-result article a").click(function() {
					var id = $(this).attr("id");
					$.each(json, function(index, article) {
						if(article.id == id) {
							// Hide sections
							$("#search-result").html("");
							$("#article-content").removeClass("hidden");
							$("#articles-"+article.category).addClass("hidden");
							// Put class active on article's category in menu
							$("header #menu a").removeClass("active");
							$("header #menu #"+article.category+" a").addClass("active");
							// Display article
							$("#article-content").html("<section class='content article'><article class='article'><div class='date'><span class='day'>"+article.day+"</span><br /><span class='month'>"+article.month+"</span></div><h3>"+article.title+"</h3><img src='images/articles/"+article.image+"' alt='' /><p>"+article.text+"<strong>"+article.author+"</strong></p></article></section>");
						}
					});
				});
				return false;
			});
		}
	});

	// Citations
	var citation = $("#citation-content div:first");
	var length = $('#citation-content > div').length;
	var cpt = 1;
	setInterval(function() {
		citation.fadeOut("slow", function () {
			citation.addClass("hidden").fadeOut("slow");
			citation.next().fadeIn("slow").removeClass("hidden");
			citation = citation.next();
			cpt++;
			if(cpt > length) {
				citation = $("#citation-content div:first");
				citation.fadeIn("slow").removeClass("hidden");
				cpt = 1;
			}
		});
	}, 5000);

	// Form validation
	$("#contact-form form").validate();
	$("#newsletter form").validate();

	// Newsletter
	$("#newsletter form input[type='submit']").click(function() {
		if($("#newsletter form input[type='text']").hasClass('valid')) {
			// La on est censé appeler notre jolie page PHP et ajouter le mail dans notre jolie BDD (s'il n'est pas déjà présent)
			alert("Merci votre inscription a la newsletter a bien été prise en compte.");
			alert("En fait non vu qu'il n'y à pas de PHP sur ce site mais chut.");
		}
		return false;
	});

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
			// Hide error messages
			$("#contact-form form span.error").css("display", "none");
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
