// Required for drag and drop file access


// IIFE to prevent globals
(function () {

    var s;
    var UserImage = {

        settings: [],
        uploaded: [],

        init: function (settings) {
            UserImage.settings = settings;
            s = settings;
            UserImage.bindUIActions();
        },

        bindUIActions: function () {

            var timer;

            for (i = 0; i < s.length; i++) {
                s[i].each(function (index) {
                    $(this)
                        .data('width', $(this).data('base-width'))
                        .data('height', $(this).data('base-height'))
                        .data('zoom-factor', 0);
                    $(this).css({
                        'width': $(this).data('base-width'),
                            'height': $(this).data('base-height')
                    });
                    $('.image', $(this)).css({
                        'width': $(this).data('base-width'),
                            'height': $(this).data('base-height')
                    });
                });

                s[i].on("dragover", function (event) {
                    clearTimeout(timer);
                    UserImage.showDroppableArea($(event.currentTarget));

                    // Required for drop to work
                    return false;
                });

                s[i].on('dragleave', function (event) {
                    // Flicker protection
                    timer = setTimeout(function () {
                        UserImage.hideDroppableArea($(event.currentTarget));
                    }, 200);
                });

                s[i].on('drop', function (event) {
                    // Or else the browser will open the file
                    event.preventDefault();
                    $('.zoom', $(event.currentTarget)).show('fade');
                    UserImage.handleDrop($(event.currentTarget), event.dataTransfer.files);
                });
            }
           

            $('.image-uploader .image').on('click', function (event) {
                $('#uploader', $(event.currentTarget).parent()).trigger('click');
            });

            $("#uploader").on('change', function (event) {
                $('.zoom', $(event.currentTarget).parent()).show('fade');
                UserImage.handleDrop($(event.currentTarget).parent(),
                event.target.files);
            });
        },

        showDroppableArea: function (elt) {
            elt.addClass("droppable");
        },

        hideDroppableArea: function (elt) {
            elt.removeClass("droppable");
        },

        handleDrop: function (elt, files) {

            UserImage.hideDroppableArea(elt);

            // Multiple files can be dropped. Lets only deal with the "first" one.
            var file = files[0];

            if (file.type.match('image.*')) {
                UserImage.handleImage(elt, file);
            } else {
                alert("This file is not an image.");
            }

        },

        handleImage: function (elt, file) {
            UserImage.resizeImage(elt, file, elt.data('width'), elt.data('height'), function (data, width, height) {
                UserImage.placeImage(elt, data);
                var pos = $(elt).position();
                $('img', elt)
                    .css({
                    'left': elt.data('pos-x'),
                        'top': elt.data('pos-y')
                })
                   
                UserImage.uploaded[elt] = file;
            });
        },

        resizeImage: function (elt, file, width, height, callback) {
            var fileTracker = new FileReader;
            fileTracker.onload = function () {
                Resample(
                elt,
                this.result,
                width,
                height,
                callback);
            }
            fileTracker.readAsDataURL(file);

            fileTracker.onabort = function () {
                alert("The upload was aborted.");
            }
            fileTracker.onerror = function () {
                alert("An error occured while reading the file.");
            }

        },

        placeImage: function (elt, data) {
            elt.addClass('filled');
            $('img', elt).attr("src", data);
        },

        reset: function (elt) {
            $('img', elt)
                .attr('src', 'http://s.cdpn.io/24822/empty.png')
                .css({
                position: '',
                top: '',
                left: ''
            })
                .draggable('destroy');
            $(elt)
                .data('width', $(elt).data('base-width'))
                .data('height', $(elt).data('base-height'))
                .data('zoom-factor', 0)
                .removeClass('filled');
            UserImage.uploaded[elt] = null;
            $('.zoom', elt).hide();
        },

        
    }

    UserImage.init([$(".image-uploader")]);

})();


/*
 * Image resizing
 */
var Resample = (function (canvas) {

    // (C) WebReflection Mit Style License

    function Resample(elt, img, width, height, onresample) {
        var

        load = typeof img == "string",
            i = load || img;

        // if string, a new Image is needed
        if (load) {
            i = new Image;
            i.onload = onload;
            i.onerror = onerror;
        }

        i._onresample = onresample;
        i._width = width;
        i._height = height;
        i._elt = elt;
        load ? (i.src = img) : onload.call(img);
    }

    function onerror() {
        throw ("not found: " + this.src);
    }

    function onload() {
        var
        img = this,
            width = img._width,
            height = img._height,
            onresample = img._onresample;

        img._elt.data('original-width', img.width);
        img._elt.data('original-height', img.height);
        // if width and height are both specified
        // the resample uses these pixels
        // if width is specified but not the height
        // the resample respects proportions
        // accordingly with orginal size
        // same is if there is a height, but no width
        var minValue = Math.min(img.height, img.width);
        var imgRatio = img.width / img.height;
        var targetRatio = height / width;
        var targetWidth = imgRatio <= 1 ? width : round(img.width * height / img.height);
        var targetHeight = imgRatio > 1 ? height : round(img.height * width / img.width);
        //width == null && (width = round(img.width * height / img.height));
        //height == null && (height = round(img.height * width / img.width));

        img._elt.data('width', targetWidth);
        img._elt.data('height', targetHeight);

        delete img._onresample;
        delete img._width;
        delete img._height;

        // when we reassign a canvas size
        // this clears automatically
        // the size should be exactly the same
        // of the final image
        // so that toDataURL ctx method
        // will return the whole canvas as png
        // without empty spaces or lines
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // drawImage has different overloads
        // in this case we need the following one ...
        context.drawImage(
        // original image
        img,
        // starting x point
        0,
        // starting y point
        0,
        // image width
        img.width,
        // image height
        img.height,
        // destination x point
        0,
        // destination y point
        0,
        // destination width
        targetWidth,
        // destination height
        targetHeight);
        // retrieve the canvas content as
        // base4 encoded PNG image
        // and pass the result to the callback
        onresample(canvas.toDataURL("image/png"), targetWidth, targetHeight);
    }

    var context = canvas.getContext("2d"),
        // local scope shortcut
        round = Math.round;

    return Resample;

}(
this.document.createElement("canvas")));