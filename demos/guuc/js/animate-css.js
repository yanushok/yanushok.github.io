(function($) {
	$.fn.animated = function(inEffect, outEffect) {
		var $this = $(this);

		$(this).css("opacity", "0").addClass("animated").waypoint(function(dir) {
			if (dir === "down") {
				$this.removeClass(outEffect).addClass(inEffect).css("opacity", "1");
			} else {
				$this.removeClass(inEffect).addClass(outEffect).css("opacity", "1");
			};
		}, {
			offset: $(window).height()
		})
		$(this).waypoint(function(dir) {
			if (dir === "down") {
				$this.removeClass(inEffect).addClass(outEffect).css("opacity", "1");
			} else {
				$this.removeClass(outEffect).addClass(inEffect).css("opacity", "1");
			};
		}, {
			offset: -$(window).height()
		});
	};
})(jQuery);