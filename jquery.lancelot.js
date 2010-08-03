(function($){
 $.fn.lancelot = function() {

    return this.each(function() {

		var ahref = $(this).attr("href");
		//var ahref = this

		var t = '';

		var lanc = function() {
			//alert('mouseover location')
			window.location = ahref;
			//alert('mouseover open _blank')
			//window.open(this, '_blank');
			//alert('mouseover open')
			//window.open(this);
		}

		$(this).hover(
			function(){
				if(t) {
					clearTimeout(t);
				}
				//alert('hover')
				t = setTimeout(lanc, 4000);
			},
			function(){
				if(t) {
					clearTimeout(t);
				}
				//alert('calback')
			});
		});
 };
})(jQuery);
