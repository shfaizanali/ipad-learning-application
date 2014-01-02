$("div:jqmData(role='page')").on( "pagecreate", function( event ) 
{
    setImageWidthHeight();
    
    $('.option').off().on("click",checkAnswer);
    $('.narration-select').on('change',turnSoundOnOff);
    if($('.narration-select').length > 0)
    {
        sessionStorage.narration = parseInt($('.narration-select').val());
    }
});

$("div:jqmData(role='page')").on( "pageshow", function( event )
{
    var x = $(this).find('.quest-mandatory');
    if(x.length > 0)
    {
       $(x).off('click').on('click', function(e) {
            alert('Please choose the correct answer from below to Navigate to next page');
            e.preventDefault();
            return false;
        });
    }
    
    if(sessionStorage.narration == "1")
    {
        if($(this).children('.my_audio').length)
        {
            $(this).children('.my_audio').get(0).play();
        }
    }
});

$("div:jqmData(role='page')").on( "pagehide", function( event ) 
{
    if(sessionStorage.narration == "1")
    {
        if($(this).children('.my_audio').length)
        {
            $(this).children('.my_audio').get(0).pause();
            $(this).children('.my_audio').get(0).currentTime = 0 ;
        }
    }
});


function turnSoundOnOff(event)
{
    sessionStorage.narration = parseInt($(this).val());
}

function checkAnswer(event)
{
    var selectedOption = $(this).attr('data-option');
    if($(this).hasClass('correct'))
    {
        $('.quest-mandatory').off().on('click', function(e) {
            return true;
        });
        alert("You selected " +selectedOption+ " Correct Answer!! Please tap on '>' to go to next page");
    }
    else
    {
        alert("You selected " +selectedOption+ "!!. Wrong answer Please try again");
    }
}


function setImageWidthHeight()
{
    $('.img-container').height($(window).height());
    $('.img-container').width($(window).width());
    var height = $('.img-container').height();
    var width = $('.img-container').width();
    $('.bg-img').height(height);
    $('.bg-img').width(width);
    $('.footer').css('margin-top',height-$('.footer').height());
}

