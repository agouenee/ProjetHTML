$(document).ready(function() {
	$('.bxslider').bxSlider({
		pager: false
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

	//Twitter Parsers
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