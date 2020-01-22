
// Toggling the sidebar 

$(".hamburger").on("click", function(e){
  $("#sidebar").toggleClass("opened");
  $(".sidebar").toggleClass("sidebar-expanded");
  $(".menu").toggleClass("menu-expanded");
  $(".web").toggleClass("web-expanded");
  $("body").toggleClass("mouse-expanded");
  e.stopPropagation();
})


$(document.body).on("click", function(evt){
  if ($("#sidebar").hasClass('opened')) {  // ← verifies target is desired element
    $("#sidebar").removeClass('opened');  
    $(".sidebar").toggleClass("sidebar-expanded");
    $(".menu").toggleClass("menu-expanded");
    $(".web").toggleClass("web-expanded");
    $("body").toggleClass("mouse-expanded");
}
})


//for typed
Typed.new('.typed', {
  strings: [" Web Designer", " Web Developer"],
  typeSpeed: 20,
  fadeOut: true,   // to fade 
  fadeOutClass: 'typed-fade-out',
  fadeOutSpeed: 100,
  startDelay: 500
});


// for smooth scroll 

var scroll = new SmoothScroll('a[href*="#"]', {

offset: 400 // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels

});



// for navbar transparent 

if ($(".sidebar").width() > 80){
  $(".sidebar").addClass("navbar");
} 


$(document).scroll(function () {
  $(".navbar").toggleClass("scrolled", $(this).scrollTop() > $(".navbar").height());
});


/*--------------------------------------------------
    AUDIO JS
---------------------------------------------------*/  

  if ( $(window).width() >= 1024 ){
    $('body').append('<audio loop autoplay volume="0.1" id="audio-player"><source src="assets/css/sunInYourEyes.mp3" type="audio/mpeg"></audio>')
    audiojs();       
  }
  
  var audio = document.getElementById("audio-player");
  audio.volume = 1;
  $("#theFrame").remove();
  function audiojs () { 
    if($(window).width() >= 1024){
      
      $('.music-wave').css({'visibility':'visible'});
      $('body').addClass("audio-on");
      if ($('body').hasClass('audio-off')) {
        $('body').removeClass('audio-on');
      } 
      $(".music-wave").on('click', function() {
          $('body').toggleClass("audio-on audio-off");         
          if ($('body').hasClass('audio-off')) {
            audio.pause();
          } 
          if ($('body').hasClass('audio-on')) {
            audio.play();
          }
      });
    }
  }


// for contact tools

$(document).ready(function() { $('body').contactTools({
  'form_id': '#contact_form_1'
}); });


// setTimeout(function(){

//   $.getScript('../contact-tools.jquery.js')
// },500); 



/* <iframe volume="0" loop id="audio-player" src="assets/css/sunInYourEyes.mp3" allow="autoplay" style="display:none" id="iframeAudio"></iframe> */