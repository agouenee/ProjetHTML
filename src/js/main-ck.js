$(document).ready(function(){function loadLatestTweet(){var e=1,t="https://api.twitter.com/1/statuses/user_timeline/kaymorey.json?callback=?&count="+e+"&include_rts=1",n="https://api.twitter.com/1/statuses/user_timeline/agouenee.json?callback=?&count="+e+"&include_rts=1";$.getJSON(t,function(e){for(var t=0;t<e.length;t++){var n=e[t].text;n=n.parseURL().parseUsername().parseHashtag();$("#twitter .katia-list").append("<p>"+n+"</p>")}});$.getJSON(n,function(e){for(var t=0;t<e.length;t++){var n=e[t].text;n=n.parseURL().parseUsername().parseHashtag();$("#twitter .audrey-list").append("<p>"+n+"</p>")}})}$(".bxslider").bxSlider({pager:!1,auto:!0});$("header #menu li>a").live({mouseenter:function(){$(this).hasClass("active")||$(this).find("span.main").animate({marginTop:"-43px"},200)},mouseleave:function(){$(this).find("span.main").stop(!0,!0).animate({"margin-top":"0px"},200)}});$("#back-to-top a").hide();$(window).scroll(function(){$(this).scrollTop()>200?$("#back-to-top a").fadeIn():$("#back-to-top a").fadeOut()});$("#back-to-top a").click(function(){$("body,html").animate({scrollTop:0},800);return!1});$.ajax({url:"ajax/articles.json.txt",success:function(data){var json=eval(data);$.each(json,function(e,t){t.last_article==1&&(t.id%2==0?$("#last-articles div").append("<article><a href='#' id='"+t.id+"'><img src='images/articles/last/"+t.image+"' alt='' /><h3>"+t.title+"</h3>"+t.small_extract+"</a></article></section>"):$("#last-articles").append("<article><a href='#' id='"+t.id+"'><img src='images/articles/last/"+t.image+"' alt='' /><h3>"+t.title+"</h3>"+t.small_extract+"</a></article></section>"))});$.each(json,function(e,t){t.category=="webdesign"&&$("#articles-webdesign").append("<section class='content article'><article class='article'><div class='date'><span class='day'>"+t.day+"</span><br /><span class='month'>"+t.month+"</span></div><h3>"+t.title+"</h3><img src='images/articles/small/"+t.image+"' alt='' /><p>"+t.extract+"<br /><a href='#' class='green' id='"+t.id+"'>Lire la suite</a><br /><br /><span class='green'>#"+t.tags+"</span><span class='green'>#"+t.category+"</span></p></article></section>");t.category=="jquery"&&$("#articles-jquery").append("<section class='content article'><article class='article'><div class='date'><span class='day'>"+t.day+"</span><br /><span class='month'>"+t.month+"</span></div><h3>"+t.title+"</h3><img src='images/articles/small/"+t.image+"' alt='' /><p class='extract'>"+t.extract+"<br /><a href='#' class='green' id='"+t.id+"'>Lire la suite</a><br /><br /><span class='green'>#"+t.tags+"</span><span class='green'>#"+t.category+"</span></p></article></section>")});$("section article a").click(function(){var e=$(this).attr("id");$.each(json,function(t,n){if(n.id==e){$(".slider").addClass("hidden");$("#about").addClass("hidden");$("#last-articles").addClass("hidden");$("#articles-"+n.category).addClass("hidden");$("header #menu #"+n.category+" a").addClass("active");$("#article-content").html("<section class='content article'><article class='article'><div class='date'><span class='day'>"+n.day+"</span><br /><span class='month'>"+n.month+"</span></div><h3>"+n.title+"</h3><img src='images/articles/"+n.image+"' alt='' /><p>"+n.text+"<strong>"+n.author+"</strong></p></article></section>")}})});$("#search").submit(function(){$("#search-result").html("");var e=$("form input[name='search']").val();$.each(json,function(t,n){if(n.tags==e){$(".slider").addClass("hidden");$("#about").addClass("hidden");$("#last-articles").addClass("hidden");$("#article-content").addClass("hidden");$("#articles-"+n.category).addClass("hidden");$("#search-result").append("<section class='content article'><article class='article'><div class='date'><span class='day'>"+n.day+"</span><br /><span class='month'>"+n.month+"</span></div><h3>"+n.title+"</h3><img src='images/articles/small/"+n.image+"' alt='' /><p>"+n.extract+"<br /><a href='#' class='green' id='"+n.id+"'>Lire la suite</a><br /><br /><span class='green'>#"+n.tags+"</span><span class='green'>#"+n.category+"</span></p></article></section>")}});$("#search-result article a").click(function(){var e=$(this).attr("id");$.each(json,function(t,n){if(n.id==e){$("#search-result").html("");$("#article-content").removeClass("hidden");$("#articles-"+n.category).addClass("hidden");$("header #menu a").removeClass("active");$("header #menu #"+n.category+" a").addClass("active");$("#article-content").html("<section class='content article'><article class='article'><div class='date'><span class='day'>"+n.day+"</span><br /><span class='month'>"+n.month+"</span></div><h3>"+n.title+"</h3><img src='images/articles/"+n.image+"' alt='' /><p>"+n.text+"<strong>"+n.author+"</strong></p></article></section>")}})});return!1})}});var citation=$("#citation-content div:first-child"),length=$("#citation-content > div").length,i=1;setInterval(function(){citation.fadeOut("slow",function(){citation.addClass("hidden").fadeOut("slow");citation.next().fadeIn("slow").removeClass("hidden");citation=citation.next();i++;if(i>length){citation=$("#citation-content div:first-child");citation.fadeIn("slow").removeClass("hidden");i=1}})},15e3);$("#contact-form form").validate();$("#newsletter form").validate();$("#newsletter form input[type='submit']").click(function(){alert("Merci votre inscription a la newsletter a bien été prise en compte.");alert("En fait non vu qu'il n'y a pas de PHP sur ce site mais chuuut.");return!1});$("form div.placeholder").each(function(){var e=$(this).find("label"),t=$(this).find("input, textarea");t.val()!=""&&e.stop().hide();t.focus(function(){t.val()==""&&e.stop().fadeTo(500,.5)});t.blur(function(){t.val()==""&&e.stop().fadeTo(500,1)});t.keypress(function(){e.stop().hide()});t.keyup(function(){t.val()==""&&e.stop().fadeTo(500,.5)});$("#contact-form form div input.reset").click(function(){e.stop().fadeTo(500,1);$("#contact-form form span.error").css("display","none")})});$(".fancybox").fancybox({padding:0,openEffect:"fade",openSpeed:500,closeEffect:"fade",closeSpeed:200,closeClick:!1});loadLatestTweet();String.prototype.parseURL=function(){return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g,function(e){return e.link(e)})};String.prototype.parseUsername=function(){return this.replace(/[@]+[A-Za-z0-9-_]+/g,function(e){var t=e.replace("@","");return e.link("http://twitter.com/"+t)})};String.prototype.parseHashtag=function(){return this.replace(/[#]+[A-Za-z0-9-_]+/g,function(e){var t=e.replace("#","%23");return e.link("http://search.twitter.com/search?q="+t)})}});