bem.decl('hoegaarden', {
    MMC: '',
    onInit: function($this) {
        MMC = $this;

        var image = this.getImage($this.attr('data-src'));

        this.getColors(image);

        // Для тестирования. По клику на stripe меняется иконка и случается рэндеринг
        MMC.on('click', function() {
            this.clickTest();
        }.bind(this));
    },

    getImage: function(src) {
        var img = new Image();

        img.src = src;

        return img;
    },

    getContext: function() {
        return document.createElement('canvas').getContext('2d');
    },

    getImageData: function(img) {
        var context = this.getContext(),
            imageData;

        context.drawImage(img, 0, 0);
        imageData = context.getImageData(0, 0, img.width, img.height);

        return imageData.data;
    },

    getRGB: function(name) {
        return ['rgb(', name, ')'].join('');
    },

    setColor: function (color) {
        MMC.css('backgroundColor', color);
    },

    getColors: function (img) {
        var length = img.width * img.height,
            colorCounts = {},
            color = {},
            counter = 0,
            rgbColor = String,
            data = this.getImageData(img);

            length = length > 1024 ? 1024 : length;

            for (var i = 0; i < length; i += 20) {
                rgbColor = [data[i], data[i + 1], data[i + 2]].join(',');

                if (rgbColor in colorCounts) {
                    colorCounts[rgbColor] += 1;
                } else {
                    colorCounts[rgbColor] = 1;
                }
                // Хз что за херня с чёрным цветом
                if ((colorCounts[rgbColor] > counter) && !~rgbColor.indexOf('0,0,0')) {
                    counter = colorCounts[rgbColor];
                    color = {
                        name: rgbColor,
                        count: colorCounts[rgbColor]
                    };
                }
            }

            this.setColor(this.getRGB(color.name));
    },
    // Чисто для тестирования
    clickTest: function () {
        var images = [
            'pics/fb.png',
            'pics/vk.png',
            'pics/ok.png',
            'pics/y.png',
            'pics/apple.png',
            'pics/ali.png',
            'pics/avito.png',
            'pics/h.png',
            'pics/twitter.png',
            'pics/market.png'
        ],
        icon = Math.round(Math.random() * images.length - 1),
        _this = this;

        MMC.attr('data-src', images[icon]);
        $('.stripe__icon').attr('src', images[icon]);
        // afterCurrentEvent =]
        setTimeout(function () {
            _this.getColors(_this.getImage(MMC.attr('data-src')));
        }, 10);
    }
});
