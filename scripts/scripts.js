$("div:jqmData(role='page')").on( "pagecreate", function( event ) 
{

    setImageWidthHeight();
    $('.option').off().on("click",checkAnswer);
    $('.back-button').off().on("click",navigateBack);
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

function navigateBack(event)
{
    $.mobile.back();
}



$("div:jqmData(role='page')").on( "pageshow", function( event )
{
    
    if($(this).find("img").length>0)
    {
        
        id=$(this).attr('id');
        $( "#"+id ).off().on( "swipeleft", swipeHandler );
          $( "#"+id ).off().on( "swiperight", swipeHandler );
        
        $("#"+id).on( "swipeleft", swipeHandler );
         $("#"+id).on( "swiperight", swipeHandler );
        
        
    }
    
    });

function playNextTrack(page)
{
    
     if(sessionStorage.narration == "1")
    {
        if(page.children('.my_audio').length)
        {
            page.children('.my_audio').get(0).pause();
            page.children('.my_audio').get(0).currentTime = 0 ;
        }
    }
    
}

function playBackTrack(page)
{
    
    if(sessionStorage.narration == "1")
    {
        if(page.children('.my_audio').length)
        {
            page.children('.my_audio').get(0).play();
        }
    }
    
}


function swipeHandler( event ){
    
    var page = "#" + $(this).attr("id");
   if (event.type == 'swipeleft') {
        playNextTrack($(this));
                 var nextpage = $(this).next('div[data-role="page"]');
       $(page).find('.footer').find('.ui-block-c').find('a').off().trigger('click');
        playBackTrack(nextpage);
       
    }
    
    if (event.type == 'swiperight') {
        playNextTrack($(this));
       var prevpage = $(this).prev('div[data-role="page"]');
  $(page).find('.footer').find('.ui-block-b').find('a').off().trigger('click'); 
      playBackTrack(prevpage);
    }
   
 
}