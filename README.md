# panme.js

panme.js is a simple jQuery image pan plugin that allows you to click and drag a large image around inside a smaller container.

# Usage

To get started with panme.js all you need is an image to apply the plugin to.

    $('#your-image').panme();


There are some configurable options as well:

    $('#your-image').panme({
        width	: 800,
        height	: 600,
        startX	: 120,
        startY	: 400,
        start	: function(position){},
        release	: function(position){}
    })

As you can see the start X and Y points form the top-left position of the image.
The width and height are the dimensions of the container where the image will be placed in to simulate the panning.

The `start` and `release` callbacks accept a single parameter which will be an object of the images position.

    {
        x1 : 0,
        y1 : 0,
        x2 : 800,
        y2 : 600
    }
