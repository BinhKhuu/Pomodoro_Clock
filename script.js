$(document).ready(function(){
  //_______________________________________
  //initialize values for clock
  //track if clock is active
  var active_flag = 0;
  //track state of clock work or break
  var work_flag = 0;
  var time = 0;
  var br = parseInt($('#cl-break').text());
  var se = parseInt($('#cl-sess').text());
  var min = se - 1;
  var sec = 59;
  var intervalID; 
  //________________________________________ 
  $('.btn-start').click(function(){
    $('#state').css('color','#82CF7C');
    $('#state').text('Work');
    $('.btn-start').css('display', 'none');
    $('.btn-stop').css('display', 'inline-block');
    $('.btn-reset').css('display', 'inline-block');
    active_flag = 1;
    min = se - 1;
    intervalID = setInterval(timer,1000);    
  });  
  $('.btn-stop').click(function(){
    $('.btn-stop').css('display', 'none');
    $('.btn-start').css('display', 'inline-block');
    se = min +1; 
    active_flag = 0;
    clearInterval(intervalID);
  });
  $('.btn-reset').click(function(){ 
    active_flag = 0;
    $('.btn-stop').css('display', 'none');
    $('.btn-reset').css('display', 'none');
    $('.btn-start').css('display', 'inline-block');
    br = parseInt($('#cl-break').text());
    se = parseInt($('#cl-sess').text());
    min = se -1;
    sec = 59;
    clearInterval(intervalID);
    $('#cl-main').css('border', 'solid #82CF7C 10px');
    $('#time').css('color', '#82CF7C');               
    $('#time').text((min +1).toString() + ':' + '00');
  });  
  $('#btn-br-min').click(function(){
    if(br > 1) { 
      br -= 1;
      $('#cl-break').text(br);
    } 
  });  
  $('#btn-br-plus').click(function(){  
    if(br < 60) {
      br += 1;
      $('#cl-break').text(br);
    }
  });
  $('#btn-se-min').click(function(){
    if(se > 1) {     
      se -= 1;
      $('#cl-sess').text(se);
      if(active_flag == 0) {
        set_seconds;   
      }     
    } 
  });
  $('#btn-se-plus').click(function(){    
    if(se < 60) {     
      se += 1;
      $('#cl-sess').text(se); 
      if(active_flag == 0) {
        set_seconds;       
      }      
    } 
  }); 
  function timer () {
    if(sec >= 0) {
      if(sec>= 10) {
        $('#time').text(min.toString() + ':' + sec.toString());  
      }
      else {
        $('#time').text(min.toString() + ':' + "0" + sec.toString());
      }      
      sec -= 1;
    }
    else {
      min -= 1;
      if(min >= 0) {
        sec = 59;
        $('#time').text(min.toString() + ':' + sec.toString());
        sec -= 1; 
      } 
      else  {
        if(work_flag == 0) {
          $('#state').css('color','#F95738');
          $('#state').text('Break');
          $('#cl-main').css('border', 'solid #F95738 10px');
          $('#time').css('color', '#F95738'); 
          $('#time').text('break!'); 
          min = br;
          sec = 0;
          work_flag = 1;
        }
        else {
          $('#state').css('color','#82CF7C');
          $('#state').text('Work');
          $('#cl-main').css('border', 'solid #82CF7C 10px');
          $('#time').css('color', '#82CF7C');               
          $('#time').text('Work!');
          min = se;
          sec = 0;
          work_flag = 0;
        }
      }
    }
  }
  function set_seconds() {
    if(seconds >= 10) {
      $('#time').text(se.toString() +':'+ sec);   
    }
    else {
      $('#time').text(se.toString() + ':0' + sec);    
    }          
  }
});