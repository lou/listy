$(function(){
  $('.listy').listy({
    select: function(elem){
      elem.hide();
    },
    elem: 'li:visible'
  });
});