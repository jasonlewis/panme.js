# panme.js

panme.js is a simple jQuery image pan plugin that allows you to click and drag a large image around inside a smaller container.

# Usage

To get started with panme.js all you need is an image to apply the plugin to.

    $('#your-image').panme();


There are some configurable options as well:

    $('#your-image').panme({
        width	: 800,	// Width of the panme.js container
        height	: 600, 	// Height of the panme.js container
        startX	: 120, 	// The starting X point (from the left)
        startY	: 400 	// The starting Y point (from the top)
    })

As you can see the start X and Y points form the top-left position of the image.