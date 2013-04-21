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
    this.$container = $(element);
    this.$allElems = this.$container.find(this.options.element);
    this.$elems = this.$allElems.not(this.options.inactive);
    this.scrollTo = 0;
    this.mouseActive = false;
  };

  Listy.prototype = {
    constructor: Listy,

    init: function(){
      var _self = this;

      this.$elems.first().addClass('listy-hover');

      this.$container.on('mousemove', function(){
        if (_self.mouseActive === false){
          _self.$elems.on('mouseenter', function(){
            _self.$elems.removeClass('listy-hover');
            $(this).addClass('listy-hover');
            _self.mouseActive = true;
          });
        }
      });

      _self.$elems.on('click', function(){
        if (typeof _self.options.select === 'function') {
          _self.options.select.call(this, $(this));
        }
      });
      _self.$container.on('focus', function(){
        _self.$container.addClass('listy-focus');
      })
      .on('blur', function(){
        _self.$container.removeClass('listy-focus');
      })
      .on('keydown', function(e){
        var $currentHoverLi = _self.$elems.filter('.listy-hover'),
            code = e.which;

        _self.$elems.off('mouseenter');
        _self.mouseActive = false;

        if (_self.matchKeys(code, _self.options.downKeys)){
          _self.move('DOWN', $currentHoverLi);
          return false;
        }
        else if (_self.matchKeys(code, _self.options.upKeys)){ // UP
          _self.move('UP', $currentHoverLi);
          return false;
        }
        else if (_self.matchKeys(code, _self.options.selectKeys)) { // SELECT
          if (typeof _self.options.select === 'function') {
            _self.options.select.call(this, $currentHoverLi);
          }
          return false;
        }
      });
    },

    move: function(direction, activeElem){
      var _self = this,
          curIndex = _self.$elems.index(activeElem),
          elemHeight = _self.$elems.first().outerHeight(),
          containerHeight = _self.$container.height(),
          visibleElems = Math.floor(containerHeight / elemHeight);

      _self.$elems.removeClass('listy-hover');
      var nextIndex = null;

      switch(direction){
        case 'DOWN':
          if (curIndex === (_self.$elems.length - 1)){
            nextIndex = 0;
            _self.scrollTo = 0;
          } else {
            nextIndex = curIndex + 1;
            _self.scrollTo += elemHeight;
          }
          break;
        case 'UP':
          if (curIndex === 0){
            nextIndex = _self.$elems.length - 1;
            _self.scrollTo = (_self.$allElems.length - (visibleElems)) * elemHeight;
          } else {
            nextIndex = curIndex - 1;
            _self.scrollTo -= elemHeight;
          }
          break;
      }
      $(_self.$elems.get(nextIndex)).addClass('listy-hover');
      _self.$container.scrollTop(_self.scrollTo); 
    },

    matchKeys: function(code, keys){
      return $.inArray(code, keys) !== -1;
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
    upKeys: [38],
    downKeys: [40],
    selectKeys: [13, 32],
    inactive: '.inactive',
    element: 'li',
    select: function(elem){
      elem.toggleClass('active');
    }
  };

  $.fn.listy.Constructor = Listy;

}(window.jQuery);