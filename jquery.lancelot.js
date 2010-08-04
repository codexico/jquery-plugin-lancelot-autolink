(function($){
$.fn.lancelot = function(options) {

	var defaults = {
		hoverTime: 2000,
		aclass: "lancelotGo",
		atext: "go",
		show: "true",
		display: "inline",
		speed: "fast",
		linkAction: "location",
		atitle: "go in 2s"
	}
	var options = $.extend(defaults, options);

	//the plugin
    return this.each(function() {
		obj = $(this);
		var ahref = obj.attr("href");
		var t = '';

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
		};

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
	});//each
};
})(jQuery);
