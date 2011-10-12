/**
 * PanMe
 *
 * PanMe is a simple image pan plugin rewritten from an original plugin by Esa-Matti Suuronen.
 *
 * @name       PanMe (originally panFullSize)
 * @author     Esa-Matti Suuronen
 * @author     Jason Lewis
 * @contact    esa-matti [a] suuronen [dot] org
 * @contact    jason [a] jasonlewis [dot] me
 * @license    GPL
 *
 * PanMe is a rewrite of panFullSize by Esa-Matti Suuronen. PanMe makes a few changes (such as providing a default starting position for an image)
 * and cleaning up some of the code.
 *
 * Thanks to Esa-Matti Suuronen for the hard work that was put into panFullSize.
 */
(function($){

	$.fn.panme = function(opts){
		var options = $.extend({}, $.fn.panme.defaults, opts);

		this.each(function(){

			// Setup some variables
			var	image		= $(this),
				dimensions = {
					real: {
						width	: 0,
						height	: 0
					},
					original: {
						width	: 0,
						height	: 0
					}
				},
				position 	= {
					start: {
						x : 0,
						y : 0
					},
					prev: {
						x : 0,
						y : 0
					},
					now: {
						x : 0,
						y : 0
					}
				},
				focus 	= false,
				panme;

			// Wait for image to load first. Then we can begin.
			image.after('<div class="panme"></div>');
			image.get(0).complete ? runPanMe() : image.load(runPanMe);

			function runPanMe(){
				panme = image.next('.panme');

				image.hide();

				panme.css({
					width		: options.width,
					height		: options.height,
					display		: 'inline-block',
					background	: 'url(' + image.attr('src') + ') no-repeat ' + (options.startX ? options.startX * -1 : 0) + 'px ' + (options.startY ? options.startY * -1 : 0) + 'px'
				});

				dimensions.original.width = image.width();
				dimensions.original.height = image.height();

				// Remove the attributes if they were set.
            	image.removeAttr('width').removeAttr('height');

				// Get the real dimensions.
				dimensions.real.width = image.width();
				dimensions.real.height = image.height();

				// Set the old dimensions.
				image.width(dimensions.original.width).height(dimensions.original.height);

				// Bind the mouse events to the panme div.
				panme.bind({
					mousedown: function(e){
						e.preventDefault();

						focus = true;

						position.start.x = options.startX > 0 ? options.startX + e.clientX : e.clientX;
						position.start.y = options.startY > 0 ? options.startY + e.clientY : e.clientY;

						// Clear the optional start X and Y
						options.startX = 0;
						options.startY = 0;
					},
					mousemove: doPanMovement,
					mouseup: function(e){
						doPanMovement(e);

						focus = false;

						position.prev.x = position.now.x;
						position.prev.y = position.now.y;

						if(typeof options.release === 'function') options.release(getPosition());
					}
				});

				if(typeof options.start === 'function') options.start(getPosition());

			}

			/**
			 * doPanMovement
			 *
			 * Main function that calculates pan movement
			 */
			function doPanMovement(e){
				var diff = {
					x : e.clientX - position.start.x,
					y : e.clientY - position.start.y
				};

				if(focus){

					var inside = {
						x : true,
						y : true
					};

					// Determine new X value
					if(position.prev.x + diff.x >= 0){
						inside.x = false;
					}

					if((position.prev.x + diff.x) * -1 > dimensions.real.width - options.width){
						inside.x = false;
					}

					if(inside.x){
						position.now.x = position.prev.x + diff.x;
					}

					// Determine new Y value
					if(position.prev.y + diff.y >= 0){
						inside.y = false;
					}

					if((position.prev.y + diff.y) * -1 > dimensions.real.height - options.height){
						inside.y = false;
					}

					if(inside.y){
						position.now.y = position.prev.y + diff.y;
					}

					// Update the background position.

					panme.css({
						backgroundPosition: position.now.x.toString() + 'px ' + position.now.y.toString() + 'px'
					});
				}

			}

			/**
			 * getPosition
			 *
			 * Returns an object of positions, { x1, y1, x2, y2 }
			 * Note that this position is not the offset on the background but the actual position of the top-left to bottom-right
			 * points. Useful for running through a cropping script.
			 */
			function getPosition(){
				var	position 	= panme.css('background-position').split(' '),
					offsets		= {
						x1 : parseFloat(position[0].replace('px', '')) * -1,
						y1 : parseFloat(position[1].replace('px', '')) * -1,
						x2 : parseFloat(position[0].replace('px', '')) * -1 + panme.width(),
						y2 : parseFloat(position[1].replace('px', '')) * -1 + panme.height()
					};

				return offsets;
			}

		});

		// Return the panme div.
		return $(this).next('.panme');

	};

	$.fn.panme.defaults = {
		width	: 500,
		height	: 500,
		startX	: 0,
		startY	: 0,
		start	: function(position){},
		release	: function(position){}
	};

})(jQuery);