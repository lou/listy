$(function(){
  $('.listy').listy({
    select: function(elem){
      elem.hide();
      $('#console').prepend(elem.text()+' selected !<br />');
    }
  });
});