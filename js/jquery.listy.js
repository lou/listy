/*
* Listy v0.0.1
* Copyright (c) 2012 Louis Cuny
*
* This program is free software. It comes without any warranty, to
* the extent permitted by applicable law. You can redistribute it
* and/or modify it under the terms of the Do What The Fuck You Want
* To Public License, Version 2, as published by Sam Hocevar. See
* http://sam.zoy.org/wtfpl/COPYING for more details.
*/

!function ($) {

  "use strict";


 /* LISTY CLASS DEFINITION
  * ====================== */

  var Listy = function (element, options) {
    this.options = options;
    this.$element = $(element);
    this.scrollTo = 0;
    this.mouseActive = false;
  };

  Listy.prototype = {
    constructor: Listy,

    init: function(){
      var _self       = this,
          $container  = this.$element,
          $elems      = this.$element.find('li');

      $elems.first().addClass('listy-hover');

      $container.on('mousemove', function(){
        if (_self.mouseActive === false){
          $elems.on('mouseenter', function(){
            $elems.removeClass('listy-hover');
            $(this).addClass('listy-hover');
            _self.mouseActive = true;
          })
        }
      });

      $elems.on('click', function(){
        console.log('test click !!!');
        if (typeof _self.options.select === 'function') {
          _self.options.select.call(this, $(this));
        }
      });
      $container.on('focus', function(){
        $container.addClass('listy-focus');
      })
      .on('blur', function(){
        $container.removeClass('listy-focus');
      })
      .on('keydown', function(e){
        var $currentHoverLi = $elems.filter('.listy-hover'),
            curIndex = $elems.index($currentHoverLi),
            elemHeight = $elems.first().outerHeight(),
            containerHeight = $container.height(),
            visibleElems = Math.floor(containerHeight / elemHeight);


        $elems.off('mouseenter');
        _self.mouseActive = false;

        if (e.which === 40 || e.which === 38){ // Up OR Down
          $elems.removeClass('listy-hover');
          var nextIndex = null;

          if (e.which === 40){ // DOWN
            if (curIndex === ($elems.length - 1)){
              nextIndex = 0;
              _self.scrollTo = 0;
            } else {
              nextIndex = curIndex + 1;
              _self.scrollTo += elemHeight;
            }
          } else if (e.which === 38){ // UP
            if (curIndex === 0){
              nextIndex = $elems.length - 1;
              _self.scrollTo = ($elems.length - (visibleElems)) * elemHeight;
            } else {
              nextIndex = curIndex - 1;
              _self.scrollTo -= elemHeight;
            }
          }
          $($elems.get(nextIndex)).addClass('listy-hover');
          $container.scrollTop(_self.scrollTo);
          return false;
        } else if (e.which === 13 || e.which === 32) {
          if (typeof _self.options.select === 'function') {
            _self.options.select.call(this, $currentHoverLi);
          }
          return false;
        }
      });
    }
  };

  /* LISTY PLUGIN DEFINITION
   * ======================= */

  $.fn.listy = function () {
    var option = arguments[0],
        args = arguments;

    return this.each(function () {
      var $this = $(this),
          data = $this.data('listy'),
          options = $.extend(
                      {}, 
                      $.fn.listy.defaults,
                      $this.data(),
                      typeof option === 'object' && option);

      if (!data){ $this.data('listy', (data = new Listy(this, options))); }

      if (typeof option === 'string'){
        data[option](args[1]);
      } else {
        data.init();
      }
    });
  };

  $.fn.listy.defaults = {
    select: function(elem){
      elem.toggleClass('listy-selected');
    }
  };

  $.fn.listy.Constructor = Listy;

}(window.jQuery);