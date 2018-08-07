
module.exports = {
	//Function to disable text selection on the page.
	disableTextWrapper: function(){
		jQuery.fn.disableTextSelect = function() {
			return this.each(function() {
				$(this).css({
					'MozUserSelect':'none',
					'webkitUserSelect':'none'
				}).attr('unselectable','on').bind('selectstart', function() {
					return false;
				});
			});
		};
	},
	//Function to re-enable text selection on the page.
	enableTextWrapper: function(){
		jQuery.fn.enableTextSelect = function() {
			return this.each(function() {
				$(this).css({
					'MozUserSelect':'',
					'webkitUserSelect':''
				}).attr('unselectable','off').unbind('selectstart');
			});
		};
	}
}




