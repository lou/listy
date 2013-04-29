$(function(){
  $('.listy').listy({
    actions: {
      select: {
        keys: [13, 32],
        events: 'click',
        method: function(elem){
          if (elem.hasClass('selected')){
            elem.removeClass('selected');
            $('#console').prepend(elem.text()+' deselected !<br />');
          } else {
            elem.addClass('selected');
            $('#console').prepend(elem.text()+' selected !<br />');
          }
        }
      },
      remove: {
        keys: [8],
        events: 'dblclick',
        method: function(elem){
          elem.hide();
          $('#console').prepend(elem.text()+' removed !<br />');
        }
      },
      inactive: {
        keys: [73],
        method: function(elem){
          elem.removeClass('selected listy-hover')
            .addClass('muted')
            .off('click dblclick');
          $('#console').prepend(elem.text()+' inactived !<br />');
        }
      }
    }
  });
});