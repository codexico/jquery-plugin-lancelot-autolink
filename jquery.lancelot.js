(function($){
$.fn.lancelot = function(options) {

	var defaults = {
		hoverTime: 2000,		//time to launch the link
		aclass: "lancelotGo",	//style, see lancelot.css
		atext: "",			//text to show
		show: "false",			//
		display: "inline",		//inline, block ...
		speed: "fast",			//animation
		linkAction: "location",	//open, _blank or none
		atitle: "go in 2s",		//link title
		alink: false			//url OR function or none
	}
	var options = $.extend(defaults, options);

	//the plugin
    return this.each(function() {
		obj = $(this);
		var t = '';

		//where we go?
		var ahref = "";
		if(options.alink != false){
			$.isFunction(options.alink) ?
				ahref = options.alink.call()
            : ahref = options.alink;
		}else{
			ahref = obj.attr("href");
		}

		//create link
		obj.append(' <a href="'+ahref+'" class="'+options.aclass+'" title="'+options.atitle+'">'+options.atext+'</a>');
		var goLink = obj.find("."+options.aclass).css("display", options.display);

		//show animation
		if(options.show != "true"){
			goLink.hide()
			obj.hover(
				function(){
					goLink.fadeIn(options.speed)
				},
				function(){
					goLink.fadeOut(options.speed)
				}
			);
		}

		//prepare to launch
		goLink.hover(
			function(){
				if(t) {
					clearTimeout(t);
				}
				t = setTimeout(launch, options.hoverTime);
			},
			function(){
				clearTimeout(t);
			}
		);//goLink.hover

		var launch = function() {
			switch(options.linkAction){
				case "open":
					window.open(this);
					break;
				case "_blank":
					window.open(this, '_blank');
					break;
				default:
					window.location = ahref;
			}
		};

	});//each
};
})(jQuery);
