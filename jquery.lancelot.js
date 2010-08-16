/**
 * jQuery Lancelot Plugin
 * Allows navigation with mouse hover.
 *
 * Feel in use: http://ttlocal.info
 *
 * Author: codexico http://codexico.com.br
 *
 * Source and Demo: http://github.com/codexico/jquery-plugin-lancelot-autolink
 * Project Backlog: http://www.pivotaltracker.com/projects/104617
 * blog (português): http://codexico.com.br/blog/jquery-lancelot-plugin
 *
 *
 * License (choose one or more):
 * Creative Commons GNU General Public License License: http://creativecommons.org/licenses/GPL/2.0/
 * MIT: http://www.opensource.org/licenses/mit-license.php
 * GPL: http://www.gnu.org/licenses/gpl.html
 * "Copyleft; All Wrongs Reserved": http://www.gnu.org/copyleft/copyleft.html
 *
 *
 * Version 0.7.3
 * 2010-08-16
 */

(function ($) {
    $.fn.lancelot = function (options) {

        //define a closure
        var L = {};


        L.defaults = {
            hoverTime: 2000,		//time to launch the link in miliseconds
            aclass: "lancelotGo",	//style, @see lancelot.css
            atext: "",			//text to show
            show: "false",		//if true dont hide the lancelots
            speed: "fast",		//animation. TODO: other options
            linkAction: "location",	//"location" only redirects, "open" or "_blank" will try to open a new window, "tryPop" will try to popup and then redirect.
            //windowOpen: false,          //TODO: parameters
            atitle: "go in 2s",		//link title
            alink: false,		//if 'string' will use as the url, if 'function' will call to build the url
            element: "a",		//element to hover, ex: "span", "div"
            launch: false               //function to call when hoverTime is over
        };
        L.o = $.extend(L.defaults, options);

        //the plugin
        return this.each(function () {
            //obj is a reference to each $('.lancelot')
            var obj = $(this),

            //the place where the Lancelot will take us
            ahref,

            //reference to the element created to be the Lancelot
            goLink,

            //function that try to open a new popup, and if cant, redirect the page
            tryPop,

            //reference to window opened
            c,

            //function to handle strange browsers things, unicorns and gods
            stop,

            //function to execute the Lancelot
            launch,

            //function that redirects the browser to another link
            redirectTo;


            //where we go?
            ahref = obj.attr("href");
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
            goLink = obj.find("." + L.o.aclass);
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

            redirectTo = function (d) {
                window.location.href = ahref;
                stop(d);
            };


            //works in some browsers... try before use in production
            tryPop = function (d) {
                /*
                //TODO:  accept parameters
                var Y = 550, g = 450,
                b = screen.height,
                a = screen.width,
                Z = Math.round((a / 2) - (Y / 2)),
                f = 0;
                if (b > g) {
                    f = Math.round((b / 2) - (g / 2));
                }
                var c=window.open(X,"ttlocal search","left="+Z+",top="+f+",width="+Y+",height="+g+",personalbar=no,toolbar=no,scrollbars=yes,location=yes,resizable=yes");
                */
                c = window.open(ahref, "ttlocal search");
                if (c) {
                    c.focus();
                } else {
                    redirectTo();
                }
                stop(d);
            };



            launch = function () {
                switch (L.o.linkAction) {
                    case "open":
                        window.open(ahref, "ttlocal search");
                        break;
                    case "_blank":
                        window.open(ahref, '_blank');
                        break;
                    case "tryPop":
                        tryPop();//TODO: accept parameters
                        break;
                    default:
                        redirectTo();
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


            //strange behaviors in browsers
            stop = function (X) {
                if (X && X.stopPropagation) {
                    X.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
            };


        });//each
    };//fn.lancelot
})(jQuery);