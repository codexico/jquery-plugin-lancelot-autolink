(function($){
    $.fn.lancelot = function(options) {
		var L = {};
        L.defaults = {
            hoverTime: 2000,		//time to launch the link
            aclass: "lancelotGo",       //style, see lancelot.css
            atext: "",			//text to show
            show: "false",		//
            speed: "fast",		//animation
            linkAction: "location",     //open, _blank
            atitle: "go in 2s",		//link title
            alink: false,		//url OR function
            element: "a"                //element to hover
        }
        L.o = $.extend(L.defaults, options);

        //the plugin
        return this.each(function() {
            obj = $(this);

            //where we go?
            L.ahref = "";
            if(L.o.alink != false){
                $.isFunction(L.o.alink) ?
                L.ahref = L.o.alink.call()
                : L.ahref = L.o.alink;
            }else{
                L.ahref = obj.attr("href");
            }

            //create element
            if(L.o.element !== "a"){
                obj.append($( document.createElement(L.o.element)).addClass(L.o.aclass))
            }else{
                obj.append(' <a href="'+L.ahref+'" class="'+L.o.aclass+'" title="'+L.o.atitle+'">'+L.o.atext+'</a>');
            }
            L.goLink = obj.find("."+L.o.aclass);


            //show animation
            if(L.o.show != "true"){
                L.goLink.hide()
                obj.hover(
                    function(){
                        L.goLink.fadeIn(L.o.speed)
                    },
                    function(){
                        L.goLink.fadeOut(L.o.speed)
                    }
                    );
            }


            L.launch = function() {
                switch(L.o.linkAction){
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


            L.t = {};
            //prepare to launch
            L.goLink.hover(
                function(){
                    if(L.t) {
                        clearTimeout(L.t);
                    }
                    L.t = setTimeout(L.launch, L.o.hoverTime);
                },
                function(){
                    clearTimeout(L.t);
                }
                );//L.goLink.hover


        });//each
    };
})(jQuery);