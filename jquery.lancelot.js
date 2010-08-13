(function ($) {
    $.fn.lancelot = function (options) {
        var L = {};//closure
        L.defaults = {
            hoverTime: 2000,		//time to launch the link in miliseconds
            aclass: "lancelotGo",	//style, @see lancelot.css
            atext: "",			//text to show
            show: "false",		//if true dont hide the lancelots
            speed: "fast",		//animation. TODO: other options
            linkAction: "location",	//if "open" or "_blank" will try to open a new window. TODO: accept parameters
            atitle: "go in 2s",		//link title
            alink: false,		//if 'string' will use as the url, if 'function' will call to build the url
            element: "a",		//element to hover
            launch: false               //function to call when hoverTime is over
        };
        L.o = $.extend(L.defaults, options);

        //the plugin
        return this.each(function () {
            //obj is a reference to each $('.lancelot')
            var obj = $(this);


            //where we go?
            var ahref = obj.attr("href");
            if (L.o.alink !== false) {
                ahref = L.o.alink;
                if ($.isFunction(L.o.alink)) {
                    ahref = L.o.alink(obj);
                }
            }
            L.ahref = ahref;


            //create and append element to hover
            L.o.hoverElement = ' <a href="' + ahref + '" class="' + L.o.aclass + '" title="' + L.o.atitle + '">' + L.o.atext + '</a>';
            if (L.o.element !== "a") {
                L.o.hoverElement = $(document.createElement(L.o.element)).addClass(L.o.aclass);
            }
            obj.append(L.o.hoverElement);


            //get the new created element
            var goLink = obj.find("." + L.o.aclass);
            L.goLink = goLink;


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


            var launch = function () {
                switch (L.o.linkAction) {
                    case "open":
                        window.open(ahref, "ttlocalwindow");
                        break;
                    case "_blank":
                        window.open(ahref, '_blank');
                        break;
                    default:
                        window.location = ahref;
                }
            };


            //prepare to launch
            L.t = false;//timer
            goLink.hover(
                function () {
                    if (L.t) {
                        window.clearTimeout(L.t);
                    }
                    if (L.o.launch !== false && $.isFunction(L.o.launch)) {
                        L.t = window.setTimeout(L.o.launch(obj), L.o.hoverTime);//pass L now or it will be lost!
                    } else {
                        L.t = window.setTimeout(launch, L.o.hoverTime);
                    }
                },
                function () {
                    window.clearTimeout(L.t);
                }
                );


        });//each
    };//fn.lancelot
})(jQuery);