﻿$(function () {

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    var scrollMagicController = new ScrollMagic.Controller();




    /**
     * story
     */
    new ScrollMagic.Scene({
        triggerElement: '#story-container',
        triggerHook: "onEnter",
        duration: '200%',
    }).setTween('#story-background', {
        css: { y: '60%' },
        ease: Linear.easeNone
    }).addTo(scrollMagicController);



    /**
     * photo gallery
     */
    var thumbnailPath = 'assets/img/thumbnail/';
    var galleryPath = 'assets/img/gallery/';

    var photos = [
        'W_J002190-0001.jpg', 'W_J002190-0034.jpg', 'W_J002190-0041.jpg', 'W_J002190-0049.jpg', 'W_J002190-0088.jpg',
        'W_J002190-0091.jpg', 'W_J002190-0092.jpg', 'W_J002190-0094.jpg', 'W_J002190-0096.jpg', 'W_J002190-0105.jpg',
        'W_J002190-0132.jpg', 'W_J002190-0143.jpg', 'W_J002190-0149.jpg', 'W_J002190-0158.jpg', 'W_J002190-0170.jpg',
        'W_J002190-0173.jpg', 'W_J002190-0179.jpg', 'W_J002190-0183.jpg', 'W_J002190-0188.jpg', 'W_J002190-0203.jpg',
        'W_J002190-0215.jpg', 'W_J002190-0222.jpg'
    ]


    var thumbnailPaths = photos.reduce(function (array, photo) {
        var $img = $('<div>').css('background-image', 'url(' + thumbnailPath + photo + ')');
        array.push($img);
        return array;
    }, []);

    $('#gallery-container .photos').width(102 * thumbnailPaths.length);
    $('#gallery-container .photos').html(thumbnailPaths);

    var $photo = $('#gallery-container .photo');
    var currentImgIndex = 0;

    var setImg = function () {
        var img = new Image();
        img.src = galleryPath + photos[currentImgIndex];
        img.onload = function () {
            $photo.css('background-image', 'url(' + img.src + ')');
            TweenMax.to($photo, 2, { opacity: 1 });
        };
    };
    setImg();

    var resetImg = function () {
        TweenMax.to($photo, 1, {
            opacity: 0,
            onComplete: setImg
        });
        currentImgIndex++;
    };
    setInterval(resetImg, 8000);


    new ScrollMagic.Scene({
        triggerElement: '#gallery-container',
        triggerHook: "onEnter",
        duration: '200%',
    }).setTween('#gallery-background', {
        css: { y: '60%' },
        ease: Linear.easeNone
    }).addTo(scrollMagicController);

    //var isMobile = (function (a) { return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);

    //// we'd only like to use iScroll for mobile...
    //if (false) {
    //    // configure iScroll
    //var myScroll = new IScroll('#wrapper',
    //            {
    //                // don't scroll horizontal
    //                scrollX: false,
    //                // but do scroll vertical
    //                scrollY: true,
    //                // show scrollbars
    //                scrollbars: true,
    //                // deactivating -webkit-transform because pin wouldn't work because of a webkit bug: https://code.google.com/p/chromium/issues/detail?id=20574
    //                // if you dont use pinning, keep "useTransform" set to true, as it is far better in terms of performance.
    //                useTransform: false,
    //                // deativate css-transition to force requestAnimationFrame (implicit with probeType 3)
    //                useTransition: false,
    //                // set to highest probing level to get scroll events even during momentum and bounce
    //                // requires inclusion of iscroll-probe.js
    //                probeType: 3,
    //                // pass through clicks inside scroll container
    //                click: true
    //            }
    //        );

    // overwrite scroll position calculation to use child's offset instead of container's scrollTop();
    //scrollMagicController.scrollPos(function () {
    //    return -myScroll.y;
    //});

    // thanks to iScroll 5 we now have a real onScroll event (with some performance drawbacks)
    //myScroll.on("scroll", function () {
    //    scrollMagicController.update();
    //});
    //}
});