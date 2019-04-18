
//    -------------------------------------     open/close mobile menu
$('.mobile-toggle-nav').on('click', function () {
    $('nav').toggleClass('active');
    $('nav').hasClass('active')? $('body').css({'overflow':'hidden'}):$('body').css({'overflow':'auto'})

});

//   -------------------------------------     set active class to menu
$('nav li').on('click', function () {
    var scrollId = '#' + $(this).attr('data-scroll-Id');
    $('li.active').removeClass('active');
    $(this).addClass('active');
    $('nav').hasClass('active')? setTimeout(function(){
        $('nav').removeClass('active');
        $('body').css({'overflow':'auto'});
        setTimeout(function () {
            $('html, body').animate({scrollTop:$(scrollId).position().top}, 800);
        }, 300)
    }, 150) : null;

});

//    -------------------------------------     open popup window with info about selected work
$('.works-item-wrapper').on('click',function () {
    $('.work-popup_background').fadeIn(200).css({'display':'flex'})
    $('body').css({'overflow':'hidden'});
    var imgUrl = $(this).find('img').attr('src'),
        title = $(this).find('.work-item-content h2').html()? $(this).find('.work-item-content h2').html() : 'One of our works',
        description = $(this).find('.work-item-description').html() ? $(this).find('.work-item-description').html() : null,
        tasks = $(this).find('.work-item_tasks').html() ? $(this).find('.work-item_tasks').html() : null,
        stack = $(this).find('.work-item_stack').html() ? $(this).find('.work-item_stack').html() : null,
        popup = $('.work-popup');

    $('.work-popup_background').removeClass('hidden');


    popup.find('img').attr('src', imgUrl);
    popup.find('.work-popup_title h2').html(title);
    popup.find('.work-popup_description').html(description);
    popup.find('.work-popup_tasks .content').html(tasks);
    popup.find('.work-popup_stack .content').html(stack);
});

//    -------------------------------------     close popup
$('.work-popup-close, .work-popup_background').on('click', function(e){
    e.stopPropagation();
    this === e.target ? hidePopup() : null;
    function hidePopup() {
        $('.work-popup_background').fadeOut(200);
        setTimeout(function () {
            $('.work-popup_background').addClass('hidden')
        }, 200);

        $('body').css({'overflow':'auto'});
    }
});

// -----------------------------------------        scroll top
window.addEventListener('scroll', function(){
    var needBtn = (document.documentElement.scrollTop >= document.documentElement.clientHeight/1.2),
        scroll = $('.scroll-top_bnt');
        needBtn? scroll.show() : scroll.hide();
});

$('.scroll-top_bnt').on('click', function () {
    $('html, body').animate({scrollTop:$('nav').position().top}, 800);

})


