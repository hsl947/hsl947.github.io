'use strict';
var init = function init() {
    //瀑布流图片代码
    var img_src = [{
        src: "assets/images/bear-avatar.png"
    }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }, {
            src: "assets/images/bear-avatar.png"
        }];
    var i = 0,
        sum;
    //瀑布流加载图片
    function load() {
        if (i < 24) {
            for (; i < 24; i++) {
                create();
            }
        } else {
            sum = i;
            for (; i < sum + 3; i++) {
                create();
            }
        }
    }
    //生成一张图片
    function create() {
        //生成一个div盒子对象 
        var oA = document.createElement("a");
        oA.className = "grid-item image-popup fh5co-board-img";
        oA.setAttribute('href', img_src[i % img_src.length].src);
        //生成一个图片对象
        var oImg = new Image();
        oImg.src = img_src[i % img_src.length].src;
        //把图片放入div盒子
        var oScript = "<script>magnifPopup()</script>";
        oA.appendChild(oImg);
        //把div放入大盒子
        $(".grid").append(oA);
        $(".grid").append(oScript);
        (function (oImg) {
            setTimeout(function () {
                oImg.style.cssText = "opacity:1;transform:scale(1);";
            }, 500);
        })(oImg); //立马调用
    }

    //滚动滚动条的时候调用的事件
    var scrollH = ''; //文档高度
    var scrollT = ''; //滚动条高度
    var _height = $(window).height();
    $(window).scroll(function () {
        scrollH = document.body.scrollHeight;
        scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (_height + scrollT + 50 > scrollH) {
            load();
            minigrid('.grid', '.grid-item');
        }
    });

    load();
    setTimeout(function () {
        minigrid('.grid', '.grid-item', 6, null,
            function () {
                var d = document.querySelector('.demo');
                d.style.opacity = 1;
            }
        );
    }, 500);

    window.addEventListener('resize', function () {
        minigrid('.grid', '.grid-item');
    });
}


// iPad and iPod detection	
var isiPad = function () {
    return (navigator.platform.indexOf("iPad") != -1);
};

var isiPhone = function () {
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)
    );
};

// OffCanvass
var offCanvass = function () {
    $('body').on('click', '.js-fh5co-menu-btn, .js-fh5co-offcanvass-close', function () {
        $('#fh5co-offcanvass').toggleClass('fh5co-awake');
    });
};

// Click outside of offcanvass
var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
        var container = $("#fh5co-offcanvass, .js-fh5co-menu-btn");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('#fh5co-offcanvass').hasClass('fh5co-awake')) {
                $('#fh5co-offcanvass').removeClass('fh5co-awake');
            }
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            if ($('#fh5co-offcanvass').hasClass('fh5co-awake')) {
                $('#fh5co-offcanvass').removeClass('fh5co-awake');
            }
        }
    });
};

// Magnific Popup

var magnifPopup = function () {
    $('.image-popup').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-with-zoom',
        titleSrc: 'title',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function (openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });
};
$(function () {
    isiPhone();
    isiPad();
    init();
    magnifPopup();
    offCanvass();
    mobileMenuOutsideClick();
});