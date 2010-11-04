/**
 * jQuery Lancelot Plugin
 * Allows navigation with mouse hover.
 *
 * Feel in use: http://ttlocal.info
 *
 * Author: codexico http://codexico.com.br
 *
 * Source: http://github.com/codexico/jquery-plugin-lancelot-autolink
 * Demo: http://codexico.com.br/projetos/lancelot/demo/
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
 * Version 1.0
 * 2010-11-04
 */

(function ($) {
    $.fn.lancelot = function (options) {

        var L = {};


        L.defaults = {
            duration: 2000,		//time to launch the link in miliseconds
            linkAction: "location",	//"location" only redirects, "open" or "_blank" will try to open a new window, "tryPop" will try to popup and then redirect.
            //windowOpen: false,          //TODO: parameters
            launch: false               //function to call when duration is over
        };
        L.o = $.extend(L.defaults, options);

        //the plugin
        return this.each(function () {
            //reference to each $('.lancelot')
            var $lancelotThis = $(this),

            //function to handle strange browsers things, unicorns and gods
            stop,

            //function that redirects the browser to another link
            redirectTo,

            //function that try to open a new popup, and if cant, redirect the page
            tryPop,

            //reference to window opened
            c,

            //function to execute the Lancelot
            launch,

            //This is the string that just names the new window.
            windowOpenName;


            //strange behaviors in some browsers
            stop = function (X) {
                if (X && X.stopPropagation) {
                    X.stopPropagation();
                } else if(window.event) {
                    window.event.cancelBubble = true;
                }
            };


            redirectTo = function (d) {
                window.location.href = $lancelotThis.attr("href");
                stop(d);
            };


            windowOpenName = function () {
                return ($lancelotThis.attr("title") ? $lancelotThis.attr("title") : $lancelotThis.attr("href")).replace(/\s+/, "-");;
            }


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
                c = window.open($lancelotThis.attr("href"), windowOpenName());
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
                        window.open($lancelotThis.attr("href"), windowOpenName());
                        break;
                    case "_blank":
                        window.open($lancelotThis.attr("href"), '_blank');
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
            $lancelotThis.hover(
                function () {
                    //console.log($lancelotThis.attr("href"))
                    if (L.t) {
                        window.clearTimeout(L.t);
                    }
                    if (L.o.launch !== false && $.isFunction(L.o.launch)) {
                        L.t = window.setTimeout(L.o.launch($lancelotThis), L.o.duration);//pass $lancelotThis now or it will be lost!
                    } else {
                        L.t = window.setTimeout(launch, L.o.duration);
                    }

                },
                function () {
                    window.clearTimeout(L.t);
                }
                );


        });//each
    };//fn.lancelot
})(jQuery);