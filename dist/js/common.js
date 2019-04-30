
//    -------------------------------------     open/close mobile menu
$('.mobile-toggle-nav').on('click', function () {
    $('nav').toggleClass('active');
    $('nav').hasClass('active')? $('body').css({'overflow':'hidden'}):$('body').css({'overflow':'auto'})

});

//   -------------------------------------     set active class to menu
$('nav li').on('click', function () {
    var scrollId = '#' + $(this).attr('data-scroll-Id');
    if (scrollId == '#footer'){
        if ($('nav').hasClass('active')){
            $('nav').removeClass('active');
            $('body').css({'overflow':'auto'});
        }
        $('#contact-form').css({'display': 'flex'});
        $('body').css({'overflow':'hidden'});
        return false;
    }
    $('nav').hasClass('active')? setTimeout(function(){
        $('nav').removeClass('active');
        $('body').css({'overflow':'auto'});
        setTimeout(function () {
            $('html, body').animate({scrollTop:$(scrollId).position().top}, 800);
        }, 300)
    }, 150) : $('html, body').animate({scrollTop:$(scrollId).position().top}, 800);

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
$('.work-popup-close i, .work-popup_background').on('click', function(e){
    e.stopPropagation();
    this === e.target ? hidePopup($('.work-popup_background')) : null;

});

// -----------------------------------------        scroll top
window.addEventListener('scroll', function(){
    var needBtn = (document.documentElement.scrollTop >= document.documentElement.clientHeight/1.2),
        scroll = $('.scroll-top_bnt');
        needBtn? scroll.show() : scroll.hide();
});

$('.scroll-top_bnt').on('click', function () {
    $('html, body').animate({scrollTop:$('body').position().top}, 800);

})

//----------------------------------------           close contact form
$('.contact-popup-close i, #contact-form').on('click', function(e){
    console.log('e', this, e.target, this === e.target);
    e.stopPropagation();
    this === e.target ? closeAndClear($('#contact-form')): null;
});


// ---------------------------------------- Handle submit

$('#contactForm button[type="submit"]').on('click', function (e) {
    e.preventDefault();
    $('#contact-form').addClass('no_events');
    var $form = $(this).parent('form'),
        $responsePlace = $('.response-massage');
    var name = $form.find('#contact-name').val(),
        email = $form.find('#contact-email').val(),
        massage = $form.find('#contact-massage').val();

    var options = {
        'name': name,
        'email': email,
        'massage': massage,
    };
    var succesMassage = 'Thanks, <br>' +
        'Your massage send';
    var errorMassage = 'Sorry, something went wrong<br>' +
        'Please, try again later';
    $.ajax({
        type: "POST",
        url: "someUrl.php",
        data: options,
        timeout: 500,
        success: function(responce){
            $responsePlace.html(succesMassage);
            $responsePlace.css({display: 'flex'});
            closeAndClear($('#contact-form'), {
                $responsePlace : $responsePlace,
                delay: 2000
            })
        },
        error: function (responce) {
            $responsePlace.html(errorMassage);
            $responsePlace.css({display: 'flex'});
            closeAndClear($('#contact-form'), {
                $responsePlace : $responsePlace,
                delay: 2000
            })
        },

    })
});

// ------------------------
function hidePopup($popup) {
    $popup.fadeOut(200);
    setTimeout(function () {
        $popup.addClass('hidden')
    }, 200);

    $('body').css({'overflow':'auto'});
};

// $element - required  -  jQuery element, than need to hide
// options - optional  - object of options (delay, $responsePlace)
function closeAndClear($element, options) {
    var delay = options && options.delay || 300,
        $responsePlace = options && options.$responsePlace || false;
    setTimeout(function(){
        hidePopup($element);
        $($element).removeClass('no_events');
        $responsePlace? $responsePlace.css({display: 'none'}): null;
        $('form').find('input, textarea').each(function(i, item){$(item).val('')})
    }, delay)
}