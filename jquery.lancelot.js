(function ($) {
    $.fn.lancelot = function (options) {
		var L = {};
        L.defaults = {
            hoverTime: 2000,		//time to launch the link
            aclass: "lancelotGo",	//style, see lancelot.css
            atext: "",				//text to show
            show: "false",			//
            speed: "fast",			//animation
            linkAction: "location",	//open, _blank
            atitle: "go in 2s",		//link title
            alink: false,			//url OR function
            element: "a"			//element to hover
        };
        L.o = $.extend(L.defaults, options);


        //the plugin
        return this.each(function () {
            obj = $(this);


            //where we go?
            L.ahref =  obj.attr("href");
			if ($.isFunction(L.o.alink)) {
                L.ahref = L.o.alink.call();
			} else if (L.o.alink !== false) {
				L.ahref = L.o.alink;
            }


            //create element
            if (L.o.element !== "a") {
                obj.append($(document.createElement(L.o.element)).addClass(L.o.aclass));
            } else {
                obj.append(' <a href="' + L.ahref + '" class="' + L.o.aclass + '" title="' + L.o.atitle + '">' + L.o.atext + '</a>');
            }
            var goLink = obj.find("." + L.o.aclass);


            //show animation
            if (L.o.show !== "true") {
                goLink.hide();
                obj.hover(
                    function () {
                        goLink.fadeIn(L.o.speed);
                    },
                    function () {
                        goLink.fadeOut(L.o.speed);
                    }
				);
            }


            L.launch = function () {
                switch (L.o.linkAction) {
				case "open":
                    window.open(this);
					break;
				case "_blank":
					window.open(this, '_blank');
                    break;
				default:
                    window.location = L.ahref;
                }
            };


            //prepare to launch
            L.t = {};//timer
            goLink.hover(
                function () {
                    if (L.t) {
                        window.clearTimeout(L.t);
                    }
                    L.t = window.setTimeout(L.launch, L.o.hoverTime);
                },
                function () {
                    window.clearTimeout(L.t);
                }
			);


        });//each
    };//fn.lancelot
})(jQuery);