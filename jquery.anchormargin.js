;(function($){
	var AnchorMargin = function($el, sett){
		var defaults = {
			// Separate element with commas
			element: '',
			padding: 25
		};
		
		var settings = $.extend({}, defaults, sett);
		
		this.init = function(){
			if(!settings.element){
				throw "element must be defined";
			}
			
			$el.on('click', function(ev){
				var $this = $(this);
				var href = $this.attr("href");
				
				// Don't go any further!
				if(!href.indexOf('#') == 0){
					return;
				}
				
				ev.preventDefault();
				
				var elementsHeight = 0;
				
				 $(settings.element).each(function(){
					 elementsHeight += $(this).outerHeight();
				 });
				
				// get the offset of the element
				var position = $(href).offset().top - elementsHeight;

				$('html, body').scrollTop(position - settings.padding);
			});
		}
	}

	$.fn.anchormargin = function(settings){
		return this.each(function(){
			var element = $(this);
      
			// Return early if this element already has a plugin instance
			if (element.data('anchormargin')) return;

			var myplugin = new AnchorMargin($(this), settings);

			// Store plugin object in this element's data
			element.data('anchormargin', myplugin);
			
			myplugin.init();
		});
	};	
}(jQuery));
