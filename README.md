listy
=====

I'm here to help developer to make navigable lists. By navigable I mean a list which can be browsed with keyboard or mouse.

I just do the list stuff and let the developer do whatever he want to do when user select anything in the list.

Demo: http://lou.github.io/listy/

Usage
-----

html:
```html
  <ul class='listy'>
    <li>elem 1</li>
    <li>elem 2</li>
  </ul>
```

javascript:
```javascript
  $('.listy').listy({
    select: function(elem){
      elem.doSomethingWithMe();
    }
  });
```

css:
```css
  ul{
    position: relative;
    overflow-y: auto;
    height: 200px;
  }
```

Options
-------

* **select**: function to fire when user select one item (default: function(elem){ elem.toggleClass('active'); } | type: function)
* **upKeys**: keys code for the up action (default: [38] | type: Array)
* **downKeys**: keys code for the down action (default: [40] | type: Array)
* **selectKeys**: keys code for the select action (default: [13, 32] | type: Array)
* **inactive**: jQuery selector for the non-selectable items (default: '.inactive' | type: String)
* **element**: jQuery selector for the items (default: 'li' | type: String)
