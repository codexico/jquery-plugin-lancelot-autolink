(function($){
 $.fn.lancelot = function() {

    return this.each(function() {
		//alert(this.text)
	$(this).mouseover(function(){
		alert('mouseover location')
		window.location = this;
		//alert('mouseover open _blank')
		 //window.open(this, '_blank');
		//alert('mouseover open')
		 //window.open(this);

	})
    });
 };
})(jQuery);
