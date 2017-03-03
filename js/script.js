jQuery(document).ready(function($) {
 

var isPhoneDevice = "ontouchstart" in document.documentElement; 

        if(isPhoneDevice){
           alert("This site is best viewed in desktop. Please use a desktop to visit the site");
        }
           


else{


$(window).load(function(){
 
 setTimeout(function() {
      $('#preloader').addClass('animated bounceOutDown');
  
     }, 3000);
 setTimeout(function() {
      $('#name').addClass('animated zoomIn');

     }, 3500);
 setTimeout(function() {
      $('#date img').addClass('animated slideInRight');

     }, 3510);

 setTimeout(function() {
      $('#presents img').addClass('animated bounceInDown');

     }, 3510);
  
  
 
});


}
 $(document).on('submit', '#reg-form', function()
 {
  
  var data = $(this).serialize();
  $("#register").val(' Registering...');
   $('#register').prop('disabled', true);

  $.ajax({
  
  type : 'POST',
  url  : 'includes/register.php',
  data : data,
  success :  function(msg)
       {
       
       $('#reg-form')[0].reset();

       $('#register').prop('disabled', false);
       $("#register").val('Register');

      $('.modalDialog').addClass('showme');
 $('.modalDialog').removeClass('hideme');
     

 $('.close').on('click', function(){
   
    $('.modalDialog').addClass('hideme');
    $('.modalDialog').removeClass('showme');


      });
      
       },
      error:function (e) {
          alert(e);
      }
  });
  return false;
 });
 






 $(document).on('submit', '#contact-send', function()
 {
  
  var data = $(this).serialize();
  $("#contact-submit").val(' Submitting...');
   $('#contact-submit').prop('disabled', true);

  $.ajax({
  
  type : 'POST',
  url  : 'includes/form-to-email.php',
  data : data,
  success :  function(msg)
       {
       
       

       //$('#contact-submit').prop('disabled', false);
     
/*
      $('.modalDialog').addClass('showme');
 $('.modalDialog').removeClass('hideme');
     

 $('.close').on('click', function(){
   
    $('.modalDialog').addClass('hideme');
    $('.modalDialog').removeClass('showme');


      });*/
      if(msg=="success")
      {
        $("#contact-submit").val('Submitted');
    }
      
       }
  });
  return false;
 });
 





// variables
var $header_top = $('.header-top');
var $nav = $('nav');



// toggle menu 
$header_top.find('a').on('click', function() {
  $(this).parent().toggleClass('open-menu');
});



// fullpage customization
$('#fullpage').fullpage({
  sectionsColor: ['#000', '#000', '#F2AE72', '#5C832F', '#BBB89F','#454f4f','#BBB89F'],
  sectionSelector: '.vertical-scrolling',
  // slideSelector: '.horizontal-scrolling',
  navigation: true,
  controlArrows: false,
  responsiveWidth: 1100,
  anchors: ['home', 'about', 'events', 'gallery', 'team','contact','sponsors'],
  menu: '#menu',

  afterLoad: function(anchorLink, index) {
    $header_top.css('background', 'rgba(0, 47, 77, .3)');
    $nav.css('background', 'rgba(0, 47, 77, .25)');
if (index==3) {

   // $('.bullets').toggleClass('animated fadeInDown');
  $('.bullets').toggleClass('animated fadeInLeft');
}

    if(index==5)
    {
      $('.effect-jazz').toggleClass('animated flipInX');
    }

  },

onLeave: function(index, nextIndex, direction){
         if (index==3) {
  $('.bullets').toggleClass('animated fadeInLeft');
}
            if(index==5)
            {
              $('.effect-jazz').toggleClass('animated flipInX');
            }

}


}); 



});


var deadline = 'Sep 30 2016 09:00:00 GMT-0400';
function time_remaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id,endtime){
  var clock = document.getElementById(id);
  
  // get spans where our clock numbers are held
  var days_span = clock.querySelector('.days');
  var hours_span = clock.querySelector('.hours');
  var minutes_span = clock.querySelector('.minutes');
  var seconds_span = clock.querySelector('.seconds');

  function update_clock(){
    var t = time_remaining(endtime);
    
    // update the numbers in each part of the clock
    days_span.innerHTML = t.days;
    hours_span.innerHTML = ('0' + t.hours).slice(-2);
    minutes_span.innerHTML = ('0' + t.minutes).slice(-2);
    seconds_span.innerHTML = ('0' + t.seconds).slice(-2);
    
    if(t.total<=0){ clearInterval(timeinterval); }
  }
  update_clock();
  var timeinterval = setInterval(update_clock,1000);
}
run_clock('clockdiv',deadline);