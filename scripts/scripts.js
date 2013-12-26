$("div:jqmData(role='page')").on( "pagecreate", function( event ) {
    setImageWidthHeight();
    $('.footer-div').off().on( "click", tapHandler );
});

$("div:jqmData(role='page')").on( "pageshow", function( event ) {
    if($(this).children('.my_audio').length)
    {
        $(this).children('.my_audio').get(0).play();
    }
});

$("div:jqmData(role='page')").on( "pagehide", function( event ) 
{
    if($(this).children('.my_audio').length)
    {
        $(this).children('.my_audio').get(0).pause();
        $(this).children('.my_audio').get(0).currentTime = 0 ;
    }
});



function tapHandler(event)
{
    var href = $(this).attr('href');
    $.mobile.navigate(href);
}


function setImageWidthHeight()
{
    var height = $(document).height();
    var width = $(window).width();
    $('.bg-img').height(height-50);
    $('.bg-img').width(width);
}

