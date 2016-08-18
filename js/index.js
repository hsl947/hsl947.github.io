$(function () {
    // 预加载动画配置
    $("#fakeloader").fakeLoader({
        timeToHide: 2000,
        bgColor: "#1abc9c",
        spinner: "spinner6",
    });
    // jQuery fullPage插件配置
    $('#fullpage').fullpage({
        'verticalCentered': true,
        'css3': true,
        menu: '#menu',
        scrollingSpeed: 1000,
        'sectionsColor': ['#5bc0de', '#5cb85c', '#337AB7', '#FF8C8C', '#22c3aa'],
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        'navigation': true,
        'navigationPosition': 'left',
        afterLoad: function (anchorLink, index) {
            if (index == 1) {
                $('.section1').find('img').delay(2000).addClass('bounceIn');
            }
            if (index == 2) {
                $('.section2').find('.workEXP-main').delay(100).animate({
                    left: '0'
                }, 1500, 'easeOutExpo');
            }
            if (index == 3) {
                $('.section3').find('.skills').delay(100).animate({
                    bottom: '0',
                    opacity: '1'
                }, 1500, 'easeOutExpo');
            }
            if (index == 4) {
                $('.section4').find('.block-evaluation').fadeIn(1500);
            }
            if (index == 5) {
                $('.section5').find('#block-will').addClass('bounceIn');
            }
        },
        onLeave: function (index, direction) {
            if (index == 1) {
                $('.section1').find('img').delay(2000).removeClass('bounceIn');
            }
            if (index == '2') {
                $('.section2').find('.workEXP-main').delay(100).animate({
                    left: '-150%'
                }, 1500, 'easeOutExpo');
            }
            if (index == '3') {
                $('.section3').find('.skills').delay(100).animate({
                    bottom: '-150%',
                    opacity: '0'
                }, 1500, 'easeOutExpo');
            }
            if (index == '4') {
                $('.section4').find('.block-evaluation').fadeOut(1500);
            }
            if (index == 5) {
                $('.section5').find('#block-will').removeClass('bounceIn');
            }
        }
    })
})
// 禁用鼠标右键
function stop() {
    return false;
}
document.oncontextmenu = stop;